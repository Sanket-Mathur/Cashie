import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
import ReceiptModel from './Components/ReceiptModel';
import { Route, Switch, Redirect } from 'react-router-dom';

export const CartContext = createContext();
export const SettingsContext = createContext();

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [allProducts, setAllProducts] = useState(null);
    const [storeSettings, setStoreSettings] = useState(null);
    const [receiptModel, setReceiptModel] = useState(false);
    const [transactionData, setTransactionData] = useState(null);

    const subTotal = cartItems.length && cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = storeSettings ? (+storeSettings.discount / 100) * subTotal : 0;
    const tax = storeSettings ? (+storeSettings.tax / 100) * subTotal : 0;
    const grandTotal = subTotal + tax - discount;

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
    const handleSubmit = () => {
        let data = {
            items: cartItems,
            subtotal: subTotal,
            grandtotal: grandTotal,
            discount
        };
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_API_URL}transaction`,
            data: data,
        }).then((result) => {
            if (result.data.status === "success") {
                setCartItems([]);
                setReceiptModel(true);
                setTransactionData(result.data.data);
            } else {
                Swal.fire("Error", "Something went wrong", "error");
            }
        }).catch((err) => {
            Swal.fire("Error", "Something went wrong", "error");
        });
    };
    const handleReset = () => {
        setCartItems([]);
    };
    const handleOpen = (transaction) => {
        console.log("yay");
        setTransactionData(transaction);
        setReceiptModel(true);
    };
    const handleClose = () => {
        setReceiptModel(false);
    };

    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND_API_URL}product?limit=100000`).then((result) =>
            setAllProducts(result.data.data.products),
        );
        axios(`${process.env.REACT_APP_BACKEND_API_URL}setting`).then((result) => setStoreSettings(result.data.data));
    }, []);

    return (
        <div className="App">
            <CartContext.Provider value = {{ cartItems, handleCartDelete, handleQtyChange, handleSelection, handleSubmit, handleReset, handleOpen }}>
                <SettingsContext.Provider value={storeSettings}>
                    <Switch>
                        <Route path="/admin" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Redirect from="/" to="login" />
                    </Switch>
                </SettingsContext.Provider>
            </CartContext.Provider>
            <ReceiptModel isOpen={receiptModel} onClose={handleClose} onOpen={handleOpen} transactionData={transactionData}/>
        </div>
    );
}

export default App;
