import type {Context} from '../core/context';
import type {CSSValue} from './syntax/parser';

export interface ITypeDescriptor<T> {
	name: string;
	parse: (context: Context, value: CSSValue) => T;
}
