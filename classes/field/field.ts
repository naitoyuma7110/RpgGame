import type { Delta, Position } from "@/types/util";
import {
	BlankTile,
	Tree,
	WarpTile,
} from "@/classes/field/staticObject/staticObject";

export interface FieldObject {
	fieldViewImagePath: string;
	fieldPosition: Position;
}

export interface FieldCharacter extends FieldObject {
	move(delta?: Delta, position?: Position): void;
}

export interface StaticObject extends FieldObject {
	isPassable: boolean;
	collisionEvent(fieldCharacter: FieldCharacter): void;
}

const fieldRow = 20;
const filedCol = 20;

export class Field {
	private fieldCharacters: FieldCharacter[];
	private staticObjects: StaticObject[];

	staticField: StaticObject[][];
	activeField: FieldCharacter[][];

	constructor() {
		this.fieldCharacters = [];
		this.staticObjects = [];
		this.staticField = [];
		this.activeField = [];

		for (let i = 0; i <= fieldRow; i++) {
			this.staticField.push(new Array(filedCol));
			this.activeField.push(new Array(filedCol).fill(null));

			for (let j = 0; j <= filedCol; j++) {
				const position = {
					x: j,
					y: i,
				};
				let object;
				if (i == 0 || i == filedCol || j == 0 || j == fieldRow) {
					object = new Tree(position);
				} else if (i % 4 == 1 && j % 5 == 1) {
					object = new WarpTile(position);
				} else {
					object = new BlankTile(position);
				}

				this.staticObjects.push(object);
				this.staticField[position.y][position.x] = object;
			}
		}
	}

	private getObjectOnPosition(targetPosition: Position): {
		fieldCharacter: FieldCharacter | undefined;
		staticObject: StaticObject | undefined;
	} {
		const staticObject = this.staticObjects.find(
			(staticObject) => (staticObject.fieldPosition = targetPosition)
		);

		const fieldCharacter = this.fieldCharacters.find(
			(fieldCharacter) => (fieldCharacter.fieldPosition = targetPosition)
		);

		const result = {
			fieldCharacter: fieldCharacter,
			staticObject: staticObject,
		};

		return result;
	}

	addFieldCharacter(fieldCharacter: FieldCharacter) {
		this.fieldCharacters = [...this.fieldCharacters, fieldCharacter];
		this.updateActiveField();
	}

	updateActiveField() {
		const newActiveField: FieldCharacter[][] = [];
		for (let i = 0; i <= fieldRow; i++) {
			newActiveField.push(new Array(filedCol));
		}

		this.fieldCharacters.forEach((fieldCharacter) => {
			const position = fieldCharacter.fieldPosition;
			newActiveField[position.y][position.x] = fieldCharacter;
		});
		this.activeField = newActiveField;
	}

	collisionEventOccur() {
		this.fieldCharacters.forEach((character) => {
			const position = character.fieldPosition;
			const staticObject = this.staticField[position.y][position.x];
			staticObject.collisionEvent(character);
		});
	}
}
