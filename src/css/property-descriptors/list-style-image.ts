import type {Context} from '../../core/context';
import {type IPropertyValueDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import type {CSSValue} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';
import {type ICSSImage, image} from '../types/image';

export const listStyleImage: IPropertyValueDescriptor<ICSSImage | null> = {
	name: 'list-style-image',
	initialValue: 'none',
	type: PropertyDescriptorParsingType.VALUE,
	prefix: false,
	parse: (context: Context, token: CSSValue) => {
		if (token.type === TokenType.IDENT_TOKEN && token.value === 'none') {
			return null;
		}

		return image.parse(context, token);
	}
};
