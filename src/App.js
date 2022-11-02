import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './style/App.css';
import {backend} from './Backend'
import CamRow from './CamRow'
import ConfFTP from './ConfFTP'
import usePrefs   from './data/prefs'
import useCameras from './data/cameras'

function App() {
  //console.log(`App render`,process.env)
  console.log(`App render`)

  const [error,setError]      = useState(null)
  const [user, setUser]       = useState(null)
  const prefs                 = usePrefs()
  const cameras               = useCameras()

  useEffect(() => {
    console.log(`App mounted`)
    async function fetchData(){
      try{
        // Load auth
        const auth = await backend.request('GET','/auth/info')
        setUser({
          name : auth.user.name,
          role : auth.role.name
        })

        // Load prefs
        await prefs.load()

        // Load cameras
        await cameras.load()

      }catch(err){
        console.error(err)
        setError(err)
      }
    }
    fetchData()

  }, []);

  let rows = cameras.list
    .sort((a,b)=>a.name.localeCompare(b.name))
    .map(cam=>(<CamRow 
        key={cam.id.toString()}
        cam={cam}
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
        <ConfFTP ftp={prefs.ftp}/>
      </aside>

      <div id="layout-list">
        {rows}
      </div>

      <div id="layout-data"></div>

      {error &&
        <div className="error">
          <div className="message">{error.toString()}</div>
        </div>
      }


    </div>
  );
}

export default App;
