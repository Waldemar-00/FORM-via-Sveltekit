<script>
    import Header from '$lib/menu/Header.svelte'
    let {children} = $props()
</script>
<h1>Welcome to SvelteKit</h1>

<Header/>

{@render children()}