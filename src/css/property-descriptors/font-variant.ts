import type {Context} from '../../core/context';
import {type IPropertyListDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, isIdentToken} from '../syntax/parser';
export const fontVariant: IPropertyListDescriptor<string[]> = {
	name: 'font-variant',
	initialValue: 'none',
	type: PropertyDescriptorParsingType.LIST,
	prefix: false,
	parse: (_context: Context, tokens: CSSValue[]): string[] => {
		return tokens.filter(isIdentToken).map((token) => token.value);
	}
};
