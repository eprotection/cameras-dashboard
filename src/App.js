import logo from './logo.svg';
import './App.css';

function App() {
  console.log(`App render`)

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className='title'>Cameras Dashboard</span>
      </header>

      <div id="layout-list"></div>

      <div id="layout-data"></div>


    </div>
  );
}

export default App;
