import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { EarthquakeAPI } from '../api/earthquake';
import { formatOutput } from '../utils/output';

export function registerEarthquakeCommands(program: Command): void {
  const earthquake = program.command('earthquake').description('Earthquake information');

  earthquake
    .command('latest')
    .description('Get latest global earthquake info (official determination)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new EarthquakeAPI(client);
      try {
        const result = await api.latest();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  earthquake
    .command('report')
    .description('Get historical earthquake speed report for a date')
    .requiredOption('--year <year>', 'Year, e.g. 2025')
    .requiredOption('--month <month>', 'Month, e.g. 3')
    .requiredOption('--day <day>', 'Day, e.g. 1')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new EarthquakeAPI(client);
      try {
        const result = await api.report(options.year, options.month, options.day);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  earthquake
    .command('history')
    .description('Get historical earthquake info (official determination) for a date')
    .requiredOption('--year <year>', 'Year, e.g. 2025')
    .requiredOption('--month <month>', 'Month, e.g. 3')
    .requiredOption('--day <day>', 'Day, e.g. 1')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new EarthquakeAPI(client);
      try {
        const result = await api.history(options.year, options.month, options.day);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
