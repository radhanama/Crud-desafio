import { configureStore } from '@reduxjs/toolkit'


import animaisReducer from './animais/AnimaisSlice'

export const store = configureStore({
    reducer: {
      animais: animaisReducer
    }
})
