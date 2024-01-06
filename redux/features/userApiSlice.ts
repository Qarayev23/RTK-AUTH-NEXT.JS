import { apiSlice } from '../api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		GetUser: builder.query<any, void>({
			query: () => '/users',
		}),
	}),
});

export const {
	useGetUserQuery,
} = authApiSlice;
