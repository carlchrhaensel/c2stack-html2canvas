import type {Context} from '../../core/context';
import {type IPropertyListDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, nonFunctionArgSeparator} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';
import {type ICSSImage, image, isSupportedImage} from '../types/image';

export const backgroundImage: IPropertyListDescriptor<ICSSImage[]> = {
	name: 'background-image',
	initialValue: 'none',
	type: PropertyDescriptorParsingType.LIST,
	prefix: false,
	parse: (context: Context, tokens: CSSValue[]) => {
		if (tokens.length === 0) {
			return [];
		}

		const first = tokens[0];

		if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
			return [];
		}

		return tokens
			.filter((value) => nonFunctionArgSeparator(value) && isSupportedImage(value))
			.map((value) => image.parse(context, value));
	}
};
