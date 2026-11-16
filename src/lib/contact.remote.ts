import * as v from 'valibot';
import { form } from '$app/server';

const FORMSPREE_URL = 'https://formspree.io/f/mldpwzlr';

export const sendMessage = form(
	v.object({
		email: v.pipe(v.string(), v.trim(), v.email('Enter a valid email address.')),
		message: v.pipe(v.string(), v.trim(), v.nonEmpty('Write a message first.'), v.maxLength(5000))
	}),
	async ({ email, message }) => {
		// Forwarded from the server, so the form works with or without JavaScript.
		const response = await fetch(FORMSPREE_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ email, message })
		}).catch(() => null);

		return { sent: !!response?.ok };
	}
);
