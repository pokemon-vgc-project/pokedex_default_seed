import * as natureRepository from '../repositories/nature.repository'
import fs from 'node:fs';

export default () => {
    console.log('----------------------------------');
    console.log('--- Started Generate Natures ---');
    const valuesText = natureRepository.getNatures().map((nature) => {
        const id = nature.id;
        const name = nature.name;
        const increase = nature.increase ? `'${nature.increase}'` : 'NULL';
        const decrease = nature.decrease ? `'${nature.decrease}'` : 'NULL';
        return `(${id}, '${name}', ${increase}, ${decrease})`
    }).join(',\n');
    const query = `INSERT INTO natures (id, name, increase, decrease)\nVALUES\n${valuesText};
    `;
    try {
        fs.writeFileSync('./files/natures.sql', query);
        console.log('--- Finished Generate Natures ---');
        console.log('-----------------------------------');
    } catch(err) {
        console.error(err);
    }
}


