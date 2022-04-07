import { createContext, useReducer } from "react";

const Store = createContext()

const initialState={
    cart:{
        cartItems: localStorage.getItem("localStorageCartItems") ? JSON.parse(localStorage.getItem("localStorageCartItems")) : []
    }
}

function reducer(state,action){
    switch(action.type){
        case 'ADD_CART_ITEM':{
            const newItem = action.payload
            const exitingItem = state.cart.cartItems.find((item)=> item._id === newItem._id)
            const cartItems = exitingItem ? state.cart.cartItems.map((item)=> item._id === exitingItem._id ? newItem : item) : [...state.cart.cartItems,newItem]
            localStorage.setItem("localStorageCartItems", JSON.stringify(cartItems))
            return{
                ...state,
                cart:{
                    ...state.cart,cartItems
                }
            }
        }
            
        case 'CART_REMOVE_ITEM':{
            const cartItems = state.cart.cartItems.filter((item)=>item._id !== action.payload._id)
            localStorage.setItem("localStorageCartItems", JSON.stringify(cartItems))
                return{
                ...state,
                cart:{
                    ...state.cart,cartItems
                }
            }
        }
            default:
                return state   
    }
}

// Wishlist Item Start
const initialState2={
    wishList:{
        wishListItems: localStorage.getItem("wishListItems") ? JSON.parse(localStorage.getItem("wishListItems")) : []
    }
}

function reducer2(state,action){
    switch(action.type){
        case 'WISHLIST_ADD_ITEM':{
            const newItem = action.payload
            const exitingItem = state.wishList.wishListItems.find((item)=> item._id === newItem._id)
            const wishListItems = exitingItem ? state.wishList.wishListItems.map((item)=> item._id === exitingItem._id ? newItem : item) : [...state.wishList.wishListItems,newItem]
            localStorage.setItem("wishListItems", JSON.stringify(wishListItems))
            return{
                ...state,
                wishList:{
                    ...state.wishList,wishListItems
                }
            }
        }
            
        case 'WISHLIST_REMOVE_ITEM':{
            const wishListItems = state.wishList.wishListItems.filter((item)=>item._id !== action.payload._id)
            localStorage.setItem("wishListItems", JSON.stringify(wishListItems))
                return{
                ...state,
                wishList:{
                    ...state.wishList,wishListItems
                }
            }
        }
            default:
                return state   
    }
}
// Wishlist Item End

// User Signin Information Start
const userInitialState={
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

function userreducer(state,action){
    switch(action.type){
        case 'USER_SIGNIN':
            return{...state, userInfo: action.payload}
        case 'USER_SIGNOUT':
            return{...state, userInfo: null}

                default:
                    return state   
    }
}
// User Signin Information End

// Shipping Address Start
const shippingInitialState={
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
}

function shippingreducer(state,action){
    switch(action.type){
        case 'SHIPPING_ADDRESS':
            return{...state, shippingInfo: action.payload}
        default:
            return state   
    }
}
// Shipping Address End

// Payment Method Start
const paymentInitialState={
    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}
}

function paymentreducer(state,action){
    switch(action.type){
        case 'PAYMENT_METHOD':
            return{...state, paymentMethod: action.payload}
        default:
            return state   
    }
}
// Payment Method End

function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer, initialState)
    const [state2,dispatch2] = useReducer(reducer2, initialState2)
    const [state3,dispatch3] = useReducer(userreducer, userInitialState)
    const [state4,dispatch4] = useReducer(shippingreducer, shippingInitialState)
    const [state5,dispatch5] = useReducer(paymentreducer, paymentInitialState)

    const passValue = {state,dispatch,state2,dispatch2,state3,dispatch3,state4,dispatch4,state5,dispatch5}
    return <Store.Provider value={passValue}>{props.children}</Store.Provider>
}

export {Store, StoreProvider}