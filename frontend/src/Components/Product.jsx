import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import queryString from "query-string";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from "@material-ui/icons/Search";
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";

function Product(props) {
    const [query, setQuery] = useState({
        limit: 100,
    });
    const [products, setProducts] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleQueryChange = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value });
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This Product will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                let productCopy = [...products];
                let filtered = productCopy.filter((product) => product._id !== id);
                setProducts(filtered);
                axios
                    .delete(`${process.env.REACT_APP_BACKEND_API_URL}product/${id}`)
                    .then((res) => {
                        if (res.data.status === "success") {
                            Swal.fire(
                                "Deleted!",
                                "Product deleted successfully...",
                                "success",
                            );
                            setRefresh(!refresh);
                        } else {
                            setProducts(productCopy);
                            Swal.fire("Deleted!", "Something went wrong...", "error");
                        }
                    })
                    .catch((err) => {
                        setProducts(productCopy);
                        Swal.fire("Deleted!", "Something went wrong...", "error");
                    });
            }
        });
    };

    useEffect(() => {
        axios(
            `${process.env.REACT_APP_BACKEND_API_URL}product?${queryString.stringify(query)}`,
        ).then((result) => setProducts(result.data.data.products));
    }, [refresh, query]);
    
    return (
        <Fragment>
            <div className="dashboard-container text-start">
                <div className="user-heading">
                    <h4>Product List</h4>
                    <Link to={`${props.match.path}/create`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" className="user-newdata">+ New Data</Button>
                    </Link>
                </div>
                <Grid container justifyContent="flex-end" className="my-3">
                    <form onChange={handleQueryChange} className="user-form">
                        <section>
                            <p className="setting-content">Search</p>
                            <TextField placeholder="Keyword" name="keyword" className="setting-input user-input me-4" InputProps={{ disableUnderline: true, endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} variant="filled" />
                        </section>
                        <section>
                            <p className="setting-content">Sort By</p>
                            <FormControl variant="filled" className="setting-input user-input">
                                <Select native placeholder="Role" disableUnderline inputProps={{ name: "sort" }}>
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                    <option value="Name">Name</option>
                                    <option value="Lowest to Highest">Lowest to Highest</option>
                                    <option value="Highest to Lowest">Highest to Lowest</option>
                                </Select>
                            </FormControl>
                        </section>
                    </form>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { products && products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell component="th" scope="user">
                                                <img style={{ width: "75px" }} src={product.image} alt="" />
                                            </TableCell>
                                            <TableCell align="right">{product.name}</TableCell>
                                            <TableCell align="right">${product.price}</TableCell>
                                            <TableCell align="right">
                                                <Chip variant="outlined" label={ product.category.length && product.category[0].name } color="secondary" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to={`${props.match.path}/update/${product._id}`}>
                                                    <EditIcon />
                                                </Link>
                                                <DeleteIcon onClick={() => handleDelete(product._id)} className="delete-icon" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default Product
