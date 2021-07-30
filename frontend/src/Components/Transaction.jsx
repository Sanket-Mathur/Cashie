import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Cart from './Cart';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';

import { CartContext } from "../App";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
            { value === index && (
                <Box p={3}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const query = {
    limit: 100,
    page: 0
};

function Transaction() {
    const cartInfo = useContext(CartContext);

    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState(null);
    const [allProducts, setAllProducts] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        async function getAllCategoriesAndProducts() {
            let result = await axios(
                `${
                    process.env.REACT_APP_BACKEND_API_URL
                }product/transaction?${queryString.stringify(query)}`,
            );
    
            setCategories(result.data.data.categories);
            setAllProducts(result.data.data.all);
        }
        getAllCategoriesAndProducts();
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Paper>
                            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
                                <Tab label="All" 
                                />
                                {categories && categories.map((category, index) => (
                                        <Tab label={category.name} key={category._id}
                                        />
                                    ))}
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <div className="tabs-wrapper d-flex text-center" style={{ justifyContent: "center", width: "100%" }}>
                                    {allProducts && allProducts.map((product) => (
                                        <Card className="transaction-product-card" onClick={() => cartInfo.handleSelection(product._id)} key={product._id}>
                                            <CardActionArea>
                                                <CardMedia component="img" alt={product.description} height="100" image={product.image} title={product.name} />
                                                <CardContent>
                                                    <Typography gutterBottom component="h6">
                                                        {product.name}
                                                    </Typography>
                                                </CardContent>
                                                <Typography gutterBottom component="h6" className="pink">
                                                    $ &nbsp;{product.price}
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    ))}
                                </div>
                            </TabPanel>
                            {categories && categories.map((category, index) => (
                                    <TabPanel value={value} index={index + 1} key={category._id}>
                                        <div className="tabs-wrapper d-flex text-center" style={{ justifyContent: "center", width: "100%" }}>
                                            {category.items.map((product) => (
                                                <Card className="transaction-product-card" key={product._id} onClick={() => cartInfo.handleSelection(product._id)}>
                                                    <CardActionArea>
                                                        <CardMedia component="img" alt={product.description} height="100" image={product.image} title={product.name} />
                                                        <CardContent>
                                                            <Typography gutterBottom component="h6">
                                                                {product.name}
                                                            </Typography>
                                                        </CardContent>
                                                        <Typography gutterBottom component="h6" className="pink">
                                                            $ &nbsp;{product.price}
                                                        </Typography>
                                                    </CardActionArea>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabPanel>
                                ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="p-2">
                            <Cart />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default Transaction;
