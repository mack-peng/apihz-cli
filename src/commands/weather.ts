import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { WeatherAPI } from '../api/weather';
import { formatOutput } from '../utils/output';

export function registerWeatherCommands(program: Command): void {
  const weather = program.command('weather').description('Weather operations');

  weather
    .command('by-address')
    .description('Get 1-7 day weather forecast by province and city')
    .requiredOption('--place <city>', 'City name, e.g. 绵阳')
    .option('--sheng <province>', 'Province name, e.g. 四川')
    .option('--day <n>', 'Days 1-7 (default 1)', String(1))
    .option('--hourtype <n>', 'Return hourly weather 0/1', '0')
    .option('--suntimetype <n>', 'Return sunrise/sunset 0/1', '0')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.byAddress(options.sheng, options.place, Number(options.day), Number(options.hourtype), Number(options.suntimetype));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('by-ip')
    .description('Get 1-7 day weather forecast by IP auto-location')
    .option('--ip <addr>', 'IP address (auto-detect if omitted)')
    .option('--day <n>', 'Days 1-7 (default 1)', String(1))
    .option('--hourtype <n>', 'Return hourly weather 0/1', '0')
    .option('--suntimetype <n>', 'Return sunrise/sunset 0/1', '0')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.byIP(options.ip, Number(options.day), Number(options.hourtype), Number(options.suntimetype));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('by-coords')
    .description('Get 1-7 day weather forecast by longitude and latitude')
    .requiredOption('--lon <deg>', 'Longitude')
    .requiredOption('--lat <deg>', 'Latitude')
    .option('--day <n>', 'Days 1-7 (default 1)', String(1))
    .option('--hourtype <n>', 'Return hourly weather 0/1', '0')
    .option('--suntimetype <n>', 'Return sunrise/sunset 0/1', '0')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.byCoords(options.lon, options.lat, Number(options.day), Number(options.hourtype), Number(options.suntimetype));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('moji15')
    .description('Get 15-day weather forecast (Moji Weather source)')
    .requiredOption('--sheng <province>', 'Province name')
    .requiredOption('--place <city>', 'City name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.moji15(options.sheng, options.place);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('cloud')
    .description('Get current weather satellite cloud map')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.cloud();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('precipitation')
    .description('Get 10-day precipitation anomaly chart')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.precipitation();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('temp-anomaly')
    .description('Get 10-day average temperature anomaly chart')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.tempAnomaly();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  weather
    .command('humidity')
    .description('Get 10cm soil relative humidity chart')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new WeatherAPI(client);
      try {
        const result = await api.humidity();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
