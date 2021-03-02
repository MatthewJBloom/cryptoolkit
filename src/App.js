import logo from './logo.svg';
import './App.css';
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
const { ipcRenderer } = window.require('electron')

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Crypto Toolkit
        </p>
        <CurrentPrice />
        <NotificationForm callbacks={{addNotification: function(price){
          console.log('set notification:', price)
        }}} />
        <NotificationList />
        <button onClick={()=>{
          ipcRenderer.send('ping', 'ping-arg')
          ipcRenderer.once('pong', (event, arg) => {
            console.log('pong', arg)
          })
        }}>Test Ping-Pong</button>
      </header>
    </div>
  );
}

export default App;
