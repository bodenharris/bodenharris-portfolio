<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList | null } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"w-full min-w-0 bg-muted px-4 py-3 text-[1.08rem] text-foreground shadow-[0_0_0_4px_var(--color-border),inset_4px_4px_0_0_var(--well)] outline-none placeholder:text-muted-foreground focus-visible:shadow-[0_0_0_4px_var(--color-ring),inset_4px_4px_0_0_var(--well)] aria-invalid:shadow-[0_0_0_4px_var(--color-destructive),inset_4px_4px_0_0_var(--well)] disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"w-full min-w-0 bg-muted px-4 py-3 text-[1.08rem] text-foreground shadow-[0_0_0_4px_var(--color-border),inset_4px_4px_0_0_var(--well)] outline-none placeholder:text-muted-foreground focus-visible:shadow-[0_0_0_4px_var(--color-ring),inset_4px_4px_0_0_var(--well)] aria-invalid:shadow-[0_0_0_4px_var(--color-destructive),inset_4px_4px_0_0_var(--well)] disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
