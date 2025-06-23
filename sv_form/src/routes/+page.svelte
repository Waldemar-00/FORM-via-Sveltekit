<script>
// @ts-nocheck

    import './styles.css'
    import {todos, localTodosDB,  getAllTodos} from '$lib/client/pouchDB'

    let reactTodos = $state(todos)
    $inspect( todos )
    async function deleteTodo(id) {
	try {
		const doc = await localTodosDB.get(id);
		await localTodosDB.remove(doc);
		// localTodosDB.compact();
        reactTodos = await getAllTodos()
	} catch (err) {
		console.error('Remove ERROR:', err);
	}
}
</script>
<h1>Welcome to SvelteKit</h1>
<h3>Fill out the form below</h3>

<form method="POST">
    <label title="write todo">
        <input type="text" placeholder="add a todo" name='todo'>
    </label>
</form>

<ul>
    {#each reactTodos as t (t)}
        <li>{t.todo} <button onclick={() => deleteTodo(t._id)}>delete</button></li>
    {/each}
</ul>