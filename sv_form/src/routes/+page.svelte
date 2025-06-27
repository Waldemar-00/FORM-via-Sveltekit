<script>
// @ts-nocheck
    import './styles.css'
    import PouchDB from 'pouchdb'
    import {LocalTodosDB} from '$lib/client/pouchDB'

    let reactTodos = $state([])
    let value = $state('')
    const localTodosDB = new PouchDB('todos')
    const remoteDB = new PouchDB('/');

localTodosDB
	.sync(remoteDB, {
		live: true,
		retry: true
	})
	.on('change', function (info) {
		console.log('Received changes:', info);
	})
	.on('paused', function (err) {
		console.log("Paused");
	})
	.on('active', function () {
		console.log('Sync is active');
	})
	.on('denied', function (err) {
		console.error('No AUTH - denied:', err);
	})
	.on('error', function (err) {
		console.error('Sync ERROR:', err);
	});
    const DB = new LocalTodosDB(localTodosDB)
    DB.getAllTodos().then(todos => {reactTodos = todos})
</script>
<h1>Welcome to SvelteKit</h1>
<h3>Fill out the form below</h3>

<form>
    <label title="write todo">
        <!-- svelte-ignore a11y_autofocus -->
        <input type="text" placeholder="add a todo" name='todo' autofocus bind:value onchange={async () => {
            await DB.addTodo(new Date().toISOString(), value, false)
            DB.getAllTodos().then(todos => {reactTodos = todos})
        }}>
    </label>
</form>

<ul>
    {#each reactTodos as t (t._id)}

        <li>
            <input type="checkbox" checked={t.done} onchange={(e) => { DB.checkboxChanged(e, t) }}>
            <div>
                <span>{t.todo}</span>
                <button onclick={async () => {
                    await DB.deleteTodo(t._id)
                    DB.getAllTodos().then(todos => {
                        reactTodos = todos
                    })
                }}>delete</button>
            </div>
        </li>
    {/each}
</ul>

<style>
    button {
        background-color: #fff;
        border: none;
        font-size: 0.7rem;
        font-style: italic;
        color: red;
    }
    li {
        display: flex;
        gap: 0.7rem;
    }
    li div {
        min-width: 30vw;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.5rem 1.5rem;
        border: 1px solid #eee;
        border-radius: 3px;
        margin-bottom: 0.5rem;
    }
    [name='todo'] {
        padding: 0.5rem 1.5rem;
        border-radius: 3px;
        border: 1px solid #eee;
        margin-bottom: 0.5rem;
        outline: none;
    }
    [name='todo']:focus {
        outline: 2px solid orange
    }
</style>