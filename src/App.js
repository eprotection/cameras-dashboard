import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import backend from './Backend'
import CamRow from './CamRow'
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import CamEditor from "./CamEditor"
import ImageList from "./ImageList";

export var setSelectedCamera
export var getSelectedCamIds
export var showFtpDialog
export var showIpDialog
export var hideDialog
export var savePref
export var showCamEditor
export var onCamUpdated
export var getCameraById

var mtCameras = 0
var mtPrefs   = 0
const FTP_SERVER_ID  = 2021
const IP_SERVER_ID   = 2025


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user          : null,
      error         : null,
      dialog        : null,
      // Data
      cameras       : [],
      selectedCameraId: undefined,
      prefs         : {}
    }

    // Interface
    setSelectedCamera = this.setSelectedCamera.bind(this)
    getSelectedCamIds = this.getSelectedCamIds.bind(this)
    showFtpDialog     = this.showFtpDialog.bind(this)
    showIpDialog      = this.showIpDialog.bind(this)
    hideDialog        = this.hideDialog.bind(this)
    savePref          = this.savePref.bind(this)
    showCamEditor     = this.showCamEditor.bind(this)
    onCamUpdated      = this.onCamUpdated.bind(this)
    getCameraById     = this.getCameraById.bind(this)
  }

  componentDidMount(){
    console.log(`App mounted`)

    this.fetchData()
  }

  async fetchData(){
    try{
      // Load auth
      const auth = await backend.apiRequest('GET','/auth/info')
      this.setState({user:{
        name : auth.user.name,
        role : auth.role.name
      }})

      // Load prefs
      await this.loadPrefs()

      // Load cameras
      await this.loadCameras()

      // Reload images
      setSelectedCamera(null)

    }catch(err){
      console.error(err)
      this.setState({error:err})
    }
  }

  //----------------------------------------------------------------------------
  // CAMERAS
  async loadCameras(){
    // Load
    console.log('cameras: start loading...')
    let data = await backend.apiRequest('POST','/cameras/load_list',{mt:mtCameras})
    mtCameras = data.mt
    console.log('cameras:',data)
    // Update
    const newList = data.results
    this.setState({cameras:newList})
  }

  setSelectedCamera(cam){
    console.log(`setSelectedCamera #${cam?.id}`)
    let newValue = this.state.selectedCameraId==(cam?.id)?null:cam.id
    this.setState({selectedCameraId:newValue})
  }

  getSelectedCamIds(){
    const {selectedCameraId} = this.state
    if(selectedCameraId){
      return [selectedCameraId]
    }else{
      return this.state.cameras.map(item=>item.id)
    }
  }
  getCameraById(id){
    for(const cam of this.state.cameras)
      if(cam.id==id) return cam
  }

  onCamUpdated(newCam){
    let newState = {}
    newState.cameras = this.state.cameras.map(
      cam => cam.id==newCam.id ? newCam : cam
    )
    this.setState(newState)
  }

  //----------------------------------------------------------------------------
  // PREFS
  async loadPrefs(){
    // Load
    console.log('prefs: start loading...')
    let data = await backend.apiRequest('POST','/prefs/load_prefs',{mt:mtPrefs})
    //mtPrefs = data.till_mt
    console.log('prefs:',data)
    // Update
    const newPrefs = {}
    for(const pref of data.results){
      switch(pref.id){
          case FTP_SERVER_ID: newPrefs.ftp = pref.value; break;
          case IP_SERVER_ID:  newPrefs.ip  = pref.value; break;
      }
    }
    this.setState({prefs:newPrefs})
  }

  async savePref(id, value){
    let data = await backend.apiRequest('POST','/prefs/set_common_pref',
        {id    : id, 
         value : value})
    console.log('savePref finished:',data)
    // Reload prefs
    this.loadPrefs()
  }

  //-------------------------------------------------------------------
  // DIALOGS
  showDialog(title, form){
    this.setState({dialog:(<div className="dialog-fog">
      <div className="dialog">
          <div className="title">{title}</div>
              {form}
      </div>
    </div>) })
  }
  hideDialog(){ this.setState({dialog:null}) }

  showFtpDialog(){
    this.showDialog(
      'Cameras FTP',
      <FormFTP 
          ftp={this.state.prefs.ftp}
          useFolder={false}
          onFinished={hideDialog}
          onSaveAsync={async (value)=>{savePref(FTP_SERVER_ID,value)}}
          />
    )
  }

  showIpDialog(){
    this.showDialog(
      'Image Processor FTP',
      <FormFTP 
          ftp={this.state.prefs.ip}
          useFolder={true}
          onFinished={hideDialog}
          onSaveAsync={async (value)=>{savePref(IP_SERVER_ID,value)}}
          />
    )
  }

  showCamEditor(cam){
    this.showDialog(
      'Camera Editor',
      <CamEditor cam={cam}/>
    )
  }



  //-------------------------------------------------------------------
  // RENDER
  render(){

    const {user, error, dialog, selectedCameraId, cameras, prefs} = this.state;
    console.log(`App render, selectedCameraId: ${selectedCameraId}`)

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className='title'>Cameras Dashboard</span>
          {user!=null && <div className="user" >
            <div>{user.name}</div>
            <div>{user.role}</div>
          </div>}
        </header>

        <aside>
          <ConfFTP label="Cameras FTP:" data={prefs.ftp} onClick={showFtpDialog}/>
          <ConfFTP label="IP FTP:"      data={prefs.ip}  onClick={showIpDialog}/>
        </aside>

        <div id="layout-list">
          <div className="row-header">
            <span>name</span><span>last</span><span>total</span></div>
          {cameras
          .sort((a,b)=>a.name.localeCompare(b.name))
          .map(cam=>(<CamRow 
              key={cam.id.toString()}
              cam={cam}
              isSelected={cam.id===selectedCameraId}
          />))}
        </div>

        <div id="layout-data">
          <ImageList selectedCameraId={selectedCameraId}/>
        </div>

        {error &&
          <div className="error">
            <div className="message">{error.toString()}</div>
          </div>
        }

        {dialog}

      </div>
    );
  }
}

export default App;
