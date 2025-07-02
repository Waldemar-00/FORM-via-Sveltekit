// import { ADMIN, PASSWORD } from '$env/static/private';
// import { json } from '@sveltejs/kit';
// const btoa = (str: string) => Buffer.from(str, 'utf-8').toString('base64');
// export const GET = async ({ fetch }) => {
// 	const response = await fetch(`http://localhost:5984/todos`, {
// 		headers: {
// 			Authorization: 'Basic ' + btoa(`${ADMIN}:${PASSWORD}`)
// 		}
// 	});
// 	console.log(response.ok, 'SERVER');
// 	const data = await response.json();

// 	return json(data);
// };
