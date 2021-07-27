import React, { useState, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function UserForm(props) {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const handleOnchange = (e) => {
        let newFormData = {...formData}; 
        newFormData[e.target.name] = e.target.value;       
        setFormData(newFormData);
        console.log(newFormData);
    }
    const handleBackwards = () => {
        props.history.goBack();
    }

    return (
        <Fragment>
            <div className="dashboard-container text-start">
                <h4><ArrowBackIcon onClick={handleBackwards} className="back-icon" />&ensp;Form User</h4>
				<Paper className="p-4 setting-data">
                    <form onChange={handleOnchange}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Full Name</p>
                                <TextField className="setting-input" name="fullname" value={formData.fullname} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Username</p>
                                <TextField className="setting-input" name="username" value={formData.username} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Email Address</p>
                                <TextField className="setting-input" name="email" value={formData.email} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Password</p>
                                <TextField className="setting-input" name="password" value={formData.password} variant="filled" type="password" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                            <p className="setting-content">Role</p>
                                <FormControl variant="filled" fullWidth className="setting-input me-4">
                                    <Select native label="Role" placeholder="Role" disableUnderline inputProps={{ name: "role" }}>
                                        <option value=""></option>
                                        <option value="admin">Admin</option>
                                        <option value="cashier">Cashier</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div className="text-end mt-4">
                            <Button className="setting-submit" type="submit" variant="contained" color="primary">Submit</Button>
                        </div>
                    </form>
				</Paper>
            </div>
        </Fragment>
    )
}

export default UserForm;