import type {Context} from '../../core/context';
import {ElementContainer} from '../element-container';
export class LIElementContainer extends ElementContainer {
	readonly value: number;

	constructor(context: Context, element: HTMLLIElement) {
		super(context, element);
		this.value = element.value;
	}
}
