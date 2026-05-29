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
        console.log(formatOutput(result));
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
        console.log(formatOutput(result));
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
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
