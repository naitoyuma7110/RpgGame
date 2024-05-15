import type { Position } from "@/types/util";
import type { FieldCharacter, StaticObject } from "@/classes/field/field";
import blankTile from "@/assets/images/field/staticObject/maptile_renga_white_01.svg";
import warpTile from "@/assets/images/field/staticObject/iriguchi_gray.svg";
import tree from "@/assets/images/field/staticObject/ki_02_01.svg";

export class BlankTile implements StaticObject {
	fieldPosition: Position;
	fieldViewImagePath: string;
	isPassable: boolean;

	collisionEvent(fieldCharacter: FieldCharacter) {}

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = blankTile;
		this.isPassable = true;
	}
}

export class WarpTile implements StaticObject {
	fieldPosition: Position;
	fieldViewImagePath: string;

	isPassable: boolean;

	collisionEvent(fieldCharacter: FieldCharacter) {
		fieldCharacter.fieldPosition.x = 1;
		fieldCharacter.fieldPosition.y = 1;
	}

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = warpTile;
		this.isPassable = true;
	}
}

export class Tree implements StaticObject {
	fieldPosition: Position;
	fieldViewImagePath: string;

	isPassable: boolean;

	collisionEvent() {}

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = tree;
		this.isPassable = false;
	}
}
