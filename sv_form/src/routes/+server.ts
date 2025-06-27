import { ADMIN, PASSWORD } from '$env/static/private';

export const GET = async ({ fetch }) => {
	const response = await fetch(`http://${ADMIN}:${PASSWORD}@localhost:5984/todos`);
	const data = await response.json();
	console.log(data);
	return new Response(JSON.stringify(data));
};
