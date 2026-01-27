const ACTION = /^\s*(\w+ ?\w*):\s+(.+)/;
const TEXT = /^\s*\[(-?\d+), (-?\d+)\]:\s+(.+)/;
const WINDOW_SIZE = /^\[(-?\d+), (-?\d+)\]$/;
const RECTANGLE = /^\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\s+(.+)$/;
const REPEAT = /^Image\s+\("(.+)"\)\s+\[(-?\d+), (-?\d+)\]\s+Size\s+\((-?\d+), (-?\d+)\)\s+(.+)$/;
const PATH = /^Path \((.+)\)$/;
const VECTOR = /^Vector\(x: (-?\d+), y: (-?\d+)\)$/;
const BEZIER_CURVE =
	/^BezierCurve\(x0: (-?\d+), y0: (-?\d+), x1: (-?\d+), y1: (-?\d+), cx0: (-?\d+), cy0: (-?\d+), cx1: (-?\d+), cy1: (-?\d+)\)$/;
const SHAPE = /^(rgba?\((:?.+)\)) (Path .+)$/;
const CIRCLE = /^(rgba?\((:?.+)\)) Circle\(x: (-?\d+), y: (-?\d+), r: (-?\d+)\)$/;
const IMAGE =
	/^Image\s+\("(.+)"\)\s+\(source:\s+\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\)\s+\(destination:\s+\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\)$/;
const CANVAS =
	/^(Canvas)\s+\(source:\s+\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\)\s+\(destination:\s+\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\)$/;
const GRADIENT =
	/^\[(-?\d+), (-?\d+), (-?\d+), (-?\d+)\]\s+linear-gradient\(x0: (-?\d+), x1: (-?\d+), y0: (-?\d+), y1: (-?\d+) (.+)\)$/;
const TRANSFORM = /^\((-?\d+), (-?\d+)\) \[(.+)\]$/;

interface Vector {
	type: 'Vector';
	x: number;
	y: number;
}

interface BezierCurve {
	type: 'BezierCurve';
	x0: number;
	y0: number;
	x1: number;
	y1: number;
	cx0: number;
	cy0: number;
	cx1: number;
	cy1: number;
}

interface Circle {
	type: 'Circle';
	x: number;
	y: number;
	r: number;
}

type PathElement = Vector | BezierCurve;

interface BaseAction {
	action: string;
	line: number;
}

interface TextAction extends BaseAction {
	action: 'T';
	x: number;
	y: number;
	text: string;
}

interface OpacityAction extends BaseAction {
	action: 'Opacity';
	opacity: number;
}

interface FillAction extends BaseAction {
	action: 'Fill';
	color: string;
}

interface ClipAction extends BaseAction {
	action: 'Clip';
	path: PathElement[][];
}

interface WindowAction extends BaseAction {
	action: 'Window';
	width: number;
	height: number;
}

interface RectangleAction extends BaseAction {
	action: 'Rectangle';
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
}

interface RepeatAction extends BaseAction {
	action: 'Repeat';
	imageSrc: string;
	x: number;
	y: number;
	width: number;
	height: number;
	path: PathElement[];
}

interface ShapeAction extends BaseAction {
	action: 'Shape';
	color: string;
	path: PathElement[] | Circle[];
}

interface TextFontAction extends BaseAction {
	action: 'Text';
	font: string;
}

interface DrawImageAction extends BaseAction {
	action: 'Draw image';
	imageSrc: string;
	sx: number;
	xy: number;
	sw: number;
	sh: number;
	dx: number;
	dy: number;
	dw: number;
	dh: number;
}

interface GradientAction extends BaseAction {
	action: 'Gradient';
	x: number;
	y: number;
	width: number;
	height: number;
	x0: number;
	x1: number;
	y0: number;
	y1: number;
	stops: string;
}

interface TransformAction extends BaseAction {
	action: 'Transform';
	x: number;
	y: number;
	matrix: string;
}

type RefTestAction =
	| TextAction
	| OpacityAction
	| FillAction
	| ClipAction
	| WindowAction
	| RectangleAction
	| RepeatAction
	| ShapeAction
	| TextFontAction
	| DrawImageAction
	| GradientAction
	| TransformAction;

function parsePath(path: string): PathElement[] {
	const parts = path.match(PATH)?.[1];
	if (!parts) {
		throw new Error(`Invalid path: ${path}`);
	}

	return parts.split(' > ').map((p): PathElement => {
		const vector = p.match(VECTOR);
		if (vector) {
			return {
				type: 'Vector',
				x: Number.parseInt(vector[1], 10),
				y: Number.parseInt(vector[2], 10)
			};
		}

		const bezier = p.match(BEZIER_CURVE);
		if (!bezier) {
			throw new Error(`Invalid path element: ${p}`);
		}

		return {
			type: 'BezierCurve',
			x0: Number.parseInt(bezier[1], 10),
			y0: Number.parseInt(bezier[2], 10),
			x1: Number.parseInt(bezier[3], 10),
			y1: Number.parseInt(bezier[4], 10),
			cx0: Number.parseInt(bezier[5], 10),
			cy0: Number.parseInt(bezier[6], 10),
			cx1: Number.parseInt(bezier[7], 10),
			cy1: Number.parseInt(bezier[8], 10)
		};
	});
}

function parseRefTest(txt: string): RefTestAction[] {
	return txt
		.split(/\n/g)
		.filter((l) => l.length > 0)
		.map((l, i): RefTestAction => {
			const parseAction = l.match(ACTION);
			if (!parseAction) {
				const text = l.match(TEXT);
				if (!text) {
					throw new Error(`Invalid line ${i + 1}: ${l}`);
				}
				return {
					action: 'T',
					x: Number.parseInt(text[1], 10),
					y: Number.parseInt(text[2], 10),
					text: text[3],
					line: i + 1
				};
			}

			const args = parseAction[2];
			const action = parseAction[1];
			const line = i + 1;

			switch (action) {
				case 'Opacity':
					return {action, line, opacity: Number.parseFloat(args)};

				case 'Fill':
					return {action, line, color: args};

				case 'Clip':
					return {
						action,
						line,
						path: args.split(' | ').map((path) => parsePath(path))
					};

				case 'Window': {
					const windowSize = args.match(WINDOW_SIZE);
					if (!windowSize) throw new Error(`Invalid window size: ${args}`);
					return {
						action,
						line,
						width: Number.parseInt(windowSize[1], 10),
						height: Number.parseInt(windowSize[2], 10)
					};
				}

				case 'Rectangle': {
					const rectangle = args.match(RECTANGLE);
					if (!rectangle) throw new Error(`Invalid rectangle: ${args}`);
					return {
						action,
						line,
						x: Number.parseInt(rectangle[1], 10),
						y: Number.parseInt(rectangle[2], 10),
						width: Number.parseInt(rectangle[3], 10),
						height: Number.parseInt(rectangle[4], 10),
						color: rectangle[5]
					};
				}

				case 'Repeat': {
					const repeat = args.match(REPEAT);
					if (!repeat) throw new Error(`Invalid repeat: ${args}`);
					return {
						action,
						line,
						imageSrc: repeat[1],
						x: Number.parseInt(repeat[2], 10),
						y: Number.parseInt(repeat[3], 10),
						width: Number.parseInt(repeat[4], 10),
						height: Number.parseInt(repeat[5], 10),
						path: parsePath(repeat[6])
					};
				}

				case 'Shape': {
					const circle = args.match(CIRCLE);
					if (circle) {
						return {
							action,
							line,
							color: circle[1],
							path: [
								{
									type: 'Circle',
									x: Number.parseInt(circle[3], 10),
									y: Number.parseInt(circle[4], 10),
									r: Number.parseInt(circle[5], 10)
								}
							]
						};
					}

					const shape = args.match(SHAPE);
					if (!shape) throw new Error(`Invalid shape: ${args}`);
					return {
						action,
						line,
						color: shape[1],
						path: parsePath(shape[3])
					};
				}

				case 'Text':
					return {action, line, font: args};

				case 'Draw image': {
					const image = args.match(IMAGE) ?? args.match(CANVAS);
					if (!image) throw new Error(`Invalid image: ${args}`);
					return {
						action,
						line,
						imageSrc: image[1],
						sx: Number.parseInt(image[2], 10),
						xy: Number.parseInt(image[3], 10),
						sw: Number.parseInt(image[4], 10),
						sh: Number.parseInt(image[5], 10),
						dx: Number.parseInt(image[6], 10),
						dy: Number.parseInt(image[7], 10),
						dw: Number.parseInt(image[8], 10),
						dh: Number.parseInt(image[9], 10)
					};
				}

				case 'Gradient': {
					const gradient = args.match(GRADIENT);
					if (!gradient) throw new Error(`Invalid gradient: ${args}`);
					return {
						action,
						line,
						x: Number.parseInt(gradient[1], 10),
						y: Number.parseInt(gradient[2], 10),
						width: Number.parseInt(gradient[3], 10),
						height: Number.parseInt(gradient[4], 10),
						x0: Number.parseInt(gradient[5], 10),
						x1: Number.parseInt(gradient[6], 10),
						y0: Number.parseInt(gradient[7], 10),
						y1: Number.parseInt(gradient[8], 10),
						stops: gradient[9]
					};
				}

				case 'Transform': {
					const transform = args.match(TRANSFORM);
					if (!transform) throw new Error(`Invalid transform: ${args}`);
					return {
						action,
						line,
						x: Number.parseInt(transform[1], 10),
						y: Number.parseInt(transform[2], 10),
						matrix: transform[3]
					};
				}

				default:
					console.log(args);
					throw new Error(`Unhandled action ${action}`);
			}
		});
}

export default parseRefTest;
