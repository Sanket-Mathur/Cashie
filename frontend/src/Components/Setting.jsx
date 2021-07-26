import React, { useState, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

function Setting() {
    const [formData, setFormData] = useState({
        storeName: '',
        discount: '',
        tax: ''
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
                <h4>Update Store Setting</h4>
				<Paper className="p-4 setting-data">
                    <form onChange={handleOnchange}>
                        <p className="setting-content">Store Name</p>
                        <TextField className="mb-3 setting-input" name="storeName" value={formData.storeName} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Discount</p>
                                <TextField className="setting-input" name="discount" value={formData.discount} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true, endAdornment: <InputAdornment position="start">%</InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <p className="setting-content">Tax</p>
                                <TextField className="setting-input" name="tax" value={formData.tax} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true, endAdornment: <InputAdornment position="start">%</InputAdornment> }} />
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

export default Setting;
