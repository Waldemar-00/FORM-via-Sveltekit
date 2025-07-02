<script>
     import '../styles.css'
     let {data} = $props()
     let form = $state()
     $inspect(data)
</script>
<h1>Actions</h1>


<form method="POST" action='?/addTodo'>
    <label title="write todo">
        <!-- svelte-ignore a11y_autofocus -->
        <input type="text" placeholder="add a todo" name='todo' autofocus>
    </label>
</form>

<ul>
    {#each data.db as t (t._id)}

        <li>
            <form method="POST" action="?/toggleCheckboxOnServer" bind:this={form}>
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
