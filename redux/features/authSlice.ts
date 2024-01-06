import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	accessToken: string;
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	accessToken: '',
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		logout: state => {
			state.isAuthenticated = false;
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		}
	},
});

export const { setAuth, logout, finishInitialLoad, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
