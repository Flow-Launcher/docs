import type { TypingGenerator } from './TypingGenerator';

export const generateTypings = (data => {
	return `interface Settings {
	${data
		.filter(v => v.type !== 'textBlock')
		.map(input => {
			if (input.type !== 'dropdown')
				return `${input.attributes.name}: ${input.attributes.defaultValue ? `string` : `string | undefined`};`;
			else {
				const options = input.attributes.options
					?.map(option => `"${option.replace(/"/g, '\\"')}"`)
					.join(' | ');
				return `${input.attributes.name}: ${options};`;
			}
		})
		.join('\n\t')
	}
}`;
}) satisfies TypingGenerator;
