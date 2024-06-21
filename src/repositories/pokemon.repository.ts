import { pokedex, SpeciesData, BaseStats } from '../data/pokedex';
import { pkmTypes } from '../data/typechart';
import { Ability, getAbilityMap } from './ability.repository';
import { getTypeMap } from './type.repository';

export interface Pokemon {
    id: number;
    num: number;
    baseSpeciesId?: number;
    name: string;
    forme?: string;
    heightm?: number;
    weightkg?: number;
    baseStats: BaseStats;
    abilities: PokemonAbility[];
    evoLevel?: number;
    evolutions?: number[];
    types: number[];
}

interface PokemonAbility {
    abilityId: number;
    type?: 'HIDDEN' | 'SPECIAL'
}

interface PokemonTemp extends Omit<Pokemon, 'baseSpeciesId' | 'evolutions' | 'types'> {
    baseSpecies?: string;
    evolutions?: string[];
    types: string[];
}

export const getPokemons = ():Pokemon[] => {
    const abilityMap = getAbilityMap();
    const typeMap = getTypeMap();
    const pokemonMap = new Map<string, PokemonTemp>();

    const pokemonsTempList: PokemonTemp[] = getDefaultPokedex()
        .map(({ num, name, heightm, weightkg, baseSpecies, baseStats, abilities, evoLevel, evos, forme, types }, i) => {
            const pokemon:PokemonTemp = {
                id: i + 1,
                num,
                name,
                heightm,
                weightkg,
                baseStats, 
                forme,
                types,
                baseSpecies: baseSpecies,
                abilities: getPokemonAbilities(abilities, abilityMap),
                evoLevel,
                evolutions: evos,
            };

            pokemonMap.set(name, pokemon);
            return pokemon;
        });

    const pokemons = pokemonsTempList.map((temp) => {
        const { baseSpecies, evolutions, ...pokemonData } = temp;
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

        const pokemonEvolutions = Array.isArray(evolutions) && evolutions.length
            ? getPokemonEvolutions(temp, evolutions, pokemonMap)
            : undefined;

        const pkmTypes = getPokemonTypes(temp, typeMap);

        const pokemon: Pokemon = {
            ...pokemonData,
            baseSpeciesId: baseSpeciesId,
            evolutions: pokemonEvolutions,
            types: pkmTypes,
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

const getPokemonEvolutions = (pkm:PokemonTemp, evolutions: string[], pkmTempMap: Map<string, PokemonTemp>): number[] | undefined => {
    const pkmEvolutions: number[] = evolutions.reduce<number[]>((acc, evolution) => {
        const pokemon = pkmTempMap.get(evolution);

        if (!pokemon) {
            console.log(pkm);
            console.log(evolution);
            throw new Error(`Not found the evolution ${evolution}`);
        }

        acc.push(pokemon.id);
        return acc;
    }, []);

    return pkmEvolutions.length ? pkmEvolutions : undefined;
}

const getPokemonTypes = (pkm:PokemonTemp, typeMap:Map<pkmTypes, number>): number[] => {
    return pkm.types.map((typeStr) => {
        const typeId = typeMap.get(typeStr.toLowerCase() as pkmTypes);

        if (!typeId) {
            console.log(pkm);
            console.log(typeStr);
            throw new Error(`Not found the ${typeStr} type`);
        }
        return typeId;
    });
}