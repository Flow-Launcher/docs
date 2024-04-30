import type { TypingGenerator } from './TypingGenerator';

export const generateTypings = (data => {
	const hasLiteral = data.some(v => v.type === 'dropdown');
	return `from typing import TypedDict${hasLiteral ? ', Literal' : ''}


Settings = TypedDict('Settings', {
	${data
		.filter(v => v.type !== 'textBlock')
		.map(input => {
			if (input.type !== 'dropdown')
				return `'${input.attributes.name}': ${input.attributes.defaultValue ? `str` : `str | None`}`;
			else {
				const options = input.attributes.options
					?.map(option => `"${option.replace(/"/g, '\\"')}"`)
					.join(', ');
				return `'${input.attributes.name}': Literal[${options}]`;
			}
		})
		.join(',\n\t')
	}
})`;
}) satisfies TypingGenerator;
