import type { Delta, Position } from "@/types/util";
import type { FieldCharacter } from "~/classes/field/field";
import characterRed from "@/assets/images/field/character/character_kishi_man_01_red_brown.svg";

export class FieldPlayer implements FieldCharacter {
	fieldPosition: Position;
	fieldViewImagePath: string;

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = characterRed;
	}

	move(delta: Delta) {
		this.fieldPosition.x += delta.x;
		this.fieldPosition.y += delta.y;
	}
}
