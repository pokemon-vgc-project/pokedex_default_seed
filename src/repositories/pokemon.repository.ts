import { pokedex, SpeciesData, BaseStats } from '../data/pokedex';
import { Ability, getAbilityMap } from './ability.repository';

interface Pokemon {
    id: number;
    num: number;
    baseSpeciesId?: number;
    name: string;
    forme?: string;
    heightm?: number;
    weightkg?: number;
    baseStats: BaseStats;
    abilities: PokemonAbility[];
}

interface PokemonAbility {
    abilityId: number;
    type?: 'HIDDEN' | 'SPECIAL'
}

interface PokemonTemp extends Omit<Pokemon, 'baseSpeciesId'> {
    baseSpecies?: string;
}

export const getPokemons = ():Pokemon[] => {
    const abilityMap = getAbilityMap();
    const pokemonMap = new Map<string, PokemonTemp>();
    const pokemonsTempList: PokemonTemp[] = getDefaultPokedex()
        .map(({ num, name, heightm, weightkg, baseSpecies, baseStats, abilities }, i) => {
            const pokemon:PokemonTemp = {
                id: i + 1,
                num,
                name,
                heightm,
                weightkg,
                baseStats, 
                baseSpecies: baseSpecies,
                abilities: getPokemonAbilities(abilities, abilityMap),
            };

            pokemonMap.set(name, pokemon);
            return pokemon;
        });

    const pokemons = pokemonsTempList.map((temp) => {
        const { baseSpecies, ...pokemonData } = temp;
        let baseSpeciesId;
        if (baseSpecies) {
            const basePkm = pokemonMap.get(baseSpecies);
            if (basePkm) {
                baseSpeciesId = basePkm.id;
            } else {
                console.log(temp);
                throw new Error(`Not found the base pkm for ${temp.name}`);
            }
        }
        const pokemon: Pokemon = {
            ...pokemonData,
            baseSpeciesId: baseSpeciesId,
        };
        return pokemon;
    });
    return pokemons;
}

const getDefaultPokedex = (): SpeciesData[] => {
    const pokedexList = [];
    for (const key in pokedex) {
        if (Object.prototype.hasOwnProperty.call(pokedex, key)) {
            const pokemon = pokedex[key] as SpeciesData;
            if (pokemon.num > 0 && pokemon.num < 1026) {
                pokedexList.push(pokemon)
            }
            
        }
    }
    return pokedexList;
}

const getPokemonAbilities = (
    abilities:{ [k:string|number]: string }, abilityMap: Map<string, Ability>): PokemonAbility[] => {
        const pokemonAbilities: PokemonAbility[] = [];

        for (const key in abilities) {
            if (Object.prototype.hasOwnProperty.call(abilities, key)) {
                const name = abilities[key]
                                .trim()
                                .replace(/'/g, '\\\'');
                const ability = abilityMap.get(name);

                if (!ability) {
                    console.log(name);
                    throw new Error(`Not found the ${name} ability name`);
                }
                let type: 'HIDDEN' | 'SPECIAL' | undefined;

                if (key === 'H') {
                    type = 'HIDDEN';
                }

                if (key === 'S') {
                    type = 'SPECIAL';
                }

                pokemonAbilities.push({
                    abilityId: ability.id,
                    type,
                })
                
            }
        }

        return pokemonAbilities;
}