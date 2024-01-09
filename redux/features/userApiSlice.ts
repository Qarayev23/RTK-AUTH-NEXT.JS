import { apiSlice } from '../api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUser: builder.query<any, void>({
			query: () => '/users',
		}),
	}),
});

export const {
	useGetUserQuery,
} = authApiSlice;
