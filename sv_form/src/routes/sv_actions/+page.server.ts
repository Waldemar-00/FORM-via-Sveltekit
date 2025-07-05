import PouchDB from 'pouchdb';
import { fail } from '@sveltejs/kit';
import { LocalTodosDB } from '$lib/client/pouchDB';
import { ADMIN, PASSWORD } from '$env/static/private';
const serverLocalTodosDB = new PouchDB('Server_PouchDB_todos');
const DB = new LocalTodosDB(serverLocalTodosDB);
const remoteDB = new PouchDB(`http://${ADMIN}:${PASSWORD}@localhost:5984/todos`);
serverLocalTodosDB.sync(remoteDB, {
	live: true,
	retry: true
});
export const load = async () => {
	const db = await DB.getAllTodos();
	return {
		db
	};
};
export const actions = {
	addTodo: async ({ request }) => {
		const todo = await request.formData();
		const todoStr = todo.get('todo');
		try {
			// throw new Error('Handle ERROR!!!!!');
			await DB.addTodo(new Date().toISOString(), todoStr, false);
		} catch (error) {
			let message;
			if (error instanceof Error) message = error.message;
			return fail(500, {
				description: todoStr,
				error: message
			});
		}
	},
	deleteTodo: async ({ request }) => {
		const todo = await request.formData();
		const id = todo.get('id');
		try {
			// throw new Error('Has not been deleted todo!!!');
			await DB.deleteTodo(id);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: `Todo id is ${id}`,
					error: error.message
				});
			}
		}
	},
	toggleCheckboxOnServer: async ({ request }) => {
		const checkbox = await request.formData();
		const checked = checkbox.get('toggleCheckbox');
		const id = checkbox.get('id');
		try {
			// throw id;
			if (checked) await DB.toggleCheckboxOnServer(true, id);
			else await DB.toggleCheckboxOnServer(false, id);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					description: `Todo id is ${id}!!!`,
					error: error.message
				});
			} else {
				return fail(500, {
					error: `Has not been toggle a todo\nwith id: ${error}!!!`
				});
			}
		}
	}
};
