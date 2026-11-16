<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap",
		variants: {
			variant: {
				// A small technology tag.
				default: "bg-muted px-2 pt-0.5 pb-1 font-mono text-[1.15rem] leading-[1.1] text-muted-foreground shadow-[0_0_0_2px_var(--color-line)]",
				// A skill chip with a coloured pixel; set --chip to choose the colour.
				chip: "bg-muted py-1.5 pr-3 pl-2.5 text-base font-medium text-foreground shadow-[0_0_0_2px_var(--color-border),0_4px_0_0_var(--color-drop)] transition-transform duration-120 ease-[steps(1)] before:size-2 before:bg-(--chip) before:content-[''] hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--chip),0_8px_0_0_var(--color-drop)]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
