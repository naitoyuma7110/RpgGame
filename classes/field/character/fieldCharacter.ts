import type { Move, Position } from "@/types/util";
import type { FieldCharacter, StaticObject } from "@/classes/field/field";
import swords from "@/assets/images/field/character/character_kishi_man_01_red_brown.svg";
import thief from "@/assets/images/field/character/character_tozoku_black.svg";
import thief2 from "@/assets/images/field/character/character_tozoku_blue.svg";

export abstract class AbsFieldCharacter implements FieldCharacter {
	abstract fieldViewImagePath: string;

	public fieldCharacters: FieldCharacter[];
	public staticObjects: StaticObject[];

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
	abstract move(move?: Move): void;
	public abstract collisionEvent(
		fieldCharacter: FieldCharacter,
		move: Move
	): void;

	private getCollisionObject(move: Move) {
		const targetPosition = {
			x: this.fieldPosition.x + move.x,
			y: this.fieldPosition.y + move.y,
		};

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

		return result;
	}

	public overlapAndCollision(move: Move) {
		const collisionObject = this.getCollisionObject(move);
		if (collisionObject.fieldCharacter) {
			// TODO:キャラクター同士の接触イベント
			// キャラクター同士は重ならないため移動は行われない
			this.collisionEvent(collisionObject.fieldCharacter, move);
			return;
		} else if (
			collisionObject.staticObject &&
			collisionObject.staticObject.isPassable
		) {
			this.fieldPosition.x += move.x;
			this.fieldPosition.y += move.y;

			collisionObject.staticObject.overlapEvent(this);
		}
	}
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

	move(move: Move) {
		this.overlapAndCollision(move);
	}

	public collisionEvent(fieldCharacter: FieldCharacter, move: Move) {
		console.log("SwordManの衝突");
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

	move(move: Move) {
		this.overlapAndCollision(move);
	}

	autoMove() {
		const targetCharacter = this.fieldCharacters.find((character) => {
			return character instanceof SwordMan;
		});

		const targetPosition = targetCharacter!.fieldPosition;
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

		if (distance.x >= distance.y) {
			move.x = targetPosition.x - currentPosition.x > 0 ? 1 : -1;
		} else if (distance.x < distance.y) {
			move.y = targetPosition.y - currentPosition.y > 0 ? 1 : -1;
		}

		this.overlapAndCollision(move);
	}
	public collisionEvent(fieldCharacter: FieldCharacter, move: Move) {
		fieldCharacter.move(move);
		console.log("Thiefは相手を押す");
	}
}
