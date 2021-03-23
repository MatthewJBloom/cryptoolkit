import './App.css';
import CurrentPrice from './CurrentPrice'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
import CandleChart from './CandleChart'

// first try at material-ui
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 1000,
  }
});

function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <header className="App-header">

        <Card className={classes.root}>
          <CardMedia className={classes.media}>
            <CandleChart />
          </CardMedia>
          <CardContent>
            <Typography variant="h5" component="h2">
              $<CurrentPrice />
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <NotificationList />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="h2">
              <NotificationForm />
            </Typography>
          </CardContent>
        </Card>

      </header>
    </div>
  );
}

export default App;
