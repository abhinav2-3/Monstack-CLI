import { Command } from 'commander';
import { createCommand } from '@/commands/create';

const program = new Command();

program
  .name('monstack')
  .description('Production-ready CLI scaffolding tool for backend applications')
  .version('0.1.0');

program
  .command('create')
  .description('Create a new backend project')
  .argument('[name]', 'Name of the project')
  .action(async (name: string | undefined) => {
    await createCommand(name);
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' '),
  );
  process.exit(1);
});

program.parse(process.argv);

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
