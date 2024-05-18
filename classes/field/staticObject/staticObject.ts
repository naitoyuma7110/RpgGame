import type { Position } from "@/types/util";
import type { FieldCharacter, StaticObject } from "@/classes/field/field";
import blankTile from "@/assets/images/field/staticObject/maptile_renga_white_01.svg";
import warpTile from "@/assets/images/field/staticObject/iriguchi_gray.svg";
import tree from "@/assets/images/field/staticObject/ki_02_01.svg";

export abstract class AbsStaticObject implements StaticObject {
	abstract fieldViewImagePath: string;
	abstract isPassable: boolean;
	abstract overlapEvent(fieldCharacter: FieldCharacter): void;

	fieldPosition: Position;

	constructor(position: Position) {
		this.fieldPosition = position;
	}
}

export class BlankTile extends AbsStaticObject {
	fieldViewImagePath = blankTile;
	isPassable = true;

	overlapEvent(fieldCharacter: FieldCharacter) {}

	constructor(position: Position) {
		super(position);
	}
}

export class WarpTile extends AbsStaticObject {
	fieldViewImagePath = warpTile;
	isPassable = true;

	overlapEvent(fieldCharacter: FieldCharacter) {
		fieldCharacter.fieldPosition.x = 1;
		fieldCharacter.fieldPosition.y = 1;
	}

	constructor(position: Position) {
		super(position);
	}
}

export class Tree extends AbsStaticObject {
	fieldViewImagePath = tree;
	isPassable = false;

	overlapEvent() {}

	constructor(position: Position) {
		super(position);
	}
}
