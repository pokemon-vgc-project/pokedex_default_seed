import * as commander from 'commander';

const program = new commander.Command();
program.version('0.0.0');

program.parse(process.argv);

program
  .command('say-hello')
  .description('Prints a friendly greeting')
  .action(() => {
    console.log('Hello, world!');
  });

program.parse(process.argv);