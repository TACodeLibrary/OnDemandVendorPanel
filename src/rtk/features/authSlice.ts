import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../../types/auth';


export interface AuthState {
    data: AuthData | null
}


const initialState: AuthState = {
    data: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState['data']>) => {
            state.data = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth.data;
