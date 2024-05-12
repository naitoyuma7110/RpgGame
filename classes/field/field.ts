import type { Delta, Position } from "@/types/util";
import { FieldPlayer } from "./character/fieldCharacter";
import { BlankTile } from "./staticObject/staticObject";

export interface FieldObject {
	fieldViewImagePath: string;
}

export interface FieldCharacter extends FieldObject {
	fieldPosition: Position;
	move(delta?: Delta): void;
}

export interface StaticObject extends FieldObject {
	fieldPosition: Position;
}

const row = 20;
const col = 20;

export class Field {
	private fieldCharacters: FieldCharacter[];
	private staticObjects: StaticObject[];

	private staticField: FieldObject[][];

	constructor() {
		this.fieldCharacters = [];
		this.staticObjects = [];

		// const player = new FieldPlayer();
		// this.fieldCharacters.push(player);

		for (let i = 0; i < row; i++) {
			for (let j = 0; j < col; j++) {
				const position = {
					x: j,
					y: i,
				};
				this.staticObjects.push(new BlankTile(position));
			}
		}

		this.staticField = [];
		for (let i = 0; i < row; i++) {
			this.staticField.push(new Array(col));
		}

		this.staticObjects.forEach((staticObject) => {
			const position = staticObject.fieldPosition;
			this.staticField[position.y][position.x] = staticObject;
		});
	}

	addFieldCharacter(fieldCharacter: FieldCharacter) {
		this.fieldCharacters.push(fieldCharacter);
	}

	getRenderField(): FieldObject[][] {
		const renderField: FieldObject[][] = [...this.staticField];

		this.fieldCharacters.forEach((fieldCharacter) => {
			const position = fieldCharacter.fieldPosition;
			renderField[position.y][position.x] = fieldCharacter;
		});

		return renderField;
	}
}
