import React, { useState, Fragment } from 'react';
import { Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function CategoryForm(props) {
    const [formData, setFormData] = useState({
        category: ''
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
                <h4><ArrowBackIcon onClick={handleBackwards} className="back-icon" />&ensp;Form Category</h4>
				<Paper className="p-4 setting-data">
                    <form onChange={handleOnchange}>
                        <Grid container>
                            <p className="setting-content">Category Name</p>
                            <TextField className="setting-input" name="category" value={formData.category} variant="filled" required fullWidth autoFocus InputProps={{ disableUnderline: true }} />
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

export default CategoryForm;