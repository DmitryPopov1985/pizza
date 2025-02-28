import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id)

        if(findItem) {
          findItem.count++
        } else {
          state.items.push({
            ...action.payload,
            count: 1
          })
        }

        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price*obj.count) + sum
        }, 0)
    },
    removeOneItem(state, action){
      const findItem = state.items.find((obj) => obj.id === action.payload)

        if(findItem.count > 0) {
          findItem.count--
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price*obj.count) + sum
        }, 0)
    },
    removeItems(state, action) {
     state.items = state.items.filter((obj) => obj.id !== action.payload)
     state.totalPrice = state.items.reduce((sum, obj) => {
      return (obj.price*obj.count) + sum
    }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
    
  }
})
export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItems, clearItems, removeOneItem } = cartSlice.actions

export default cartSlice.reducer