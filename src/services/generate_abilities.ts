
import fs from 'node:fs';
import * as abilityRepository from '../repositories/ability.repository';

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Abilities ---');

    const abilities = abilityRepository.getAbilities();
    const valuesText = abilities.map(({ id, name, description }) => {
        return `(${id}, '${name}', '${description}')`
    }).join(',\n');

    const query = `INSERT INTO abilities (id, name, description)\nVALUES\n${valuesText};
    `;
    try {
        fs.writeFileSync('./files/abilities.sql', query);
        console.log('--- Finished Generate Abilities ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
}