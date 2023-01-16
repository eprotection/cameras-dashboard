import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import backend from './Backend'
import Settings from "./Settings";
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import CamEditor from "./CamEditor"
import CamList from "./CamList"
import ImageList from "./ImageList"

export var setSelCamID
export var getSelectedCamIds
export var showFtpDialog
export var showIpDialog
export var hideDialog
export var showSettings
export var hideSettings
export var savePref
export var showCamEditor
export var onCamUpdated
export var getCameraById
export var toggleTheme

var mtCameras = 0
var mtPrefs   = 0
const ALLOW_PUBLIC_ID= 2005
const FTP_SERVER_ID  = 2021
const IP_SERVER_ID   = 2025

const loadTheme=()=>{
  let stored=window.localStorage.getItem('theme');
  return stored?stored:'dark'
}
const saveTheme=(value)=>{
  window.localStorage.setItem('theme',value)
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      theme         : loadTheme(),
      wsname        : null,
      user          : null,
      error         : null,
      settings      : false,
      dialog        : null,
      // Data
      cameras       : [],
      selCamID: undefined,
      prefs         : {}
    }

    // Interface
    setSelCamID       = this.setSelCamID.bind(this)
    getSelectedCamIds = this.getSelectedCamIds.bind(this)
    showFtpDialog     = this.showFtpDialog.bind(this)
    showIpDialog      = this.showIpDialog.bind(this)
    hideDialog        = this.hideDialog.bind(this)
    hideSettings      = this.hideSettings.bind(this)
    hideSettings      = this.hideSettings.bind(this)
    savePref          = this.savePref.bind(this)
    showCamEditor     = this.showCamEditor.bind(this)
    onCamUpdated      = this.onCamUpdated.bind(this)
    getCameraById     = this.getCameraById.bind(this)
    toggleTheme       = this.toggleTheme.bind(this)
  }

  componentDidMount(){
    console.log(`App mounted`)

    //this.fetchData()
    //store.dispatch(loadList())
  }

  componentWillUnmount(){
    console.log(`App will unmount`)

  }

  async fetchData(){
    try{
      // Load ws info
      const ws = await backend.apiRequest('GET','/')
      this.setState({wsname:ws.name})

      // Load prefs (before auth)
      await this.loadPrefs()

      // Load auth
      try{
        const auth = await backend.apiRequest('GET','/auth/info')
        this.setState({user:{
          name : auth.user.name,
          role : auth.role.name
        }})
      }catch(e){
        if(!this.state.prefs.allowPublic) throw e
      }

      // Load cameras
      //await this.loadCameras()

      // Reload images
      setSelCamID('all')

    }catch(err){
      console.error(err)
      this.setState({error:err})
    }
  }

  toggleTheme(){
    const newTheme = this.state.theme=='dark' ? 'light' : 'dark'
    saveTheme(newTheme)
    this.setState({theme:newTheme}) 
  }

  //----------------------------------------------------------------------------
  // CAMERAS
  // async loadCameras(){
  //   // Load
  //   console.log('cameras: start loading...')
  //   let data = await backend.apiRequest('POST','/cameras/load_list',{mt:mtCameras})
  //   mtCameras = data.mt
  //   console.log('cameras:',data)
  //   // Update
  //   const newList = data.results
  //   this.setState({cameras:newList})
  // }

  setSelCamID(id){
    console.log(`setSelCamID ${id}`)
    if(this.state.selCamID==id) return
    this.setState({selCamID:id})
  }

  getSelectedCamIds(){
    const {selCamID} = this.state
    if(selCamID=='all'){
      return this.state.cameras.map(item=>item.id)
    }else{
      return [selCamID]
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
          case ALLOW_PUBLIC_ID: newPrefs.allowPublic = pref.value; break;
          case FTP_SERVER_ID:   newPrefs.ftp         = pref.value; break;
          case IP_SERVER_ID:    newPrefs.ip          = pref.value; break;
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
  hideDialog()  { this.setState({dialog:null}) }
  hideSettings(){ this.setState({settings:false}) }

  showFtpDialog(){
    this.showDialog(
      'Cameras FTP',
      <FormFTP 
          ftp={this.state.prefs.ftp}
          useFolder={false}
          onFinished={hideDialog}
          onSaveAsync={async (value)=>{await savePref(FTP_SERVER_ID,value)}}
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
          onSaveAsync={async (value)=>{await savePref(IP_SERVER_ID,value)}}
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

    const {wsname, user, error,settings, dialog, selCamID, cameras, prefs} = this.state;
    console.log(`App render, selCamID: ${selCamID} user: ${user}`)

    return (
      <div className={`App ${this.state.theme}`}>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className='title'>{wsname}</span>
          <div className="user" >
            <div>{user?user.name:"Guest"}</div>
            <div>{user?.role}</div>
          </div>
          <span className="btn clk" onClick={toggleTheme}>
            Set {this.state.theme=='dark'?'light':'dark'} theme
          </span>
          <span className="clk icon gear" onClick={()=>this.setState({settings:true})}></span>
        </header>

        <div id="layout-list">
          <CamList cameras={cameras} selCamID={selCamID} isEditable={user?true:false}/>
        </div>

        <div id="layout-data">
          <ImageList selCamID={selCamID}/>
        </div>

        {error &&
        <div className="fatal-error">
          <div className="message">{error.toString()}</div>
        </div>
        }

        {settings && 
        <Settings>
          <div><i>Cameras FTP:</i><ConfFTP data={prefs.ftp} onClick={user?showFtpDialog:null}/></div>
          <div><i>IP FTP:</i><ConfFTP data={prefs.ip}  onClick={user?showIpDialog:null}/></div>
        </Settings>
        }

        {dialog}

      </div>
    );
  }
}

export default App;
