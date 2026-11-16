<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	export const buttonVariants = tv({
		base: "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-display leading-snug whitespace-nowrap uppercase outline-none select-none transition-transform duration-120 ease-[steps(1)] disabled:cursor-wait disabled:opacity-70 aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				// Chunky pixel buttons: a stepped outline, a hard drop shadow and bevelled insets.
				default:
					"pixel-button bg-primary text-primary-foreground [--btn-bc:var(--color-edge-bright)] [--btn-glint:var(--glint)] [--btn-shade:var(--color-shade)] hover:-translate-y-1 active:translate-y-1",
				secondary:
					"pixel-button bg-secondary text-secondary-foreground hover:-translate-y-1 hover:bg-accent active:translate-y-1",
				outline:
					"bg-card text-foreground shadow-[0_0_0_2px_var(--color-edge)] hover:bg-primary hover:text-primary-foreground",
				link: "text-link group-hover/card:text-hover-link",
			},
			size: {
				default: "min-h-12 px-6 py-3.5 text-[0.68rem]",
				sm: "px-3 py-2.5 text-[0.6rem]",
				inline: "text-[0.65rem]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
