export interface Parameter {
	level: number;
	name: string;
	HP: number;
	maxHP: number;
	power: number;
}

export class PlayerParameter implements Parameter {
	level = 1;
	name = "剣士";
	HP = 30;
	maxHP = 30;
	power = 5;
}
