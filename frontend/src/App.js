import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
import { Route, Switch, Redirect } from 'react-router-dom';

export const CartContext = createContext();
export const SettingsContext = createContext();

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [allProducts, setAllProducts] = useState(null);
    const [storeSettings, setStoreSettings] = useState(null);

    const handleQtyChange = (id, type) => {
        let index = cartItems.findIndex((item) => item._id === id);
        if (index !== -1) {
            let newCartItems = [...cartItems];
            if (newCartItems[index]["qty"] === 1 && type === "decrement") return;
            type === "increment" ? newCartItems[index]["qty"]++ : newCartItems[index]["qty"]--;
            setCartItems(newCartItems);
        }
    };
    const handleCartDelete = (id) => {
        let index = cartItems.findIndex((item) => item._id === id);
        let newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };
    const handleSelection = (id) => {
        let index = cartItems.findIndex((item) => item._id === id);
        if (index === -1) {
            let product = allProducts.find((p) => p._id === id);
            product.qty = 1;
            product.price = +product.price;
            setCartItems([...cartItems, product]);
        } else {
            let newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            setCartItems(newCartItems);
        }
    };
    const handleSubmit = (grandTotal) => {
        let data = {
            items: cartItems,
            grandtotal: grandTotal
        };
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_API_URL}transaction`,
            data: data,
        }).then((result) => {
            console.log(result);
            if (result.data.status === "success") {
                Swal.fire(
                    "Purchased successfully",
                );
            } else {
                Swal.fire("Error", "Something went wrong", "error");
            }
        }).catch((err) => {
            Swal.fire("Error", "Something went wrong", "error");
        });
    };
    const handleReset = () => {
        setCartItems([]);
    }

    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND_API_URL}product?limit=100000`).then((result) =>
            setAllProducts(result.data.data.products),
        );
        axios(`${process.env.REACT_APP_BACKEND_API_URL}setting`).then((result) => setStoreSettings(result.data.data));
    }, []);

    return (
        <div className="App">
            <CartContext.Provider value = {{ cartItems, handleCartDelete, handleQtyChange, handleSelection, handleSubmit, handleReset }}>
                <SettingsContext.Provider value={storeSettings}>
                    <Switch>
                        <Route path="/admin" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Redirect from="/" to="login" />
                    </Switch>
                </SettingsContext.Provider>
            </CartContext.Provider>
        </div>
    );
}

export default App;
