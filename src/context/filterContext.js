import { createContext, useReducer, useEffect, useContext } from "react";
import { useProductContext } from "./productContext";
const FilterContext = createContext();
import filterReducer from "../reducer/filterReducer";

export const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: 'lowest',
    filter: {
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    }
}


const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();
    const [state, dispatch] = useReducer(filterReducer, initialState);


    // set the grid view
    const setGridView = () => {
        dispatch({ type: 'SET_GRID_VIEW' });
    }

    const setListView = () => {
        dispatch({ type: 'SET_LIST_VIEW' });
    }

    //sorting functionality
    const sorting = (event) => {
        const selectedValue = event.target.value;
        dispatch({ type: 'GET_SORT_VALUE', payload: selectedValue });
    }

    //update the filters
    const updateFilterValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: 'UPDATE_FILTERS_VALUE', payload: { name, value } });
    };

    //to clear all filters
    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCTS' });
        dispatch({ type: 'SORTING_PRODUCTS' });
    }, [state.sorting_value, state.filter]);

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products });
    }, [products]);

    return (
        <FilterContext.Provider
            value={{
                ...state,
                setGridView,
                setListView,
                sorting,
                updateFilterValue,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};


export const useFilterContext = () => {
    return useContext(FilterContext);
};

export { FilterContextProvider };