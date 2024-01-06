import { apiSlice } from '../api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: ({ user, pwd }) => ({
				url: '/auth',
				method: 'POST',
				body: { user, pwd },
			})
		}),
		register: builder.mutation({
			query: ({
				user,
				pwd
			}) => ({
				url: '/register',
				method: 'POST',
				body: { user, pwd },
			}),
		}),
		logout: builder.query<any, void>({
			query: () => '/logout',
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutQuery,
} = authApiSlice;
