import { natures } from '../data/natures';
import fs from 'node:fs';

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Natures ---');
    const valuesText = natures.map((nature) => {
        const name = nature.name;
        const increase = nature.increase ? `'${nature.increase}'` : 'NULL';
        const decrease = nature.decrease ? `'${nature.decrease}'` : 'NULL';
        return `('${name}', ${increase}, ${decrease})`
    }).join(',\n');
    const query = `INSERT INTO natures (name, increase, decrease)\nVALUES\n${valuesText};
    `;
    try {
        fs.writeFileSync('./files/natures.sql', query);
        console.log('--- Finished Generate Natures ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
}


