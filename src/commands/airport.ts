import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { AirportAPI } from '../api/airport';
import { formatOutput } from '../utils/output';

export function registerAirportCommands(program: Command): void {
  const airport = program.command('airport').description('Airport code queries');

  airport
    .command('search')
    .description('Search airport by name/code (three-code/four-code)')
    .requiredOption('--words <keyword>', 'Airport name or code')
    .option('--page <n>', 'Page number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AirportAPI(client);
      try {
        const result = await api.search(options.words, options.page);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  airport
    .command('codes')
    .description('List all domestic airport IATA codes')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AirportAPI(client);
      try {
        const result = await api.codes();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
