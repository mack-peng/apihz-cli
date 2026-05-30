import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { NewsAPI } from '../api/news';
import { formatOutput } from '../utils/output';

export function registerNewsCommands(program: Command): void {
  const news = program.command('news').description('Hot news/trending operations');

  news
    .command('baidu')
    .description('Get Baidu hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.baidu();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('weibo')
    .description('Get Weibo hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.weibo();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('douyin')
    .description('Get Douyin hot search ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.douyin();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('baidu-hotmeme')
    .description('Get Baidu hot meme ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.baiduHotMeme();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('baidu-livelihood')
    .description('Get Baidu livelihood ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.baiduLivelihood();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('baidu-novel')
    .description('Get Baidu novel ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.baiduNovel();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('weibo-rising')
    .description('Get Weibo real-time rising hotspots')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.weiboRising();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('weibo-entertainment')
    .description('Get Weibo entertainment ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.weiboEntertainment();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('toutiao')
    .description('Get Toutiao (Today Headlines) hot ranking')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.toutiao();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('temp-rank')
    .description('Get national city temperature ranking')
    .option('--type <n>', '1=daytime temp, 2=nighttime temp (default 1)', '1')
    .option('--px <n>', '1=high-to-low, 2=low-to-high (default 1)', '1')
    .option('--page <n>', 'Page number (10 per page, default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.temperatureRank(Number(options.type), Number(options.px), Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  news
    .command('lottery2000')
    .description('Get lottery (SSQ) statistics from latest 2000 draws')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NewsAPI(client);
      try {
        const result = await api.lottery2000();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
