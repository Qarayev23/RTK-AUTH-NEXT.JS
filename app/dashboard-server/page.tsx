import { cookies } from "next/headers";

async function getData() {
	const res = await fetch('http://localhost:3500/users',
		{
			headers: { Cookie: cookies().toString() },
		})

	if (res.status === 403) {
		// throw new Error('Failed to fetch data')
		
		// console.log('before refresh', cookies().get('accessToken'));

		const response = await fetch(`http://localhost:3500/refresh`, {
			headers: { Cookie: cookies().toString() },
		})

		const data = await response.json()

		// console.log('after refresh', data.accessToken);

		const resp = await fetch('http://localhost:3500/users', {
			headers: { Cookie: cookies().toString() },
		})

		if (resp.ok) {
			return resp.json()
		}

		return
	}

	return res.json()
}

export default async function Page() {
	const users = await getData()

	return (
		<>
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Dashboard
					</h1>
				</div>
			</header>
			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
				<ul>
					{users?.map((item) => (
						<li key={item.id}>
							{item.username}
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
