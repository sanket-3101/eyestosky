// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        currentScreen: null,
    },
    reducers: {
        navigateToScreen: (state, action) => {
            state.currentScreen = action.payload;
        },
    },
});

export const { navigateToScreen } = navigationSlice.actions;



export default navigationSlice.reducer;
