import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {category, sortBy, order, search, currentPage} = params
        const response = await axios.get(`https://66b451169f9169621ea27051.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`)
      return response.data
    },
  )

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading"
          state.items = []
          console.log(state, state.status)
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success"
          console.log(state, state.status)
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error"
          state.items = []
          console.log(state, state.status)
       })
 }
})
export const selectPizzas = (state) => state.pizzas
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer