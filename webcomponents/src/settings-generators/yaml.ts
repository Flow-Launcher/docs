import type { TypingGenerator } from './TypingGenerator';
import type {ComponentDataWithId} from '../types';
import { dump } from 'js-yaml';

export const generateSettingsTemplate = (data => {
	const json: ComponentDataWithId[] = JSON.parse(JSON.stringify(data));
	for (const element of json) {
		delete element.id;
		if (element.attributes.defaultValue == null) delete element.attributes.defaultValue;
		if (element.type !== 'dropdown') delete element.attributes.options;
		if (!element.attributes.label) delete element.attributes.label;
		if (!element.attributes.description) delete element.attributes.description;
		if (element.type === 'textBlock') element.attributes = { description: element.attributes.description };
		if (element.type === 'checkbox') {
			element.attributes.defaultValue = element.attributes.defaultValue === 'true' ? 'true' : 'false';
		} else {
			if (!element.attributes.defaultValue?.toString().trim()) delete element.attributes.defaultValue;
		}

		// Always put the `attributes` property after the `type` property for readability
		const attributes = element.attributes;
		delete element.attributes;
		element.attributes = attributes;
	}
	return dump({ body: json });
}) satisfies TypingGenerator;
