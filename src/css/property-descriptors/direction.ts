import type {Context} from '../../core/context';
import {type IPropertyIdentValueDescriptor, PropertyDescriptorParsingType} from '../IPropertyDescriptor';

export enum DIRECTION {
	LTR = 0,
	RTL = 1
}

export const direction: IPropertyIdentValueDescriptor<DIRECTION> = {
	name: 'direction',
	initialValue: 'ltr',
	prefix: false,
	type: PropertyDescriptorParsingType.IDENT_VALUE,
	parse: (_context: Context, direction: string) => {
		switch (direction) {
			case 'rtl':
				return DIRECTION.RTL;
			case 'ltr':
			default:
				return DIRECTION.LTR;
		}
	}
};
