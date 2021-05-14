import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ButtonAppBar from "./components/UI/AppBar/AppBar";
import MainPage from "./containers/MainPage/MainPage";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
    <Route {...props} /> :
    <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state?.users.user);
  return (
    <BrowserRouter>
      <ButtonAppBar/>
      <Switch>
        <ProtectedRoute
        isAllowed={user._id}
        path='/'
        exact
        component={MainPage}
        redirectTo='/register' />

        <Route path='/register' component={SignUp} />
        <Route path='/login' component={SignIn}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
