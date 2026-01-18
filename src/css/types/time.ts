import type {Context} from '../../core/context';
import type {ITypeDescriptor} from '../ITypeDescriptor';
import type {CSSValue} from '../syntax/parser';
import {TokenType} from '../syntax/tokenizer';

export const time: ITypeDescriptor<number> = {
	name: 'time',
	parse: (_context: Context, value: CSSValue): number => {
		if (value.type === TokenType.DIMENSION_TOKEN) {
			switch (value.unit.toLowerCase()) {
				case 's':
					return 1000 * value.number;
				case 'ms':
					return value.number;
			}
		}

		throw new Error(`Unsupported time type`);
	}
};
