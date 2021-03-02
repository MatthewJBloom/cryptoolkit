import logo from './logo.svg';
import './App.css';
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
