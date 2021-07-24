import React, { Fragment } from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import loginBackground from '../Images/bg.jpg';
import logo from '../Images/logo.png';

function Login() {
    return (
        <Fragment>
            <img src={logo} alt="Company logo" className="login-logo" />
            <div className="login-page" style={{backgroundImage: `url(${loginBackground})`}}>
                <div className="form text-start">
                    <div className="screen"></div>
                    <h3>Cachie</h3>
                    <form>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel className="mt-4 mb-4" control={
                            <Checkbox value="remember" color="primary" />
                        } label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" color="primary">Sign in</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
