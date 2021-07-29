import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, Paper } from "@material-ui/core";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        padding: "20px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ProductForm(props) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const [method, setMethod] = useState("POST");
    const [categories, setCategories] = useState([]);
    const [productImage, setProductImage] = useState(null);
    const classes = useStyles();
    const handleFormChange = (e) => {
        let newFormData = {...formData}; 
        newFormData[e.target.name] = e.target.value;       
        setFormData(newFormData);

        let validation = Joi.validate(newFormData, formSchema);
        if (validation.error) {
            setErrors(validation.error.details);
        } else {
            setErrors([]);
        }
    };

    const formSchema = {
        name: Joi.string().required().min(3).max(50),
        price: Joi.number().required().max(1000000000000),
        description: Joi.string().required().min(7).max(500),
        category: Joi.string().required().min(7).max(30),

        hidden: Joi.string(),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validation = Joi.validate(formData, formSchema, { abortEarly: false });
        if (validation.error) {
            setErrors(validation.error.details);
            return;
        }

        let i = new FormData();
        for (let x in formData) {
            if (x === "price") {
                i.append("price", +formData[x]);
            } else i.append(x, formData[x]);
        }
        productImage && i.append("image", productImage);

        axios({
            method,
            url: `${process.env.REACT_APP_BACKEND_API_URL}${
                method === "PUT" ? "product/" + props.match.params.id : "product"
            }`,
            data: i
        })
            .then((result) => {
                if (result.status === 200) {
                    setErrors([]);
                    Swal.fire(
                        `Product ${
                            method === "PUT" ? "updated" : "created"
                        } successfully`,
                    );
                    props.history.goBack();
                } else {
                    Swal.fire("Error", "Somethings went wrong", "error");
                }
            })
            .catch((err) => {
                Swal.fire("Error", "Somethings went wrong", "error");
            });
    };
    const handleUpload = (e) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = function (fileEvent) {
            setProductImage(fileEvent.target.result);
        };
    };
    const handleBackwards = () => {
        props.history.goBack();
    };
    
    useEffect(() => {
        props.match.params.id &&
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_API_URL}product/${props.match.params.id}`,
                )
                .then((result) => {
                    if (result.data.status === "success") {
                        let { name, price, description, image: hidden, category } = result.data.data;
                        setFormData({ name, price, description, hidden, category, });
                        setMethod("PUT");
                    }
                });
    }, [props.match.params.id]);
    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND_API_URL}category`).then((result) => setCategories(result.data.data.categories),
        );
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container text-start">
            <h4><ArrowBackIcon onClick={handleBackwards} className="back-icon" />&ensp;Form Product</h4>
                <Paper className="p-4 setting-data">
                    <div className={classes.paper}>
                        <form onSubmit={handleSubmit} onChange={handleFormChange} className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <p className="setting-content">Name</p>
                                    <TextField className="setting-input" name="name" variant="filled" fullWidth value={formData && formData.name} autoFocus InputProps={{ disableUnderline: true }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <p className="setting-content">Price</p>
                                    <TextField className="setting-input" variant="filled" fullWidth type="number" name="price" value={formData && formData.price} InputProps={{ disableUnderline: true, startAdornment: (<InputAdornment position="start">$</InputAdornment>) }}  />
                                </Grid>
                                <Grid item xs={12}>
                                    <p className="setting-content">Description</p>
                                    <TextField className="setting-input" autoComplete="fname" name="description" variant="filled" fullWidth multiline rows={3} id="firstName" autoFocus value={formData && formData.description} InputProps={{ disableUnderline: true }} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <p className="setting-content mt-3">Category</p>
                                <FormControl variant="filled" className="setting-input" fullWidth>
                                    <Select native placeholder="Category" disableUnderline inputProps={{ name: "category" }}>
                                        <option aria-label="None" value="" />
                                        {categories &&
                                            categories.map((category) => (
                                                <option selected={formData.category === category._id} key={category._id} value={category._id}> {category.name} </option>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container justifyContent="flex-start" className="my-3">
                                <label htmlFor="icon-button-file">
                                    <p className="setting-content">Image</p>
                                    <Button className="setting-submit image-btn" variant="contained" color="primary" component="span">
                                        <AddCircleOutlineIcon /> &nbsp; Browse
                                    </Button>
                                </label>
                                <input onChange={handleUpload} name="hidden" accept="image/*" className="d-none" id="icon-button-file" type="file"
                                />
                                {(productImage || formData.hidden) && (
                                    <img style={{ width: "200px", marginLeft: "100px" }} src={productImage ? productImage : formData.hidden} alt="product" />
                                )}
                            </Grid>
                            <div className="text-end mt-4">
                                <Button className="setting-submit" type="submit" variant="contained" color="primary">Submit</Button>
                            </div>                                
                        </form>
                    </div>
                </Paper>
            </div>
            <div className="error">
                { errors.length !== 0 && errors.map((error) => (
                    <Alert severity="error" className="m-1" key={error.message}>{error.message}</Alert>
                ))}
            </div>
        </Fragment>
    );
}
