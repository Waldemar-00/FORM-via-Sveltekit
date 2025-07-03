<script>
     import '../styles.css'
     import {enhance} from '$app/forms'
     let {data} = $props()
</script>
<h2>Actions</h2>


<form method="POST" action='?/addTodo'>
    <label title="write todo">
        <!-- svelte-ignore a11y_autofocus -->
        <input type="text" placeholder="add a todo" name='todo' autofocus>
    </label>
</form>

<ul>
    {#each data.db as t (t._id)}

        <li>
            <form method="POST" action="?/toggleCheckboxOnServer" use:enhance>
                <input type="hidden" name="id" value={t._id}>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <input type="checkbox" checked={t.done} name='toggleCheckbox' value={t.done} onchange={(e) => e.target.form.requestSubmit()}>
            </form>
            <div>
                <span>{t.todo}</span>
            <form method="POST" action='?/deleteTodo'>
                <label title="delete todo">
                    <!-- svelte-ignore a11y_autofocus -->
                    <input type="hidden" name="id" value={t._id}>
                    <button type="submit">delete</button>
                </label>
            </form>
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