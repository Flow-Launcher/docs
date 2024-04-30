import type { TypingGenerator } from './TypingGenerator';

export const generateTypings = (data => {
	return `/**
 * @typedef {object} Settings
 ${data
		.filter(v => v.type !== 'textBlock')
		.map(input => {
			if (input.type !== 'dropdown')
				return `* @property {${input.attributes.defaultValue ? `string` : `string | undefined`}} ${input.attributes.name}`;
			else {
				const options = input.attributes.options
					?.map(option => `"${option.replace(/"/g, '\\"')}"`)
					.join(' | ');
				return `* @property {${options}} ${input.attributes.name}`;
			}
		})
		.join('\n ')
	}
 */`;
}) satisfies TypingGenerator;
