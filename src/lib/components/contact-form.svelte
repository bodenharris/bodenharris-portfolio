<script lang="ts">
	import { sendMessage } from '#lib/contact.remote.js';
	import { email as myEmail } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import * as Field from '#lib/components/ui/field/index.js';
	import { Input } from '#lib/components/ui/input/index.js';
	import { Textarea } from '#lib/components/ui/textarea/index.js';

	const { email, message } = sendMessage.fields;
</script>

<Card.Root class="self-start" {@attach reveal()}>
	<form
		{...sendMessage.enhance(async ({ element, submit }) => {
			await submit();
			if (sendMessage.result?.sent) element.reset();
		})}
	>
		<Field.FieldGroup class="flex flex-col gap-6">
			<Field.Field data-invalid={!!email.issues()}>
				<Field.FieldLabel for="email">Your email</Field.FieldLabel>
				<Input id="email" autocomplete="email" required {...email.as('email')} />
				<Field.FieldError errors={email.issues()} />
			</Field.Field>
			<Field.Field data-invalid={!!message.issues()}>
				<Field.FieldLabel for="message">Message</Field.FieldLabel>
				<Textarea id="message" rows={5} required {...message.as('text')} />
				<Field.FieldError errors={message.issues()} />
			</Field.Field>
			<Button type="submit" class="mt-1" disabled={!!sendMessage.pending}>
				{sendMessage.pending ? 'Sending…' : 'Send message'}
			</Button>
		</Field.FieldGroup>
	</form>
	{#if sendMessage.result}
		<p class="text-base leading-normal text-muted-foreground" role="status">
			{sendMessage.result.sent
				? 'Thanks — your message has been sent.'
				: `The message could not be sent. Please email me at ${myEmail} instead.`}
		</p>
	{/if}
</Card.Root>
