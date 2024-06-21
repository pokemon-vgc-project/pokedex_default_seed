import * as commander from 'commander';
import generateNatures from './services/generate_natures';
import generateAbilities from './services/generate_abilities';
import generateTypes from './services/generate_types';
import generatePokemons from './services/generate_pokemons';

const program = new commander.Command();
program.version('0.0.0');

program.parse(process.argv);

program
  .command('generate-seeds')
  .description('Prints a friendly greeting')
  .action(() => {
    generateNatures();
    generateAbilities();
    generateTypes();
    generatePokemons();
  });

program.parse(process.argv);