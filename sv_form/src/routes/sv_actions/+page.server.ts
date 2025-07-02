import PouchDB from 'pouchdb';
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
		await DB.addTodo(new Date().toISOString(), todoStr, false);
	},
	deleteTodo: async ({ request }) => {
		const todo = await request.formData();
		const id = todo.get('id');
		await DB.deleteTodo(id);
	},
	toggleCheckboxOnServer: async ({ request }) => {
		const checkbox = await request.formData();
		const checked = checkbox.get('toggleCheckbox');
		const id = checkbox.get('id');
		if (checked) await DB.toggleCheckboxOnServer(true, id);
		else await DB.toggleCheckboxOnServer(false, id);
	}
};
