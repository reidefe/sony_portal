<script lang="ts">
	export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
	export let dismissible = false;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="alert alert--{type}" role="alert">
	<span class="alert__icon" aria-hidden="true">
		{#if type === 'success'}✓{:else if type === 'warning'}⚠{:else if type === 'error'}✕{:else}ℹ{/if}
	</span>
	<div class="alert__body"><slot /></div>
	{#if dismissible}
		<button class="alert__close" on:click={() => dispatch('close')} aria-label="Dismiss">✕</button>
	{/if}
</div>

<style>
.alert {
	display: flex;
	align-items: flex-start;
	gap: .75rem;
	padding: .875rem 1rem;
	border-radius: var(--radius-md);
	font-size: .9rem;
	border: 1px solid transparent;
}
.alert--info    { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
.alert--success { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
.alert--warning { background: #fffbeb; border-color: #fde68a; color: #b45309; }
.alert--error   { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
.alert__icon { font-weight: 700; flex-shrink: 0; }
.alert__body { flex: 1; }
.alert__close { background: none; border: none; cursor: pointer; margin-left: auto; opacity: .7; }
.alert__close:hover { opacity: 1; }
</style>
