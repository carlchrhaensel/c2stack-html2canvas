import type {Context} from '../core/context';
import type {RenderConfigurations} from './canvas/canvas-renderer';

export class Renderer {
	constructor(
		protected readonly context: Context,
		protected readonly options: RenderConfigurations
	) {}
}
