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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  phone
    .command('segment')
    .description('Query phone number segment (city, carrier, area code)')
    .requiredOption('--numbers <seg>', 'Phone segment (e.g. 1321993)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.phoneSegment(options.numbers);
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  geo
    .command('address')
    .description('Forward geocode: address to coordinates (aggregated)')
    .requiredOption('--address <addr>', 'Address to geocode')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.addressToCoords(options.address);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  geo
    .command('foreign')
    .description('Query foreign region coordinates')
    .requiredOption('--sheng <name>', 'Province/state name (Chinese, e.g. 加利福尼亚)')
    .requiredOption('--place <name>', 'City/district name (Chinese, e.g. 洛杉矶)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.foreignCoords(options.sheng, options.place);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  geo
    .command('random')
    .description('Generate random coordinates for a city')
    .requiredOption('--city <name>', 'City name (full Chinese name, e.g. 上海市)')
    .option('--code <code>', 'Country code (default CN)')
    .option('--type <n>', 'Randomness level 1-10 (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.randomCoords(options.city, options.code, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  geo
    .command('nearby')
    .description('Search nearby places around coordinates')
    .requiredOption('--words <keyword>', 'Search keyword (e.g. 公交, 酒店, 公厕)')
    .requiredOption('--lon <deg>', 'Longitude')
    .requiredOption('--lat <deg>', 'Latitude')
    .option('--radius <m>', 'Search radius in meters (max 10000, default 1000)', String(1000))
    .option('--page <n>', 'Page number (default 1)', String(1))
    .option('--type <code>', 'Category code (optional)')
    .option('--show <n>', '1=basic 2=detailed (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.nearbySearch(options.words, options.lon, options.lat, Number(options.radius), Number(options.page), options.type, Number(options.show));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  geo
    .command('map')
    .description('Generate a map image from coordinates')
    .requiredOption('--lng <deg>', 'Longitude')
    .requiredOption('--lat <deg>', 'Latitude')
    .option('--zoom <n>', 'Zoom level 3-18 (default 10)', String(10))
    .option('--width <n>', 'Image width 1-1024 (default 500)', String(500))
    .option('--height <n>', 'Image height 1-1024 (default 500)', String(500))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.mapImage(options.lng, options.lat, Number(options.zoom), Number(options.width), Number(options.height));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const plate = program.command('plate').description('License plate operations');

  plate
    .command('lookup')
    .description('Query license plate location')
    .requiredOption('--words <plate>', 'Plate number or prefix (e.g. 川B1234 or 川B)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.plateNumber(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const code = program.command('code').description('Area code and postal code operations');

  code
    .command('lookup')
    .description('Query area code / postal code by city or area code')
    .requiredOption('--words <query>', 'City name or area code (e.g. 上海 or 021)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new IpLocationAPI(client);
      try {
        const result = await api.areaCode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
