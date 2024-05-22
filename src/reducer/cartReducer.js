const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let { id, color, amount, product } = action.payload;

            //if item is already in the cart just update its quantity
            let exisitingItem = state.cart.find((item) => item.id === id + color);

            if (exisitingItem) {
                let updatedProduct = state.cart.map((item) => {
                    if (item.id === id + color) {
                        let newAmount = item.amount + amount;

                        if (newAmount > item.max) {
                            newAmount = item.max;
                        }
                        return {
                            ...item,
                            amount: newAmount,
                        }
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart: updatedProduct,
                }
            } else {
                const cartProduct = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.image[0].url,
                    price: product.price,
                    max: product.stock,
                }

                return {
                    ...state,
                    cart: [...state.cart, cartProduct],
                };
            }
        case 'SET_INCREASE':
            let updatedCart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    let newAmount = item.amount + 1;
                    if (newAmount > item.max) {
                        newAmount = item.max;
                    }
                    return {
                        ...item,
                        amount: newAmount,
                    }
                } else {
                    return item;
                }
            });
            return {
                ...state,
                cart: updatedCart,
            };

        case 'SET_DECREASE':
            let newCart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.amount > 1) {
                        let newAmount = item.amount - 1;
                        return {
                            ...item,
                            amount: newAmount,
                        }
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
            return {
                ...state,
                cart: newCart,
            };
        case 'DELETE_CART_ITEM':
            const tempCart = state.cart.filter((item) => item.id !== action.payload.id);
            return {
                ...state,
                cart: tempCart,
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            }
        case 'CART_TOTAL_ITEM':
            const totalItem = state.cart.reduce((total, item) => total += item.amount, 0);
            return {
                ...state,
                total_item: totalItem,
            };
        case 'CART_TOTAL_PRICE':
            const totalPrice = state.cart.reduce((total, item) => total += item.amount * item.price, 0);
            return {
                ...state,
                total_price: totalPrice,
            };

        case 'CART_TOTAL_ITEM_PRICE':
            let { total_price, total_item } = state.cart.reduce((total, item) => {
                let { price, amount } = item;
                total.total_price += amount * price;
                total.total_item += amount;
                return total;
            }, {
                total_price: 0,
                total_item: 0,
            });

            return {
                ...state,
                total_price,
                total_item,
            };
            return state;
        default:
            return state;
    }

};

export default cartReducer;