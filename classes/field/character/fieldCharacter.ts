import type { Delta, Position } from "@/types/util";
import type { FieldCharacter, StaticObject } from "@/classes/field/field";
import swords from "@/assets/images/field/character/character_kishi_man_01_red_brown.svg";
import thief from "@/assets/images/field/character/character_tozoku_black.svg";
import thief2 from "@/assets/images/field/character/character_tozoku_blue.svg";

export abstract class AbsFieldCharacter implements FieldCharacter {
	abstract fieldViewImagePath: string;

	private fieldCharacters: FieldCharacter[];
	private staticObjects: StaticObject[];

	fieldPosition: Position;

	constructor(
		position: Position,
		fieldCharacters: FieldCharacter[],
		staticObjects: StaticObject[]
	) {
		this.fieldCharacters = fieldCharacters;
		this.staticObjects = staticObjects;
		this.fieldPosition = position;
	}

	public getCollisionObject(move: Delta) {
		const targetPosition = {
			x: this.fieldPosition.x + move.x,
			y: this.fieldPosition.y + move.y,
		};

		// TODO:findメソッドによる一致条件をpositin.x,yまで指定しなければ期待した挙動にならなかった
		// find条件でobjectの一致による判定は参照一致
		const staticObject = this.staticObjects.find(
			(staticObject) =>
				staticObject.fieldPosition.x == targetPosition.x &&
				staticObject.fieldPosition.y == targetPosition.y
		);

		const fieldCharacter = this.fieldCharacters.find(
			(fieldCharacter) =>
				fieldCharacter.fieldPosition.x == targetPosition.x &&
				fieldCharacter.fieldPosition.y == targetPosition.y
		);

		const result = {
			fieldCharacter: fieldCharacter,
			staticObject: staticObject,
		};

		console.log(`I am x:${this.fieldPosition.x} y:${this.fieldPosition.y}`);

		return result;
	}

	abstract move(delta: Delta): void;
}

export class SwordMan extends AbsFieldCharacter {
	fieldViewImagePath = swords;

	constructor(
		position: Position,
		fieldCharacters: FieldCharacter[],
		staticObjects: StaticObject[]
	) {
		super(position, fieldCharacters, staticObjects);
	}

	move(delta: Delta) {
		const collisionObject = this.getCollisionObject(delta);
		if (collisionObject.fieldCharacter) {
			return;
		} else {
			this.fieldPosition.x += delta.x;
			this.fieldPosition.y += delta.y;
		}
	}
}
export class Thief extends AbsFieldCharacter {
	fieldViewImagePath = thief;

	constructor(
		position: Position,
		fieldCharacters: FieldCharacter[],
		staticObjects: StaticObject[]
	) {
		super(position, fieldCharacters, staticObjects);
	}

	move(targetPosition: Position) {
		const random = Math.random();
		if (random > 0.5) {
			return;
		}

		const currentPosition = {
			x: this.fieldPosition.x,
			y: this.fieldPosition.y,
		};

		const distance = {
			x: Math.abs(targetPosition.x - currentPosition.x),
			y: Math.abs(targetPosition.y - currentPosition.y),
		};

		const move = {
			x: 0,
			y: 0,
		};

		if (distance.x > distance.y) {
			move.x = targetPosition.x - currentPosition.x > 0 ? 1 : -1;
		} else if (distance.x < distance.y) {
			move.y = targetPosition.y - currentPosition.y > 0 ? 1 : -1;
		} else {
			return;
		}

		const collisionObject = this.getCollisionObject(move);
		if (!collisionObject.fieldCharacter) {
			this.fieldPosition.x += move.x;
			this.fieldPosition.y += move.y;
		}
	}
}
