import type { Delta, Position } from "@/types/util";
import { BlankTile } from "./staticObject/staticObject";

export interface FieldObject {
	fieldViewImagePath: string;
}

export interface FieldCharacter extends FieldObject {
	fieldPosition: Position;
	move(delta?: Delta, position?: Position): void;
}

export interface StaticObject extends FieldObject {
	fieldPosition: Position;
}

const fieldRow = 20;
const filedCol = 20;

export class Field {
	private fieldCharacters: FieldCharacter[];
	private staticObjects: StaticObject[];

	private staticField: StaticObject[][];

	private renderField: FieldObject[][];

	constructor() {
		this.fieldCharacters = [];
		this.staticObjects = [];
		this.staticField = [];
		this.renderField = [];

		for (let i = 0; i < fieldRow; i++) {
			this.staticField.push(new Array(filedCol));
			this.renderField.push(new Array(filedCol));

			for (let j = 0; j < filedCol; j++) {
				const position = {
					x: j,
					y: i,
				};
				const blankTile = new BlankTile(position);
				this.staticObjects.push(blankTile);

				this.renderField[position.y][position.x] = blankTile;
				this.staticField[position.y][position.x] = blankTile;
			}
		}
	}

	addFieldCharacter(fieldCharacter: FieldCharacter) {
		this.fieldCharacters = [...this.fieldCharacters, fieldCharacter];
		this.updateRenderField();
	}

	updateRenderField() {
		const newRenderField: FieldObject[][] = this.staticField.map((row) => [
			...row,
		]);

		this.fieldCharacters.forEach((fieldCharacter) => {
			const position = fieldCharacter.fieldPosition;
			newRenderField[position.y][position.x] = fieldCharacter;
		});
		this.renderField = newRenderField;
	}

	getRenderField() {
		const newRenderField = this.renderField.map((row) => [...row]);
		return newRenderField;
	}
}
