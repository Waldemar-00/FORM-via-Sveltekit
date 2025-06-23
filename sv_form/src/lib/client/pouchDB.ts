import PouchDB from 'pouchdb';

const localTodosDB = new PouchDB('localTodos');

export async function addTodo(id: string, todo: string, done: boolean) {
	await localTodosDB.put({
		_id: id,
		todo,
		done,
		type: 'todo'
	});
	return id;
}
addTodo(crypto.randomUUID(), 'Example', false);

export async function getTodoById(id: string) {
	return await localTodosDB.get(id);
}
export async function getAllTodos() {
	const result = await localTodosDB.allDocs({
		include_docs: true,
		attachments: true
	});
	return result.rows.map((row) => row.doc);
}
// async function deleteTodo(id: string) {
// 	try {
// 		const doc = await localTodosDB.get(id);
// 		await localTodosDB.remove(doc);
// 		console.log(`Document with id=${id} removed`);
// 		localTodosDB.compact();
// 	} catch (err) {
// 		console.error('Remove ERROR:', err);
// 	}
// }
// async function bulkDelete(docs: any[]) {
// 	// docs — массив документов с _id и _rev
// 	const docsToDelete = docs.map((doc) => ({ ...doc, _deleted: true }));
// 	try {
// 		const result = await localTodosDB.bulkDocs(docsToDelete);
// 		console.log('Массовое удаление завершено', result);
// 	} catch (err) {
// 		console.error('Ошибка массового удаления:', err);
// 	}
// }

const todos = await getAllTodos();
export { todos, localTodosDB };
