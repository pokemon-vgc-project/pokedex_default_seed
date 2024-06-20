import { load } from 'cheerio';
import { abilitiesHTML } from '../data/abilities';

interface Ability {
    id: number;
    name: string;
    description: string;
}

export const getAbilities = () => {
    const $ = load(abilitiesHTML);
    const abilities:Ability[] = [];
    let id = 1;
    $('tr').each((i, el) => {
        const ability:Ability = { id, name: '', description: ''};
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
        id++;
    });
    return abilities;
}