export interface FishStats {
	cleverness: number;
	charm: number;
	consent: number;
}

export interface Fish {
	id: string;
	name: string;
	image: string;
	description: string;
	stats: FishStats;
}

export interface FishData {
	fishes: Fish[];
}
