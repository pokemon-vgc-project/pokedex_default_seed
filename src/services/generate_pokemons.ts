import fs from 'node:fs';
import * as pokemonRepository from '../repositories/pokemon.repository';

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Pokemons ---');
    const pokemons = pokemonRepository.getPokemons();

    const pokemonsSQL = generatePokemonsSQL(pokemons);
    const pokemonsBaseStatsSQL = generatePokemonsBaseStabsSQL(pokemons);
    const pokemonsAbilitiesSQL = generatePokemonsAbilitiesSQL(pokemons);
    const pokemonsEvolutionsSQL = generatePokemonsEvolutionsSQL(pokemons);
    const pokemonsTypesSQL = generatePokemonsTypesSQL(pokemons);

    const sql = `
        SET FOREIGN_KEY_CHECKS=0;

        -- Add pokemons
        ${pokemonsSQL}

        -- Add pokemons_base_stats
        ${pokemonsBaseStatsSQL}

        -- Add pokemons_abilities
        ${pokemonsAbilitiesSQL}

        -- Add pokemons_evolutions
        ${pokemonsEvolutionsSQL}

        -- Add pokemons_types
        ${pokemonsTypesSQL}

        SET FOREIGN_KEY_CHECKS=1;
    `;

    try {
        fs.writeFileSync('./files/pokemons.sql', sql);
        console.log('--- Finished Generate Pokemons ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
    
}


const generatePokemonsSQL = (pokemons: pokemonRepository.Pokemon[]): string => {
    const lines = pokemons.map((pkm) => {
        const baseSpeciesId = pkm.baseSpeciesId ?? 'NULL';
        const name = pkm.name.trim().replace(/'/g, '\\\'');
        const forme = pkm.forme ? `'${pkm.forme.trim().replace(/'/g, '\\\'')}'` : 'NULL';
        const heightm = pkm.heightm ?? 'NULL';
        const weightkg = pkm.weightkg ?? 'NULL';
        const evoLevel = pkm.evoLevel ?? 'NULL';
        return `(${pkm.id}, ${pkm.num}, ${baseSpeciesId}, '${name}', ${forme}, ${heightm}, ${weightkg}, ${evoLevel})`
    }).join(',\n');

    return `INSERT INTO pokemons (id, num, base_species_id, name, forme, heightm, weightkg, evo_level)\nVALUES\n${lines};`;
}

const generatePokemonsBaseStabsSQL = (pokemons: pokemonRepository.Pokemon[]): string => {
    const lines = pokemons
        .map(({ id, baseStats: { hp, atk, def, spa, spd, spe } }) => 
            `(${id}, ${hp}, ${atk}, ${def}, ${spa}, ${spd}, ${spe})`
        ).join(',\n');
    return `INSERT INTO pokemons_base_stats (pokemon_id, hp, atk, def, spa, spd, spe)\nVALUES\n${lines};`;
}

const generatePokemonsAbilitiesSQL = (pokemons: pokemonRepository.Pokemon[]): string => {
    const lines = pokemons
        .map((pkm) => generatePokemonAbilitiesSQL(pkm))
        .flat()
        .join(',\n');
    return `INSERT INTO pokemons_abilities (pokemon_id, ability_id, ability_type)\nVALUES\n${lines};`;
}

const generatePokemonAbilitiesSQL = (pokemon: pokemonRepository.Pokemon): string[] => {
    const lines = pokemon.abilities
        .map((ability) => {
            const type = ability.type ? `'${ability.type}'`: 'NULL';
            return `(${pokemon.id}, ${ability.abilityId}, ${type})`;
        });
    return lines;
}

const generatePokemonsEvolutionsSQL = (pokemons: pokemonRepository.Pokemon[]): string => {
    const lines = pokemons
        .map((pkm) => generatePokemonEvolutions(pkm))
        .flat()
        .join(',\n');
    return `INSERT INTO _pokemons_evolutions (A, B)\nVALUES\n${lines};`;
}

const generatePokemonEvolutions = (pokemon: pokemonRepository.Pokemon): string[] => {
    if (!Array.isArray(pokemon.evolutions) || !pokemon.evolutions.length) return [];
    return pokemon.evolutions.map((evolutionId) => `(${pokemon.id}, ${evolutionId})`);
}

const generatePokemonsTypesSQL = (pokemons: pokemonRepository.Pokemon[]): string => {
    const lines = pokemons
        .map((pokemon) => generatePokemonTypesSQL(pokemon))
        .flat()
        .join(',\n');

    return `INSERT INTO _pokemons_types (A, B)\nVALUES\n${lines};`;
}

const generatePokemonTypesSQL = (pokemon: pokemonRepository.Pokemon): string[] => {
    return pokemon.types.map((typeId) => `(${pokemon.id}, ${typeId})`);
}