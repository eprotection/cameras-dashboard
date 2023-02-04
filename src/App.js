import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import {loadAuth, selectAuth} from './auth/authSlice'
import CamList from "./cameras/CamList"
import ImageList from "./images/ImgList"

export const showCamEditor=()=>{}

const loadTheme=()=>{
  let stored=window.localStorage.getItem('theme');
  return stored?stored:'dark'
}
const saveTheme=(value)=>{
  window.localStorage.setItem('theme',value)
}


const App = ()=>{
  const [theme,setTheme] = useState(loadTheme)
  const toggleTheme = ()=>{
    const newTheme = theme=='dark' ? 'light' : 'dark'
    saveTheme(newTheme)
    setTheme(newTheme) 
  }

  const dispatch = useDispatch()
  const {ws,user,error} = useSelector(selectAuth)

  const [settings,setSettings] = useState(false)

  useEffect(()=>{dispatch(loadAuth())},[])


  //-------------------------------------------------------------------
  // RENDER
  console.log(`=>App ws:${ws}`)
  const renderContent=()=>
  <>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span className='title'>{ws?.name}</span>
      <div className="user" >
        <div>{user?user.name:"Guest"}</div>
        <div>{user?.role}</div>
      </div>
      <span className="btn clk" onClick={toggleTheme}>
        Set {theme=='dark'?'light':'dark'} theme
      </span>
      <span className="clk icon gear" onClick={()=>setSettings(true)}></span>
    </header>
   
    <div id="layout-list">
      <CamList isEditable={user?true:false}/>
    </div>

    <div id="layout-data">
      <ImageList/>
    </div>
  </>

  const renderError=()=>
  <div className="fatal-error">
    <div className="message">{error.toString()}</div>
  </div>


  return (
    <div className={`App ${theme}`}>
        {ws    && renderContent()}
        {error && renderError()}
    </div>
  )  
}

export default App;
