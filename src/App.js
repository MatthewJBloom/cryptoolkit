import logo from './logo.svg';
import './App.css';
import CoinbaseProFeed from './CoinbaseProFeed'
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'

function App() {
  const coinbaseProFeed = new CoinbaseProFeed()
  const priceEvents = coinbaseProFeed.priceEvents

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Crypto Toolkit
        </p>
        <CurrentPrice events={priceEvents} />
        <NotificationForm callback={function(sub){
          console.log(sub)
        }} />
        <NotificationList />
      </header>
    </div>
  );
}

export default App;
