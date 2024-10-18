import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: [],
    checked: [],
    radio: [],
    artistCheckboxes: [],
    checkedArtists: []
}

const merchSlice = createSlice({
    name:'merch',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
          },
          setProducts: (state, action) => {
            state.products = action.payload;
          },
          setChecked: (state, action) => {
            state.checked = action.payload;
          },
          setRadio: (state, action) => {
            state.radio = action.payload;
          },
          setSelectedArtist: (state, action) => {
            state.setSelectedArtist = action.payload;
          }, 
    },
});

export const {
    setCategories,
    setProducts,
    setChecked,
    setRadio,
    setSelectedArtist,
  } = merchSlice.actions;

export default merchSlice.reducer