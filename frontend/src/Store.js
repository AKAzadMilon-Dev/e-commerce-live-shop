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

function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer, initialState)

    const passValue = {state,dispatch}
    return <Store.Provider value={passValue}>{props.children}</Store.Provider>
}

export {Store, StoreProvider}