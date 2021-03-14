import './App.css';
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Crypto Toolkit
        </p>
        <CurrentPrice />
        <NotificationForm />
        <NotificationList />
      </header>
    </div>
  );
}

export default App;
