import type { Delta, Position } from "@/types/util";
import {
	Tree,
	WarpTile,
	BlankTile,
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
	overlapEvent(fieldCharacter: FieldCharacter): void;
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
				} else if (i == 10 && j == 10) {
					object = new WarpTile(position);
				} else {
					object = new BlankTile(position);
				}

				this.staticObjects.push(object);
				this.staticField[position.y][position.x] = object;
			}
		}
	}

	private addFieldCharacter(FieldCharacter: FieldCharacter) {
		this.fieldCharacters.push(FieldCharacter);
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

	createFieldCharacter<T extends FieldCharacter>(
		CharacterClass: new (
			position: Position,
			fieldCharacters: FieldCharacter[],
			staticObjects: StaticObject[]
		) => T,
		position: Position
	): T {
		const character = new CharacterClass(
			position,
			this.fieldCharacters,
			this.staticObjects
		);
		this.addFieldCharacter(character);
		return character;
	}
}
