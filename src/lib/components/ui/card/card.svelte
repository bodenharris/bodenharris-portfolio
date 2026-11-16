<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { size?: "default" | "sm" } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn("pixel-box text-card-foreground group/card relative flex flex-col gap-4 p-(--card-spacing) [--card-spacing:--spacing(7)] max-sm:[--card-spacing:--spacing(5.5)]", className)}
	{...restProps}
>
	{@render children?.()}
</div>
