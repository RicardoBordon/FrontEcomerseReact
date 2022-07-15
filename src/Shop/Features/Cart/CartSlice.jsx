import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    item: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addtoCart(state, payload) {
            state.item.push(payload.payload);
                alert("Agregado a Carrito");
        },
        numItems(state){
            let index = 0;
            state.item.forEach(element => {
                    element.count = index++;
            });
        },
        delFromCart(state, payload){
            state.item.splice(payload.payload, 1);
            let index = 0;
            state.item.forEach(element => {
                    element.count = index++;
            });
            alert("Eliminado de Carrito");

        },
    }
})

export const { addtoCart, numItems, delFromCart } = cartSlice.actions;

export default cartSlice.reducer