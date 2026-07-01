<script lang="ts">
	export let variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
	export let size: 'sm' | 'md' = 'md';
</script>

<span class="badge badge--{variant} badge--{size}">
	<slot />
</span>

<style>
.badge {
	display: inline-flex;
	align-items: center;
	font-weight: 600;
	border-radius: var(--radius-full);
	white-space: nowrap;
}
.badge--sm { font-size: .6875rem; padding: .15rem .5rem; }
.badge--md { font-size: .75rem; padding: .25rem .75rem; }

.badge--primary { background: var(--color-primary-light); color: var(--color-primary); }
.badge--success { background: #d1fae5; color: #065f46; }
.badge--warning { background: #fef3c7; color: #92400e; }
.badge--danger  { background: #fee2e2; color: #991b1b; }
.badge--info    { background: #dbeafe; color: #1e40af; }
.badge--neutral { background: var(--color-border); color: var(--color-text-muted); }
</style>
