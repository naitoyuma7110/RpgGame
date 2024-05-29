import type { Move, Position } from "@/types/util";
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
	move(move?: Move, position?: Position): void;
}

export interface StaticObject extends FieldObject {
	isPassable: boolean;
	overlapEvent(fieldCharacter: FieldCharacter): void;
}

export class Field {
	private fieldCharacters: FieldCharacter[];
	private staticObjects: StaticObject[];
	private fieldRow = 20;
	private filedCol = 20;

	staticField: StaticObject[][];
	activeField: FieldCharacter[][];

	constructor() {
		this.fieldCharacters = [];
		this.staticObjects = [];
		this.staticField = [];
		this.activeField = [];

		for (let i = 0; i <= this.fieldRow; i++) {
			this.staticField.push(new Array(this.filedCol));
			this.activeField.push(new Array(this.filedCol).fill(null));

			for (let j = 0; j <= this.filedCol; j++) {
				const position = {
					x: j,
					y: i,
				};
				let object;
				if (i == 0 || i == this.filedCol || j == 0 || j == this.fieldRow) {
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
		for (let i = 0; i <= this.fieldRow; i++) {
			newActiveField.push(new Array(this.filedCol));
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
