import React,{useState,useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import {backend} from './Backend'


function App() {
  //console.log(`App render`,process.env)
  console.log(`App render`)

  const [error,setError] = useState(null)
  const [user, setUser]  = useState(null)

  useEffect(() => {
    console.log(`App mounted`)
    async function fetchData(){
      try{
        backend.init()

        // Request auth
        const auth = await backend.request('GET','/auth/info')
        setUser({
          name : auth.user.name,
          role : auth.role.name
        })

      }catch(err){
        console.error(err)
        setError(err)
      }
    }
    fetchData()

  }, []);

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

      <div id="layout-list"></div>

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
