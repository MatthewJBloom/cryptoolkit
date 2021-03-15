import './App.css';
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
import CandleChart from './CandleChart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>
            $<CurrentPrice />
          </h1>
          <NotificationForm />
          <NotificationList />
        </div>
        <div>
          <CandleChart />
        </div>
      </header>
    </div>
  );
}

export default App;
