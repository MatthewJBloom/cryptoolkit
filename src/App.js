import logo from './logo.svg';
import './App.css';
import CoinbaseProFeed from './CoinbaseProFeed'
import CurrentPrice from './CurrentPrice'

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
        <CurrentPrice events={{priceEvents: priceEvents}} />
      </header>
    </div>
  );
}

export default App;
