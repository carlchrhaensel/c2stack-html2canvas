import type {Context} from '../../core/context';
import {type IPropertyValueDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, isNumberToken} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';

interface zIndex {
	order: number;
	auto: boolean;
}

export const zIndex: IPropertyValueDescriptor<zIndex> = {
	name: 'z-index',
	initialValue: 'auto',
	prefix: false,
	type: PropertyDescriptorParsingType.VALUE,
	parse: (_context: Context, token: CSSValue): zIndex => {
		if (token.type === TokenType.IDENT_TOKEN) {
			return {auto: true, order: 0};
		}

		if (isNumberToken(token)) {
			return {auto: false, order: token.number};
		}

		throw new Error(`Invalid z-index number parsed`);
	}
};
