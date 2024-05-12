import type { Delta, Position } from "@/types/util";
import type { FieldCharacter } from "~/classes/field/field";
import swords from "@/assets/images/field/character/character_kishi_man_01_red_brown.svg";
import thief from "@/assets/images/field/character/character_tozoku_black.svg";
import thief2 from "@/assets/images/field/character/character_tozoku_blue.svg";

export class FieldPlayer implements FieldCharacter {
	fieldPosition: Position;
	fieldViewImagePath: string;

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = swords;
	}

	move(delta: Delta) {
		this.fieldPosition.x += delta.x;
		this.fieldPosition.y += delta.y;
	}
}

export class FieldEnemySlow implements FieldCharacter {
	fieldPosition: Position;
	fieldViewImagePath: string;

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = thief;
	}

	move(targetPosition: Position) {
		const random = Math.random();
		if (random > 0.5) {
			return;
		}
		// TODO:Playerの位置に自動で向かってくる動き
		const currentPosition = {
			x: this.fieldPosition.x,
			y: this.fieldPosition.y,
		};

		const distance = {
			x: Math.abs(targetPosition.x - currentPosition.x),
			y: Math.abs(targetPosition.y - currentPosition.y),
		};

		if (distance.x >= distance.y) {
			this.fieldPosition.x += targetPosition.x - currentPosition.x > 0 ? 1 : -1;
		} else {
			this.fieldPosition.y += targetPosition.y - currentPosition.y > 0 ? 1 : -1;
		}
	}
}

export class FieldEnemyFast implements FieldCharacter {
	fieldPosition: Position;
	fieldViewImagePath: string;

	constructor(position: Position) {
		this.fieldPosition = position;
		this.fieldViewImagePath = thief2;
	}

	move(targetPosition: Position) {
		const random = Math.random();
		if (random > 0.8) {
			return;
		}
		// TODO:Playerの位置に自動で向かってくる動き
		const currentPosition = {
			x: this.fieldPosition.x,
			y: this.fieldPosition.y,
		};

		const distance = {
			x: Math.abs(targetPosition.x - currentPosition.x),
			y: Math.abs(targetPosition.y - currentPosition.y),
		};

		if (distance.x >= distance.y) {
			this.fieldPosition.x += targetPosition.x - currentPosition.x > 0 ? 1 : -1;
		} else {
			this.fieldPosition.y += targetPosition.y - currentPosition.y > 0 ? 1 : -1;
		}
	}
}
