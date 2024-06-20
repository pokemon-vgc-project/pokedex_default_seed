interface DamageTaken {
    bug: number;
    dark: number;
    dragon: number;
    electric: number;
    fairy: number;
    fighting: number;
    fire: number;
    flying: number;
    ghost: number;
    grass: number;
    ground: number;
    ice: number;
    normal: number;
    poison: number;
    psychic: number;
    rock: number;
    steel: number;
    stellar: number;
    water: number;
}

export type pkmTypes = 
    'normal' |
    'fire' |
    'water' |
    'electric' |
    'grass' |
    'ice' |
    'fighting' |
    'poison' |
    'ground' |
    'flying' |
    'psychic' |
    'bug' | 
    'rock' |
    'ghost' |
    'dragon' |
    'dark' |
    'steel' |
    'fairy' |
    'stellar'
;
export type TypeChart = {
    [k in pkmTypes]:  { damageTaken: Partial<DamageTaken> }
}


export const typeChart: TypeChart = {
    normal: {
		damageTaken: {
			ghost: 0,
			rock: -2,
			steel: -2,
		},
	},
    fire: {
		damageTaken: {
			bug: 2,
			dragon: -2,
			fire: -2,
			grass: 2,
			ice: 2,
			rock: -2,
			steel: 2,
			water: -2,
		}
	},
    water: {
		damageTaken: {
			dragon: -2,
			fire: 2,
			grass: -2,
			ground: 2,
			rock: 2,
			water: -2,
		},
	},
    electric: {
		damageTaken: {
			dragon: -2,
			electric: -2,
			flying: 2,
			grass: -2,
			ground: 0,
			water: 2,
		}
	},
    grass: {
		damageTaken: {
			bug: -2,
			dragon: -2,
			fire: -2,
			flying: -2,
			grass: -2,
			ground: 2,
			poison: -2,
			rock: 2,
			steel: -2,
			water: 2,
		},
	},
    ice: {
		damageTaken: {
			dragon: 2,
			fire: -2,
			flying: 2,
			grass: 2,
			ground: 2,
			ice: -2,
			steel: -2,
			water: -2,
		},
	},
    fighting: {
		damageTaken: {
			bug: -2,
			dark: 2,
			fairy: -2,
			flying: -2,
			ghost: 0,
			ice: 2,
			normal: 2,
			poison: -2,
			psychic: -2,
			rock: 2,
			steel: 2,
		}
	},
    poison: {
		damageTaken: {
			fairy: 2,
			ghost: -2,
			grass: 2,
			ground: -2,
			poison: -2,
			rock: -2,
			steel: 0,
		},
	},
    ground: {
		damageTaken: {
			bug: -2,
			electric: 2,
			fire: 2,
			flying: 0,
			grass: -2,
			poison: 2,
			rock: 2,
			steel: 2,
		},
	},
    flying: {
		damageTaken: {
			bug: 2,
			electric: -2,
			fighting: 2,
			grass: 2,
			rock: -2,
			steel: -2,
		},
	},
    psychic: {
		damageTaken: {
			dark: 0,
			fighting: 2,
			poison: 2,
			psychic: -2,
            steel: -2,
		},
	},
	bug: {
		damageTaken: {
			dark: 2,
			fairy: -2,
			fighting: -2,
			fire: -2,
			flying: -2,
			ghost: -2,
			grass: 2,
			poison: -2,
			psychic: 2,
			steel: -2,
		}
	},
    rock: {
		damageTaken: {
			bug: 2,
			fighting: -2,
			fire: 2,
			flying: 2,
			ground: -2,
			ice: 2,
			steel: -2,
		},
	},
    ghost: {
		damageTaken: {
			dark: -2,
			ghost: 2,
			normal: 0,
			psychic: 2,
		},
	},
    dragon: {
		damageTaken: {
			dragon: 2,
			fairy: 0,
			steel: -2,
		}
	},
	dark: {
		damageTaken: {
			dark: -2,
			fairy: -2,
			fighting: -2,
			ghost: 2,
			psychic: 2,
		}
	},
	steel: {
		damageTaken: {
			electric: -2,
			fairy: 2,
			fire: -2,
			ice: 2,
			rock: 2,
			steel: -2,
			water: -2,
		},
	},
	fairy: {
		damageTaken: {
			dark: 2,
			dragon: 2,
			fighting: 2,
			fire: -2,
			poison: -2,
			steel: -2,
		}
	},
    stellar: { damageTaken: {} },
};