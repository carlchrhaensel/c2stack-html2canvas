import {vi} from 'vitest';
import type {Bounds as BoundsType} from '../bounds';

export const {Bounds} = (await vi.importActual('../bounds')) as {Bounds: typeof BoundsType};
export const parseBounds = (): BoundsType => {
	return new Bounds(0, 0, 200, 50);
};
