import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();

const CartProdvider = (({ children }) => {

    const getLocalStorageCartData = () => {
        let localCartData = localStorage.getItem('myCart');
        // if (localCartData == []) {
        //     return [];
        // } else {
        //     return JSON.parse(localCartData);
        // }
        const parsedData = JSON.parse(localCartData);
        if (!Array.isArray(parsedData)) return [];

        return parsedData;
    };

    const initialState = {
        cart: getLocalStorageCartData(),
        total_item: "",
        total_price: "",
        shipping_fee: 5000,
    };

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { id, color, amount, product } });
    }

    const deleteCartItem = (id) => {
        dispatch({ type: 'DELETE_CART_ITEM', payload: { id } });
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    const setIncrease = (id) => {
        dispatch({ type: 'SET_INCREASE', payload: id });
    }

    const setDecrease = (id) => {
        dispatch({ type: 'SET_DECREASE', payload: id });
    }

    //to add data in localStorage: set and get

    useEffect(() => {
        // dispatch({ type: 'CART_TOTAL_ITEM' });
        // dispatch({ type: 'CART_TOTAL_PRICE' });
        dispatch({ type: 'CART_TOTAL_ITEM_PRICE' });
        localStorage.setItem('myCart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, deleteCartItem, clearCart, setIncrease, setDecrease }}>
            {children}
        </CartContext.Provider>
    )
})

const useCartContext = () => {
    return useContext(CartContext);
}

export { CartProdvider, useCartContext };