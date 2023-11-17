import {configureStore} from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer';
import categoriaSlice from './categoriaReducer';

const store = configureStore({
    reducer:{
        cliente: clienteSlice,
        categoria: categoriaSlice
    }
});

export default store;