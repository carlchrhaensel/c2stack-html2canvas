import type {Context} from '../../core/context';
import {type IPropertyListDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';
import {type CSSValue, isIdentToken, parseFunctionArgs} from '../syntax/parser';
import type {StringValueToken} from '../syntax/tokenizer';
import {isLengthPercentage, type LengthPercentage} from '../types/length-percentage';

export enum BACKGROUND_SIZE {
	AUTO = 'auto',
	CONTAIN = 'contain',
	COVER = 'cover'
}

export type BackgroundSizeInfo = LengthPercentage | StringValueToken;
export type BackgroundSize = BackgroundSizeInfo[][];

export const backgroundSize: IPropertyListDescriptor<BackgroundSize> = {
	name: 'background-size',
	initialValue: '0',
	prefix: false,
	type: PropertyDescriptorParsingType.LIST,
	parse: (_context: Context, tokens: CSSValue[]): BackgroundSize => {
		return parseFunctionArgs(tokens).map((values) => values.filter(isBackgroundSizeInfoToken));
	}
};

const isBackgroundSizeInfoToken = (value: CSSValue): value is BackgroundSizeInfo =>
	isIdentToken(value) || isLengthPercentage(value);
