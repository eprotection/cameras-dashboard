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

const App = ()=>{
  // Theme
  const [theme,toggleTheme] = useTheme()
  // Store
  const dispatch = useDispatch()
  const {ws,user,error} = useSelector(selectAuth)
  // Settings dialog
  const [showSettings,setShowSettings] = useState(false)


  useEffect(()=>{dispatch(loadAuth())},[])

  //-------------------------------------------------------------------
  console.log('--------------------------------------------------------')
  const A = function(){if(!new.target)console.log('function A')}
  const B = ()=>{console.log('function B')}
  const C = new Function("console.log('function C')")

  console.log(A)
  console.log(B)
  console.log(C)
  A();B();C()

  const a = new A()
  const c = new C()
  const n = new Number(33)

  console.log(a,c,n)
  console.log(n.toFixed(1), (55).toFixed(1))

  console.log('--------------------------------------------------------')

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
      <span className="clk icon gear" onClick={()=>setShowSettings(true)}></span>
    </header>
   
    <div id="layout-list">
      <CamList isEditable={user?true:false}/>
    </div>

    <div id="layout-data">
      <ImageList/>
    </div>

    <ImgActions />

    {showSettings && 
      <Settings hide={()=>setShowSettings(false)}/> }
  </>

  const renderError=()=>
  <div className="fatal-error">
    <div className="message">{error.toString()}</div>
  </div>


  return (
    <div id="app" className={`App ${theme}`}>
        {ws    && renderContent()}
        {error && renderError()}
    </div>
  )  
}

export default App;
