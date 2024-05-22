//create a context |
// provider |                         Context API
// consumer => useContext hook |
import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ProductReducer } from '../reducer/productReducer';

const AppContext = createContext();

const API = 'https://api.pujakaitem.com/api/products';

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featuredProducts: [],
    isSingleLoading: false,
    singleProduct: {},
};

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState);
    const getProducts = async (url) => {
        dispatch({ type: 'API_LOADING' });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type: 'SET_API_DATA', payload: products });
        } catch (error) {
            dispatch({ 'type': 'API_ERROR' });
        }
    };

    //Logic for fetching single product
    const getSingleProduct = async (URL) => {
        dispatch({ type: 'SET_SINGLE_PRODUCT_LOADING' });
        try {
            const res = await axios.get(URL);
            const singleProduct = await res.data;
            dispatch({ type: 'SET_SINGLE_PRODUCT', payload: singleProduct });
        } catch (error) {

        }
    }

    useEffect(() => {
        getProducts(API);
    }, []);

    return (<AppContext.Provider value={{ ...state, getSingleProduct }}>
        {children}
    </AppContext.Provider>
    );

}
//custom hook
const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };