import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import {backend} from './Backend'
import CamRow from './CamRow'

var mt = 0

function App() {
  //console.log(`App render`,process.env)
  console.log(`App render mt=${mt}`)

  const [error,setError]      = useState(null)
  const [user, setUser]       = useState(null)
  const [cameras, setCameras] = useState([])

  useEffect(() => {
    console.log(`App mounted`)
    async function fetchData(){
      try{
        // Init backend (check ws)
        backend.init()

        // Load auth
        const auth = await backend.request('GET','/auth/info')
        setUser({
          name : auth.user.name,
          role : auth.role.name
        })

        // Load cameras
        const data = await backend.request('POST','/cameras/load_cameras',{mt:mt})
        console.log(data)
        mt = data.till_mt
        setCameras(data.results)

      }catch(err){
        console.error(err)
        setError(err)
      }
    }
    fetchData()

  }, []);

  let rows = cameras
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
