<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	onMount(() => {
		auth.init();
	});
</script>

<svelte:head>
	<title>LearnHub — Online Learning Platform</title>
	<meta name="description" content="Unlock your potential with expert-led courses in tech, design, business, and more." />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
main { min-height: calc(100vh - var(--header-h) - 280px); }
</style>
