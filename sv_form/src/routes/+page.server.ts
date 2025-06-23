// export const load = async ({ fetch }) => {
// 	const response = await fetch('api');
// 	const todo = await response.json();
// 	console.log(todo);
// 	return { todo };
// };

// export const actions = {
// 	default: async ({ request }) => {
// 		const data = await request.formData();
// 		const todo = data.get('todo') as string;
// 		console.log(todo);
// 		// if (todo) db.push({ todo, id: crypto.randomUUID() });
// 	}
// };
