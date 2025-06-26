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
		const docs = await this.#db.allDocs({
			include_docs: true, // full document => default value is false => only _id & _rev
			attachments: true // if docs have attachments like a photo => default false => without pages, files and act.
		});
		return await docs.rows.map((doc) => doc.doc);
	}
	async getTodoById(id) {
		return await this.#db.get(id);
	}
	async checkboxChanged(e, t) {
		t.done = e.target.checked;
		this.#db.put(t);
	}
}
// localTodosDB.compact(); no update CouchDB

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
