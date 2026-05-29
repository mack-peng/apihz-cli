import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { QrcodeAPI } from '../api/qrcode';
import { formatOutput } from '../utils/output';

export function registerQrcodeCommands(program: Command): void {
  const qrcode = program.command('qrcode').description('QR code operations');

  qrcode
    .command('create')
    .description('Generate QR code image')
    .requiredOption('--text <content>', 'QR code content')
    .option('--level <n>', 'Error correction level 1-100 (default 5)', String(5))
    .option('--size <n>', 'Image size 1-35 (default 10)', String(10))
    .option('--bg <hex>', 'Background color hex (no #), e.g. ffffff', 'ffffff')
    .option('--fg <hex>', 'Foreground color hex (no #), e.g. 000000', '000000')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new QrcodeAPI(client);
      try {
        const result = await api.create(options.text, Number(options.level), Number(options.size), options.bg, options.fg);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  qrcode
    .command('parse')
    .description('Parse QR code image (basic)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64 data')
    .option('--ext <ext>', 'Image extension for BASE64 (e.g. png)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new QrcodeAPI(client);
      try {
        const result = await api.parse(Number(options.type), options.img, options.ext);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  qrcode
    .command('parse-plus')
    .description('Parse QR/barcode image (advanced, higher accuracy)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64 data')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new QrcodeAPI(client);
      try {
        const result = await api.parsePlus(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
