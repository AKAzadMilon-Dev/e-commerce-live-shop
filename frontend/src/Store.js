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

function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer, initialState)
    const [state2,dispatch2] = useReducer(reducer2, initialState2)

    const passValue = {state,dispatch,state2,dispatch2}
    return <Store.Provider value={passValue}>{props.children}</Store.Provider>
}

export {Store, StoreProvider}