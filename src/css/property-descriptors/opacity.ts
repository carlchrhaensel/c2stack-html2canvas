import type {Context} from '../../core/context';
import {type IPropertyValueDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, isNumberToken} from '../syntax/parser';
export const opacity: IPropertyValueDescriptor<number> = {
	name: 'opacity',
	initialValue: '1',
	type: PropertyDescriptorParsingType.VALUE,
	prefix: false,
	parse: (_context: Context, token: CSSValue): number => {
		if (isNumberToken(token)) {
			return token.number;
		}
		return 1;
	}
};
