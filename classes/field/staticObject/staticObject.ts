import type { Position } from "@/types/util";
import type { StaticObject } from "@/classes/field/field";
import blankTile from "@/assets/images/field/StaticObject/maptile_renga_white_01.svg";

export class BlankTile implements StaticObject {
	fieldPosition: Position;
	fieldViewImagePath: string;

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = blankTile;
	}
}
