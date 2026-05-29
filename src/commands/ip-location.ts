import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { IpLocationAPI } from '../api/ip-location';
import { formatOutput } from '../utils/output';

export function registerIpLocationCommands(program: Command): void {
  const ip = program.command('ip').description('IP and location operations');

  ip
    .command('lookup')
    .description('Query IP geolocation (IPv4/IPv6)')
    .option('--ip <addr>', 'IP address (auto-detect if omitted)')
    .option('--td <n>', 'Query channel 0-5 (default 0)', String(0))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.ipLookup(options.ip, Number(options.td));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ip
    .command('visitor')
    .description('Get visitor IP, browser, and OS info')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.visitor();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const phone = program.command('phone').description('Phone number operations');

  phone
    .command('lookup')
    .description('Query phone number location')
    .requiredOption('--phone <number>', 'Phone number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.phoneLookup(options.phone);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const region = program.command('region').description('Administrative region operations');

  region
    .command('list')
    .description('Query administrative regions (China, excluding HK/MO/TW)')
    .requiredOption('--type <n>', 'Level: 1=province 2=city 3=district 4=town 5=village')
    .option('--sheng <name>', 'Province name')
    .option('--shi <name>', 'City name')
    .option('--xian <name>', 'District name')
    .option('--zhen <name>', 'Town name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.region(Number(options.type), options.sheng, options.shi, options.xian, options.zhen);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  region
    .command('code')
    .description('Query administrative region code and coordinates')
    .requiredOption('--sheng <name>', 'Province name (without 省, e.g. 四川)')
    .requiredOption('--place <name>', 'City/district name (without suffix)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.regionCode(options.sheng, options.place);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  region
    .command('country')
    .description('Get all countries info (name, coords, domain suffix)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.country();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const idcard = program.command('idcard').description('ID card operations');

  idcard
    .command('lookup')
    .description('Query ID card number location')
    .requiredOption('--card <number>', 'ID card number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.idCard(options.card);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const geo = program.command('geo').description('Geocoding operations');

  geo
    .command('reverse')
    .description('Reverse geocode: coordinates to address')
    .requiredOption('--lon <deg>', 'Longitude')
    .requiredOption('--lat <deg>', 'Latitude')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.coords(options.lon, options.lat);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
