import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { ImageAPI } from '../api/image';
import { formatOutput } from '../utils/output';

export function registerImageCommands(program: Command): void {
  const img = program.command('image').description('Image operations');

  img
    .command('memes')
    .description('Search memes/emoji packs')
    .option('--source <name>', 'Source: baidu, sougou, apihz (default apihz)', 'apihz')
    .option('--words <keyword>', 'Search keyword')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .option('--limit <n>', 'Results count (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        let result;
        const page = Number(options.page);
        const limit = Number(options.limit);
        if (options.source === 'baidu') {
          result = await api.bqBaidu(options.words, page, limit);
        } else if (options.source === 'sougou') {
          result = await api.bqSougou(options.words, page);
        } else {
          result = await api.bqApihz(options.words ? 2 : 1, options.words, page, limit);
        }
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('search')
    .description('Search images')
    .option('--source <name>', 'Source: baidu, sougou (default baidu)', 'baidu')
    .option('--words <keyword>', 'Search keyword')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .option('--limit <n>', 'Results count (default 1)', String(1))
    .option('--type <n>', 'Image type: 1=preview 2=source (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        let result;
        const page = Number(options.page);
        const limit = Number(options.limit);
        const type = Number(options.type);
        if (options.source === 'sougou') {
          result = await api.imgSougou(options.words, page, type);
        } else {
          result = await api.imgBaidu(options.words, page, limit, type);
        }
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('wallpaper')
    .description('Get random wallpaper from apihz gallery')
    .option('--type <n>', '0=random 1=general 2=beauty (default 0)', String(0))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.imgBz(1, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('avatar')
    .description('Get random avatar from apihz gallery (17 categories)')
    .option('--type <n>', '0=all 1=male 2=female 3=couple 4=bestie 5=anime 6=pet 7=cute 8=europe 9=ancient 10=troll 11=fairy 12=simple 13=QQ 14=wechat 15=text 16=custom (default 0)', String(0))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.imgTx(1, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('bing')
    .description('Get Bing daily wallpaper')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.bing(1);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('nasa')
    .description('Get random NASA astronomy picture')
    .option('--hd', 'High definition', false)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.nasa(1, options.hd ? 1 : 2);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('food')
    .description('Query food combination compatibility (相生相克)')
    .requiredOption('--words <keyword>', 'Food keyword (1-50 chars)')
    .option('--page <n>', 'Page number, 10 per page, max 50', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.food(options.words, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('compress')
    .description('Compress or convert image format')
    .requiredOption('--img <data>', 'Image URL or BASE64 (max 4M)')
    .option('--width <n>', 'Output width')
    .option('--height <n>', 'Output height')
    .option('--quality <n>', 'Compression quality 1-100 (default 90)', String(90))
    .option('--ext <ext>', 'Output format: jpg/png/gif/ico (default jpg)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.compress(
          options.img,
          options.width ? Number(options.width) : undefined,
          options.height ? Number(options.height) : undefined,
          Number(options.quality),
          options.ext
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('qq-avatar')
    .description('Get random QQ user avatars (10M+ library)')
    .option('--num <n>', 'Number of avatars (1-30, default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.qqAvatar(Number(options.num));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  img
    .command('ascii')
    .description('Convert image to ASCII art (50 style presets)')
    .requiredOption('--img <data>', 'Image URL or BASE64 (max 1M)')
    .option('--bg <color>', 'Background hex color (without #)')
    .option('--fg <color>', 'Foreground hex color (without #)')
    .option('--width <n>', 'Output width (default 500, max 1024)', String(500))
    .option('--contrast <n>', 'Contrast 1-1000 (default 220)', String(220))
    .option('--style <n>', 'Style preset 1-50')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new ImageAPI(client);
      try {
        const result = await api.asciiArt(
          options.img,
          options.bg,
          options.fg,
          Number(options.width),
          Number(options.contrast),
          options.style ? Number(options.style) : undefined
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
