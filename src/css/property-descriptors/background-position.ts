import type {Context} from '../../core/context';
import {type IPropertyListDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, parseFunctionArgs} from '../syntax/parser';
import {isLengthPercentage, type LengthPercentageTuple, parseLengthPercentageTuple} from '../types/length-percentage';
export type BackgroundPosition = BackgroundImagePosition[];

export type BackgroundImagePosition = LengthPercentageTuple;

export const backgroundPosition: IPropertyListDescriptor<BackgroundPosition> = {
	name: 'background-position',
	initialValue: '0% 0%',
	type: PropertyDescriptorParsingType.LIST,
	prefix: false,
	parse: (_context: Context, tokens: CSSValue[]): BackgroundPosition => {
		return parseFunctionArgs(tokens)
			.map((values: CSSValue[]) => values.filter(isLengthPercentage))
			.map(parseLengthPercentageTuple);
	}
};
