import fs from 'node:fs';
import { pkmTypes } from '../data/typechart';
import { Type, getTypeMap, getTypes, getDamageTakenByType } from '../repositories/type.repository';

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Types ---');
    const types = getTypes();
    
    const typesSQL = createTypesSql(types);
    const typesStabsSQL = createTypesStabsSql(types);
    const sql = `
        SET FOREIGN_KEY_CHECKS=0;

        -- Add types
        ${typesSQL}

        -- Add types_stabs
        ${typesStabsSQL}

        SET FOREIGN_KEY_CHECKS=1;
    `;

    try {
        fs.writeFileSync('./files/types.sql', sql);
        console.log('--- Finished Generate Types ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
}

const createTypesSql = (types: Type[]):string => {
    const valuesText = types.map(({ id, name }) => {
        const typeName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        return `(${id}, '${typeName}')`;
    }).join(',\n');
    return `INSERT INTO types (id, name)\nVALUES\n${valuesText};`;
}


const createTypesStabsSql = (types: Type[]):string => {
    const typeMap = getTypeMap();

    const valuesText = types
        .map((type) => createTypeStabsSql(type, typeMap))
        .flat()
        .join(',\n');
    return `INSERT INTO types_stabs (attacker_id, defender_id, rate)\nVALUES\n${valuesText};`
}

const createTypeStabsSql = (type: Type, typeMap: Map<pkmTypes, number>):string[] => {
    const damageTaken = getDamageTakenByType(type);
    const values = [];
    for (const key in damageTaken) {
        if (Object.prototype.hasOwnProperty.call(damageTaken, key)) {
            const defender = key as pkmTypes;
            const rate = damageTaken[defender];
            const defenderId = typeMap.get(defender);
            values.push(`(${type.id}, ${defenderId}, ${rate})`);
        }
    }
    return values;
}