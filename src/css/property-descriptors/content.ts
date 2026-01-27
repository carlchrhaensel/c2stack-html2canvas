import type {Context} from '../../core/context';
import {type IPropertyListDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import type {CSSValue} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';

export type Content = CSSValue[];

export const content: IPropertyListDescriptor<Content> = {
	name: 'content',
	initialValue: 'none',
	type: PropertyDescriptorParsingType.LIST,
	prefix: false,
	parse: (_context: Context, tokens: CSSValue[]) => {
		if (tokens.length === 0) {
			return [];
		}

		const first = tokens[0];

		if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
			return [];
		}

		return tokens;
	}
};
