import * as commander from 'commander';
import generateNatures from './services/generate_natures';
import generateAbilities from './services/generate_abilities';

const program = new commander.Command();
program.version('0.0.0');

program.parse(process.argv);

program
  .command('generate-seeds')
  .description('Prints a friendly greeting')
  .action(() => {
    generateNatures();
    generateAbilities();
  });

program.parse(process.argv);