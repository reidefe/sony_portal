<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export let loading = false;
	export let fullWidth = false;

	$: tag = href ? 'a' : 'button';
</script>

{#if href}
	<a
		{href}
		class="btn btn--{variant} btn--{size}"
		class:btn--full={fullWidth}
		class:btn--loading={loading}
		aria-disabled={disabled || loading}
		on:click
		{...$$restProps}
	>
		{#if loading}<span class="spinner" aria-hidden="true" />{/if}
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		class="btn btn--{variant} btn--{size}"
		class:btn--full={fullWidth}
		class:btn--loading={loading}
		aria-disabled={disabled || loading}
		on:click
		{...$$restProps}
	>
		{#if loading}<span class="spinner" aria-hidden="true" />{/if}
		<slot />
	</button>
{/if}

<style>
.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: .5rem;
	font-weight: 600;
	border-radius: var(--radius-md);
	transition: all var(--transition);
	white-space: nowrap;
	text-decoration: none;
	border: 2px solid transparent;
	line-height: 1;
}
.btn:disabled, .btn--loading { opacity: .65; pointer-events: none; }
.btn--full { width: 100%; }

.btn--sm { font-size: .8125rem; padding: .4rem .875rem; }
.btn--md { font-size: .9375rem; padding: .6rem 1.25rem; }
.btn--lg { font-size: 1.0625rem; padding: .8rem 1.75rem; }

.btn--primary {
	background: var(--color-primary);
	color: #fff;
	border-color: var(--color-primary);
}
.btn--primary:hover { background: var(--color-primary-dark); border-color: var(--color-primary-dark); }

.btn--secondary {
	background: var(--color-primary-light);
	color: var(--color-primary);
	border-color: var(--color-primary-light);
}
.btn--secondary:hover { background: #ddd6fe; border-color: #ddd6fe; }

.btn--outline {
	background: transparent;
	color: var(--color-primary);
	border-color: var(--color-primary);
}
.btn--outline:hover { background: var(--color-primary-light); }

.btn--ghost {
	background: transparent;
	color: var(--color-text);
}
.btn--ghost:hover { background: var(--color-bg-alt); }

.btn--danger {
	background: var(--color-danger);
	color: #fff;
	border-color: var(--color-danger);
}
.btn--danger:hover { background: #dc2626; border-color: #dc2626; }

.spinner {
	display: inline-block;
	width: 1em; height: 1em;
	border: 2px solid currentColor;
	border-top-color: transparent;
	border-radius: 50%;
	animation: spin .6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
