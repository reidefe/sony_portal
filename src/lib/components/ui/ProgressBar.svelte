<script lang="ts">
	export let value = 0;   // 0–100
	export let label = '';
	export let showLabel = true;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: 'primary' | 'success' | 'warning' = 'primary';
</script>

<div class="progress-wrap">
	{#if showLabel && label}
		<div class="progress-meta">
			<span class="progress-label">{label}</span>
			<span class="progress-value">{Math.round(value)}%</span>
		</div>
	{/if}
	<div class="progress progress--{size}" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
		<div class="progress__bar progress__bar--{color}" style="width: {Math.min(100, Math.max(0, value))}%" />
	</div>
</div>

<style>
.progress-wrap { width: 100%; }
.progress-meta {
	display: flex;
	justify-content: space-between;
	font-size: .8125rem;
	color: var(--color-text-muted);
	margin-bottom: .375rem;
}
.progress-value { font-weight: 600; color: var(--color-text); }
.progress {
	width: 100%;
	background: var(--color-border);
	border-radius: var(--radius-full);
	overflow: hidden;
}
.progress--sm { height: 4px; }
.progress--md { height: 8px; }
.progress--lg { height: 12px; }
.progress__bar {
	height: 100%;
	border-radius: var(--radius-full);
	transition: width .4s ease;
}
.progress__bar--primary { background: var(--color-primary); }
.progress__bar--success { background: var(--color-success); }
.progress__bar--warning { background: var(--color-warning); }
</style>
