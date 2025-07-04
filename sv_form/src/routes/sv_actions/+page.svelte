<script>
     import '../styles.css'
     import {enhance} from '$app/forms'
     let {data, form } = $props()
</script>
<h2>Actions</h2>

{#if form?.error}
<div class=error>
    <h2><pre>{form?.description}</pre></h2>
    <h2><pre>{form?.error}</pre></h2>
</div>
{/if}
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
    div h2 {
        color: red
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
    .error {
        position:fixed;
        right: 0;
        top: 0;
    }
</style>