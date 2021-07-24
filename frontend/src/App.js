import './App.css';
import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="login" />
            </Switch>
        </div>
    );
}

export default App;
