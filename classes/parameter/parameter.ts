import swords from "@/assets/images/field/character/character_kishi_man_01_red_brown.svg";

export interface Parameter {
	image: string;
	level: number;
	name: string;
	HP: number;
	maxHP: number;
	power: number;
}

export class PlayerParameter implements Parameter {
	image = swords;
	level = 1;
	name = "剣士";
	HP = 10;
	maxHP = 10;
	defense = 2;
	power = 5;
}
