import React, { Fragment, useState, useEffect } from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Joi from 'joi-browser';
import Cookies from 'js-cookie';
import loginBackground from '../Images/login-background.jpg';
import logo from '../Images/logo.png';
import loading from '../Images/loading.gif';
import './login.css'

function Login(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState([]);

    const formSchema = {
        username: Joi.string().required().max(30).min(5),
        password: Joi.string().required().max(30).min(5),
    };

    const handleFormChange = (e) => {
        let newFormData = {...formData};
        if (e.target.name === 'username' || e.target.name === 'password') {
            newFormData[e.target.name] = e.target.value;
        } else if (e.target.name === 'remember') {
            setRemember(e.target.checked);
        }
        
        setFormData(newFormData);
        
        let validation = Joi.validate(newFormData, formSchema, {abortEarly: false});
        if (validation.error) {
            setErrors(validation.error.details);
        } else {
            setErrors([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validation = Joi.validate(formData, formSchema);
        if (validation.error) {
            setErrors(validation.error.details);
            return;
        }

        

        async function attemptLogin() {
            let gif = document.getElementById('loading-gif');
            gif.style.visibility = 'visible';

            let result = await fetch(
                `${process.env.REACT_APP_BACKEND_API_URL}auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-type": "application/json"
                    }
                }
            );
            let data = await result.json();
            if (data.status === "success") {
                if (remember) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    Cookies.set("token", data.token, { expires: 1 });
                    Cookies.set("user", data.user, { expires: 1 });
                }
				props.history.push("/admin");
            } else {
                setErrors([{ message: "Authentication Failed" }]);
            }
            gif.style.visibility = 'hidden';
        }
        attemptLogin();
    };

    useEffect(() => {
        async function checkJWT() {
            if (Cookies.get('token') || localStorage.getItem('token')) {
                props.history.push("/admin");
            }
        }
        checkJWT();
    }, [props.history]);

    return (
        <Fragment>
            <img src={logo} alt="Company logo" className="login-logo" />
            <div className="login-page" style={{backgroundImage: `url(${loginBackground})`}}>
                <div className="form text-start">
                    <div className="screen"></div>
                    <div className="login-title">
                        <h2>Cachie</h2>
                        <img src={loading} alt="Loading gif" id="loading-gif" />
                    </div>
                    <form onChange={handleFormChange} onSubmit={handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel className="mt-4 mb-4" control={
                            <Checkbox value="remember" name="remember" color="primary" />
                        } label="Remember me" />
                        <Button type="submit" disabled={errors.length !== 0} fullWidth variant="contained" color="primary">Sign in</Button>
                    </form>
                </div>
                <div className="error">
                    { errors.length !== 0 && errors.map((error) => (
                        <Alert severity="error" className="m-1" key={error.message}>{error.message}</Alert>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
