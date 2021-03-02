import logo from './logo.svg';
import './App.css';
import CoinbaseProFeed from './CoinbaseProFeed'
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
import NotificationManager from './NotificationManager'
const { ipcRenderer } = window.require('electron')

function App() {
  const coinbaseProFeed = new CoinbaseProFeed()
  const priceEvents = coinbaseProFeed.priceEvents

  const notificationManager = new NotificationManager()
  notificationManager.listen(priceEvents)



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Crypto Toolkit
        </p>
        <CurrentPrice events={priceEvents} />
        <NotificationForm callbacks={{addNotification: function(price){
          notificationManager.newNotification("BTC", price).then(notif => {
            console.log('set notification:', notif)
          })
        }}} />
        <NotificationList />
        <button onClick={()=>{
          ipcRenderer.send('something', 'ping')
        }}>Something</button>
      </header>
    </div>
  );
}

export default App;
