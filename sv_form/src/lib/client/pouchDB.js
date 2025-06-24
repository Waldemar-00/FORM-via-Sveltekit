export class LocalTodosDB {
	#db;
	constructor(db) {
		this.#db = db;
	}
	get db() {
		return this.#db;
	}
	async addTodo(id, todo, done, type = 'todo') {
		try {
			if (!todo) return;
			await this.#db.put({
				_id: id,
				todo,
				done,
				type
			});
		} catch (error) {
			console.log(`New todo has not been added: ${error.message}`);
		}

		return id;
	}
	async deleteTodo(id) {
		try {
			const doc = await this.#db.get(id);
			await this.#db.remove(doc);
		} catch (error) {
			console.log(`Todo hes not been deleted: ${error.message}`);
		}
	}
	async getAllTodos() {
		const result = await this.#db.allDocs({
			include_docs: true,
			attachments: true
		});
		return await result.rows.map((row) => row.doc);
	}
}

// const localTodosDB = new PouchDB('localTodos');

// export async function addTodo(id: string, todo: string, done: boolean) {
// 	await localTodosDB.put({
// 		_id: id,
// 		todo,
// 		done,
// 		type: 'todo'
// 	});
// 	return id;
// }
// addTodo(crypto.randomUUID(), 'Example', false);

// export async function getTodoById(id: string) {
// 	return await localTodosDB.get(id);
// }
// export async function getAllTodos() {
// 	const result = await localTodosDB.allDocs({
// 		include_docs: true,
// 		attachments: true
// 	});
// 	return result.rows.map((row) => row.doc);
// }

// const todos = await getAllTodos();
// export { todos, localTodosDB };

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
// async function deleteTodo(id) {
// 	try {
// 		const doc = await localTodosDB.get(id);
// 		await localTodosDB.remove(doc);
// 		// localTodosDB.compact();
// 		reactTodos = await getAllTodos();
// 	} catch (err) {
// 		console.error('Remove ERROR:', err);
// 	}
// }
