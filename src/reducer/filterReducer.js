import { initialState } from '../context/filterContext';

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FILTER_PRODUCTS':
            let priceArr = action.payload.map((product) => product.price);
            let maxPrice = Math.max(...priceArr);
            //let maxPrice = Math.max.apply(Math, priceArr);
            //getting max of the array with reduce method
            // let maxprice = priceArr.reduce((initialValue, curVal) => Math.max(initialValue, curVal), 0);
            let minPrice = Math.min(...priceArr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filter: { ...state.filter, maxPrice: maxPrice, price: maxPrice, minPrice: minPrice },
            };
        case 'SET_GRID_VIEW':
            return {
                ...state,
                grid_view: true,
            };
        case 'SET_LIST_VIEW':
            return {
                ...state,
                grid_view: false,
            };
        case 'GET_SORT_VALUE':
            return {
                ...state,
                sorting_value: action.payload,
            };
        case 'SORTING_PRODUCTS':
            let newSortedData;
            const { filter_products, sorting_value } = state;
            let tempSortedProducts = [...filter_products];

            const sortProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                }
                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                }
                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                }
            }

            newSortedData = tempSortedProducts.sort(sortProducts);

            return {
                ...state,
                filter_products: newSortedData,
            }
        case 'UPDATE_FILTERS_VALUE':
            const { name, value } = action.payload;

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [name]: value,
                }
            };
        case 'FILTER_PRODUCTS':
            const { all_products } = state;
            let tempFilterProducts = [...all_products];
            const { text, category, company, color, price } = state.filter;

            if (text) {
                tempFilterProducts = tempFilterProducts.filter((product) => {
                    return product.name.toLowerCase().includes(text.toLowerCase());
                })
            }
            if (category !== 'all') {
                tempFilterProducts = tempFilterProducts.filter((product) => {
                    return product.category.toLowerCase() === category.toLowerCase();
                })
            }

            if (company !== 'all') {
                tempFilterProducts = tempFilterProducts.filter((product) => {
                    return product.company.toLowerCase() === company.toLowerCase();
                })
            }
            if (color !== 'all') {
                tempFilterProducts = tempFilterProducts.filter((product) => {
                    return product.colors.includes(color)
                })
            }

            if (price === 0) {
                tempFilterProducts = tempFilterProducts.filter((product) => product.price === price);
            } else {
                tempFilterProducts = tempFilterProducts.filter((product) => product.price <= price);
            }

            return {
                ...state,
                filter_products: tempFilterProducts,
            }

        case 'CLEAR_FILTERS':
            return {
                ...state,
                filter: {
                    text: '',
                    category: 'all',
                    company: 'all',
                    color: 'all',
                    maxPrice: state.filter.maxPrice,
                    price: state.filter.maxPrice,
                    minPrice: state.filter.minPrice,
                }
            }
        default:
            return state;
    }
}

export default filterReducer;