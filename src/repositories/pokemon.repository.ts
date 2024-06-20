import { pokedex, SpeciesData } from '../data/pokedex';

interface Pokemon {
    id: number;
    num: number;
    base_species_id?: number;
    name: string;
    forme?: string;
    heightm?: number;
    weightkg?: number; 
}

interface PokemonTemp extends Omit<Pokemon, 'base_species_id'> {
    base_species?: string;
}

export const getPokemons = ():Pokemon[] => {
    const pokemonMap = new Map<string, PokemonTemp>();
    const pokemonsTempList: PokemonTemp[] = getDefaultPokedex()
        .map(({ num, name, heightm, weightkg, baseSpecies }, i) => {
            const pokemon = {
                id: i + 1,
                num,
                name,
                heightm,
                weightkg,
                base_species: baseSpecies
            };
            pokemonMap.set(name, pokemon);
            return pokemon;
        });

    const pokemons = pokemonsTempList.map((temp) => {
        const { base_species: baseSpecies, ...pokemonData } = temp;
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
            base_species_id: baseSpeciesId,
        };
        return pokemon;
    });
    return pokemons;
}

const getDefaultPokedex = ():SpeciesData[] => {
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