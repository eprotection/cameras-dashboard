import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import backend from './Backend'
import CamRow from './CamRow'
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import ImageList from "./ImageList";

export var setSelectedCamera
export var getSelectedCamIds
export var showFtpDialog
export var showIpDialog
export var hideDialog
export var savePref

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
      selectedCamera: undefined,
      prefs         : {}
    }

    // Interface
    setSelectedCamera = this.setSelectedCamera.bind(this)
    getSelectedCamIds = this.getSelectedCamIds.bind(this)
    showFtpDialog     = this.showFtpDialog.bind(this)
    showIpDialog      = this.showIpDialog.bind(this)
    hideDialog        = this.hideDialog.bind(this)
    savePref          = this.savePref.bind(this)
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
    let data = await backend.apiRequest('POST','/cameras/load_cameras',{mt:mtCameras})
    mtCameras = data.till_mt
    console.log('cameras:',data)
    // Update
    const newList = data.results
    this.setState({cameras:newList})
  }

  setSelectedCamera(cam){
    let newValue = this.state.selectedCamera===cam?null:cam
    console.log(`setSelectedCamera #${cam?.id} => #${newValue?newValue.id:null}`)
    this.setState({selectedCamera:newValue})
  }

  getSelectedCamIds(){
    const {selectedCamera} = this.state
    if(selectedCamera){
      return [selectedCamera.id]
    }else{
      return this.state.cameras.map(item=>item.id)
    }
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


  //-------------------------------------------------------------------
  // RENDER
  render(){

    const {user, error, dialog, selectedCamera, cameras, prefs} = this.state;
    console.log(`App render, selected camera:`,selectedCamera)

    let rows = cameras
      .sort((a,b)=>a.name.localeCompare(b.name))
      .map(cam=>(<CamRow 
          key={cam.id.toString()}
          cam={cam}
          isSelected={cam===selectedCamera}
      />))

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
          {rows}
        </div>

        <div id="layout-data">
          <ImageList selectedCamera={selectedCamera}/>
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
