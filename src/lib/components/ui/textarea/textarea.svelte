<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from "#lib/utils.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(
		"w-full min-w-0 bg-muted px-4 py-3 text-[1.08rem] text-foreground shadow-[0_0_0_4px_var(--color-border),inset_4px_4px_0_0_var(--well)] outline-none placeholder:text-muted-foreground focus-visible:shadow-[0_0_0_4px_var(--color-ring),inset_4px_4px_0_0_var(--well)] aria-invalid:shadow-[0_0_0_4px_var(--color-destructive),inset_4px_4px_0_0_var(--well)] disabled:cursor-not-allowed disabled:opacity-50 min-h-32 resize-y",
		className
	)}
	bind:value
	{...restProps}></textarea>
