"use client";

import Link from 'next/link';
import { Spinner } from '@/components/common';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth, setAccessToken } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		user: '',
		pwd: '',
	});

	const { user, pwd } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ user, pwd })
			.unwrap()
			.then((res) => {
				dispatch(setAuth());
				dispatch(setAccessToken(res.access_token));
				toast.success('Logged in');
				const nextUrl = searchParams.get("next");
				// @see: https://github.com/vercel/next.js/discussions/44149
				router.push(nextUrl ?? "/dashboard");
				router.refresh();
			})
			.catch(() => {
				toast.error('Failed to log in');
			});
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
					className='mx-auto h-10 w-auto'
					src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
					alt='Full Auth'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
					<form className='space-y-6' onSubmit={onSubmit}>
						<div>
							<div className='flex justify-between align-center'>
								<label
									htmlFor="user"
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									User Name
								</label>
							</div>
							<div className='mt-2'>
								<input
									id="user"
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									name="user"
									type="text"
									onChange={onChange}
									value={formData.user}
									required
								/>
							</div>
						</div>
						<div>
							<div className='flex justify-between align-center'>
								<label
									htmlFor="user"
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id="Password"
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									name="pwd"
									type="password"
									onChange={onChange}
									value={formData.pwd}
									required
								/>
							</div>
						</div>
						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								disabled={isLoading}>
								{isLoading ? <Spinner sm /> : 'Submit'}
							</button>
						</div>
					</form>
				</div>

				<p className='mt-10 text-center text-sm text-gray-500'>
					Don&apos;t have an account?{' '}
					<Link
						href='/auth/register'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Register here
					</Link>
				</p>
			</div>
			<Link
				href='/dashboard'
				className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
			>
				Dashboard
			</Link>
		</div>
	);
}
