import React, { useState, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Account() {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: ''
    });

    const handleOnchange = (e) => {
        let newFormData = {...formData}; 
        newFormData[e.target.name] = e.target.value;       
        setFormData(newFormData);
        console.log(newFormData);
    }
    return (
        <Fragment>
            <div className="dashboard-container text-start">
                <h4>Update Account</h4>
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

export default Account;
