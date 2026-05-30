import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { TimeAPI } from '../api/time';
import { formatOutput } from '../utils/output';

export function registerTimeCommands(program: Command): void {
  const time = program.command('time').description('Time operations');

  time
    .command('now')
    .description('Get current Beijing time with lunar calendar')
    .option('--type <n>', 'Format 1-20 (default 20, includes lunar & zodiac)', String(20))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TimeAPI(client);
      try {
        const result = await api.now(Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  time
    .command('to-timestamp')
    .description('Convert datetime string to Unix timestamp')
    .requiredOption('--time <datetime>', 'Datetime, e.g. "2024-03-20 16:16:16"')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TimeAPI(client);
      try {
        const result = await api.timestampTo(options.time);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  time
    .command('from-timestamp')
    .description('Convert Unix timestamp to formatted datetime')
    .requiredOption('--time <timestamp>', 'Unix timestamp')
    .option('--type <n>', 'Format 1-11 (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TimeAPI(client);
      try {
        const result = await api.timestampFrom(options.time, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  time
    .command('calendar')
    .alias('day')
    .description('Get today full calendar info (solar/lunar/festival/zodiac)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TimeAPI(client);
      try {
        const result = await api.getDay();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  time
    .command('country')
    .description('Get country current time and timezone info')
    .requiredOption('--country <name>', 'Country name (EN/CN/ISO2), e.g. "US", "美国"')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TimeAPI(client);
      try {
        const result = await api.countryTime(options.country);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
