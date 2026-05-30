import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { BilibiliAPI } from '../api/bilibili';
import { formatOutput } from '../utils/output';

export function registerBilibiliCommands(program: Command): void {
  const bilibili = program.command('bilibili').description('Bilibili/video operations');

  bilibili
    .command('ranking')
    .description('Bilibili comprehensive ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.ranking();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('live-categories')
    .description('Bilibili live category list')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.liveCategories();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('live-anchors')
    .description('Bilibili popular anchor ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.liveAnchors();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('video-info')
    .description('Bilibili video info (by URL)')
    .requiredOption('--url <url>', 'Bilibili video URL')
    .option('--ck <cookie>', 'Bilibili cookie for higher success rate')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.videoInfo(options.url, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('user-info')
    .description('Bilibili user stats (fans, follows, plays, likes)')
    .requiredOption('--buid <uid>', 'Bilibili user UID')
    .option('--ck <cookie>', 'Bilibili cookie for higher success rate')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.userInfo(options.buid, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('live-url')
    .description('Get Bilibili live room streaming URL')
    .requiredOption('--room <roomid>', 'Live room ID or short ID')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.liveUrl(options.room);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('live-rooms')
    .description('Bilibili live room list by category')
    .requiredOption('--fid <id>', 'Parent category ID')
    .requiredOption('--zid <id>', 'Sub-category ID (0 for all)')
    .option('--page <page>', 'Page number', '1')
    .option('--ck <cookie>', 'Bilibili cookie for higher success rate')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.liveRooms(options.fid, options.zid, options.page, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-movie')
    .description('Maoyan box office ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanMovie();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-tv')
    .description('Maoyan web TV drama ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanTv();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-web-movie')
    .description('Maoyan web movie ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanWebMovie();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-web-drama')
    .description('Maoyan web drama ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanWebDrama();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-tv-rating')
    .description('Maoyan TV rating ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanTvRating();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('maoyan-variety')
    .description('Maoyan variety show ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.maoyanVariety();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('baidu-movie')
    .description('Baidu movie hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.baiduMovie();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('baidu-tv')
    .description('Baidu TV drama hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.baiduTv();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('baidu-car')
    .description('Baidu car hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.baiduCar();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  bilibili
    .command('random-video')
    .description('Random girl/dance short video')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new BilibiliAPI(client);
      try {
        const result = await api.randomVideo();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
