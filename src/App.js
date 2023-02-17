import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import {useTheme} from './theme'
import { useSelector, useDispatch } from 'react-redux';
import {loadAuth, selectAuth} from './auth/authSlice'
import CamList from "./cameras/CamList"
import ImageList from "./images/ImgList"
import ImgActions from "./images/ImgActions"
import Settings from "./settings/Settings";
import Filters from "./filters/Filters";

const App = ()=>{
  // Theme
  const [theme,toggleTheme] = useTheme()
  // Store
  const dispatch = useDispatch()
  const {workspace,user,error} = useSelector(selectAuth)
  // Settings dialog
  const [showSettings,setShowSettings] = useState(false)

  // Load auth info if required
  useEffect(()=>{
    if(!workspace)
      dispatch(loadAuth())
  },[workspace])

  //-------------------------------------------------------------------
  // RENDER
  console.log(`=>App workspace`,workspace)
  const renderContent=()=>
  <>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span className='title'>{workspace?.name}</span>
      <div className="user" >
        <div>{user?user.name:"Guest"}</div>
        <div>{user?.role}</div>
      </div>
      <Filters/>
      <span className="clk icon gear" onClick={()=>setShowSettings(true)}></span>
    </header>
   
    <div id="layout-list">
      <CamList isEditable={user?true:false}/>
    </div>

    <div id="layout-splitter"></div>

    <div id="layout-data">
      <ImageList/>
    </div>

    <ImgActions />

    {showSettings && 
      <Settings hide={()=>setShowSettings(false)}>
        <span className="btn clk" onClick={toggleTheme}>
          Set {theme=='dark'?'light':'dark'} theme
        </span>
      </Settings> }
  </>

  const renderError=()=>
  <div className="fatal-error">
    <div className="message">{error.toString()}</div>
  </div>


  return (
    <div id="app" className={`App ${theme}`}>
        {workspace  && renderContent()}
        {error      && renderError()}
    </div>
  )  
}

export default App;
