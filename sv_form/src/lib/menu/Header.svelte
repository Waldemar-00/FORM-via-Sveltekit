<script>
    import {anchors} from './menu_data'
</script>
<div class=wrapper_header>
    <ul class=header>
        {#each anchors as a, i (a + i)}
        {#if a === 'home'}
                <li><a href='/'>{a}</a></li>
            {:else}
                <li><a href={a}>{a}</a></li>
        {/if}

        {/each}
    </ul>
</div>

<style>
    .wrapper_header {
        position:fixed;
        left: 0;
        top: 0;
    }
    .header {
        list-style: none;
    }
    .header li {
        margin-bottom: 0.2rem;
    }
    .header li a {
        padding: 0.5rem 2.5rem 0.5rem 0rem;
        text-decoration: none;
        font-size: 1.2rem;
        color: green;
        font-style: italic;
    }
</style>