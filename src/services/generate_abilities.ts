import { load } from 'cheerio';
import { abilitiesHTML } from '../data/abilities';
import fs from 'node:fs';

interface Ability {
    name: string;
    description: string;
}

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Abilities ---');

    const abilities = getAbilities();
    
    const valuesText = abilities.map(({ name, description }) => {
        return `('${name}', '${description}')`
    }).join(',\n');

    const query = `INSERT INTO abilities (name, description)\nVALUES\n${valuesText};
    `;
    try {
        fs.writeFileSync('./files/abilities.sql', query);
        console.log('--- Finished Generate Abilities ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
}

const getAbilities = () => {
    const $ = load(abilitiesHTML);
    const abilities:Ability[] = [];
    $('tr').each((i, el) => {
        const ability:Ability = { name: '', description: ''};
        $(el)
            .children()
            .each((childIndex, childEl) => {
                if (childIndex === 1) {
                    ability.name = $(childEl).children('a')
                        .text()
                        .trim()
                        .replace(/'/g, '\\\''); 
                }
                if (childIndex === 2) {
                    const lines = $(childEl)
                        .text()
                        .replace(/'/gm, '\\\'')
                        .replace(/"/gm, '\\"')
                        .trim()
                        .split(/(\r\n|\n|\r)/gm);
                    ability.description = lines.map((line) => line.trim()).join('');
                }
            });
        abilities.push(ability);
    });
    return abilities;
}