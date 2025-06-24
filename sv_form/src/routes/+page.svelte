<script>
// @ts-nocheck
    import PouchDB from 'pouchdb'
    import {LocalTodosDB} from '$lib/client/pouchDB'
    import './styles.css'

    let reactTodos = $state([])
    let value = $state('')
    const localTodosDB = new PouchDB('localTodos')
    const DB = new LocalTodosDB(localTodosDB)
    DB.getAllTodos().then(todos => {reactTodos = todos})
</script>
<h1>Welcome to SvelteKit</h1>
<h3>Fill out the form below</h3>

<form>
    <label title="write todo">
        <input type="text" placeholder="add a todo" name='todo' bind:value onchange={async () => {
            await DB.addTodo(crypto.randomUUID(), value, false)
            DB.getAllTodos().then(todos => {reactTodos = todos})
        }}>
    </label>
</form>

<ul>
    {#each reactTodos as t (t._id)}
        <li>{t.todo} <button onclick={async () => {
            await DB.deleteTodo(t._id)
            DB.getAllTodos().then(todos => {
                reactTodos = todos
            })
        }}>delete</button></li>
    {/each}
</ul>