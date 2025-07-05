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
    const remoteDB = new PouchDB(`http://admin:password@localhost:5984/todos`, {skip_setup: true});
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
<h2>Fill out the form below</h2>

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
<style>
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
</style>