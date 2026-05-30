import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { TransportAPI } from '../api/transport';
import { formatOutput } from '../utils/output';

export function registerTransportCommands(program: Command): void {
  const transport = program.command('transport').description('Transport/logistics operations');

  transport
    .command('train-remain')
    .description('Query remaining train tickets')
    .requiredOption('--add <name>', 'Departure station or city')
    .requiredOption('--end <name>', 'Arrival station or city')
    .requiredOption('--y <year>', 'Departure year (within 15 days)')
    .requiredOption('--m <month>', 'Departure month')
    .requiredOption('--d <day>', 'Departure day')
    .option('--ck <cookie>', '12306 JSESSIONID')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.trainRemain(options.add, options.end, options.y, options.m, options.d, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('train-transfer')
    .description('Query train transfer options')
    .requiredOption('--add <name>', 'Departure station')
    .requiredOption('--end <name>', 'Arrival station')
    .requiredOption('--y <year>', 'Departure year')
    .requiredOption('--m <month>', 'Departure month')
    .requiredOption('--d <day>', 'Departure day')
    .option('--page <n>', 'Page number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.trainTransfer(options.add, options.end, options.y, options.m, options.d, options.page);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('train-published-price')
    .description('Query published ticket prices')
    .requiredOption('--add <name>', 'Departure station or city')
    .requiredOption('--end <name>', 'Arrival station or city')
    .requiredOption('--y <year>', 'Departure year (within 15 days)')
    .requiredOption('--m <month>', 'Departure month')
    .requiredOption('--d <day>', 'Departure day')
    .option('--ck <cookie>', '12306 JSESSIONID')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.trainPublishedPrice(options.add, options.end, options.y, options.m, options.d, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('train-ticket-price')
    .description('Query detailed ticket prices (requires train-remain data first)')
    .requiredOption('--train-order <id>', 'Train order number from train-remain result')
    .requiredOption('--depart-index <n>', 'Departure station index from train-remain result')
    .requiredOption('--arrive-index <n>', 'Arrival station index from train-remain result')
    .requiredOption('--seatcode <code>', 'Seat code from train-remain result')
    .requiredOption('--y <year>', 'Departure year')
    .requiredOption('--m <month>', 'Departure month')
    .requiredOption('--d <day>', 'Departure day')
    .option('--ck <cookie>', '12306 JSESSIONID')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.trainTicketPrice(options.trainOrder, options.departIndex, options.arriveIndex, options.seatcode, options.y, options.m, options.d, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('train-stops')
    .description('Query train stopping stations (requires train-remain data first)')
    .requiredOption('--train-order <id>', 'Train order number from train-remain result')
    .option('--ck <cookie>', '12306 JSESSIONID')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.trainStops(options.trainOrder, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('bus-route')
    .description('Plan bus route between two coordinates')
    .requiredOption('--starlon <lon>', 'Start longitude')
    .requiredOption('--starlat <lat>', 'Start latitude')
    .requiredOption('--endlon <lon>', 'End longitude')
    .requiredOption('--endlat <lat>', 'End latitude')
    .option('--linetype <n>', 'Route strategy 1-15 (default 1)')
    .option('--type <n>', '0=simple data, 1=detailed with coordinates (default 0)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.busRoute(options.starlon, options.starlat, options.endlon, options.endlat, options.linetype, options.type);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('bus-line-info')
    .description('Query bus line stop details')
    .requiredOption('--uuid <id>', 'Line UUID (unique nationwide)')
    .option('--type <n>', '0=simple data, 1=detailed with coordinates (default 0)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.busLineInfo(options.uuid, options.type);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('navigation')
    .description('Plan driving/walking navigation route')
    .requiredOption('--starlon <lon>', 'Start longitude')
    .requiredOption('--starlat <lat>', 'Start latitude')
    .requiredOption('--endlon <lon>', 'End longitude')
    .requiredOption('--endlat <lat>', 'End latitude')
    .option('--mid <coords>', 'Waypoints: lon,lat;lon,lat...')
    .option('--linetype <n>', 'Route strategy: 0=fastest, 1=shortest, 2=avoid highways, 3=walking (default 0)')
    .option('--type <n>', '0=simple data, 1=detailed with coordinates (default 0)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.navigation(options.starlon, options.starlat, options.endlon, options.endlat, options.mid, options.linetype, options.type);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  transport
    .command('express')
    .description('Query express delivery tracking')
    .requiredOption('--number <tracking>', 'Express tracking number')
    .option('--mobile <num>', 'Phone number or last 4 digits (required for SF/KuaYue)')
    .option('--code <code>', 'Express company code e.g. YTO=Yuantong')
    .option('--sort <order>', 'Sort order: asc (default) or desc')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TransportAPI(client);
      try {
        const result = await api.express(options.number, options.mobile, options.code, options.sort);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
