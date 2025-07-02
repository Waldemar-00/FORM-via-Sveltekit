<script>
// @ts-nocheck
    import '../styles.css'
    import PouchDB from 'pouchdb'
    import {LocalTodosDB} from '$lib/client/pouchDB'

    let reactTodos = $state([])
    let value = $state('')
    const localTodosDB = new PouchDB('pouchDB_todos')

    const DB = new LocalTodosDB(localTodosDB)
    DB.getAllTodos().then(todos => {reactTodos = todos})
    const btoa = (str) => Buffer.from(str, 'utf-8').toString('base64');
    const remoteDB = new PouchDB(`http://admin:password@localhost:5984/todos`);
    localTodosDB
        .sync(remoteDB, {
            live: true,
            retry: true
        })
        // .on('change', function (info) {
        //     console.log('Received changes:', info);
        // })
        // .on('paused', function (err) {
        //     console.log("Paused");
        // })
        // .on('active', function () {
        //     console.log('Sync is active');
        // })
        // .on('denied', function (err) {
        //     console.error('No AUTH - denied:', err);
        // })
        // .on('error', function (err) {
        //     console.error('Sync ERROR:', err);
        // });
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
            <input type="checkbox" checked={t.done} onchange={(e) => { DB.toggleCheckbox(e, t._id) }}>
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
