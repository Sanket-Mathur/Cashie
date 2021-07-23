import './App.css';
import Dashboard from './Screens/Dashboard';
import { Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
