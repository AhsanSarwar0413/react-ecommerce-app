const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'SET_API_DATA':
            const featureData = action.payload.filter((item) => item.featured === true);
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featuredProducts: featureData,
            };
        case 'API_ERROR':
            return {
                ...state,
                loading: false,
                isError: true,
            };
        case 'SET_SINGLE_PRODUCT_LOADING':
            return {
                ...state,
                isSingleLoading: true,
            };
        case 'SET_SINGLE_PRODUCT':
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload,
            };
        case 'SET_SINGLE_ERROR':
            return {
                ...state,
                isSingleLoading: false,
                isError: true,
            };
        default:
            return state;
    }
};

export { ProductReducer };