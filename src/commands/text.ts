import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { TextAPI } from '../api/text';
import { formatOutput } from '../utils/output';

export function registerTextCommands(program: Command): void {
  const text = program.command('text').description('Text and dictionary operations');

  text
    .command('translate')
    .description('Translate text between 50+ languages')
    .requiredOption('--words <text>', 'Text to translate (max 500 chars)')
    .requiredOption('--from <n>', 'Source language: 1=en 2=zh-CN 3=zh-TW ...')
    .requiredOption('--to <n>', 'Target language code')
    .option('--cache', 'Use translation cache (default true)', true)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.translate(options.words, Number(options.from), Number(options.to), options.cache ? 1 : 0);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('yiyan')
    .description('Get random quote (120k library)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.yiyan();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('yiyan-search')
    .description('Search quotes by keyword')
    .requiredOption('--words <keyword>', 'Search keyword')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.yiyanSearch(options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  const chengyu = program.command('chengyu').description('Idiom (chengyu) operations');

  chengyu
    .command('random')
    .description('Get random idiom (30k library)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.chengyuRand();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  chengyu
    .command('chain')
    .description('Get idiom starting with given character')
    .requiredOption('--word <char>', 'Starting character')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.chengyuFirst(options.word);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  chengyu
    .command('lookup')
    .description('Look up idiom definition')
    .requiredOption('--words <idiom>', 'Idiom name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.chengyuLookup(options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('hanzi')
    .description('Look up Chinese character (20k library)')
    .requiredOption('--word <char>', 'Chinese character')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.hanzi(options.word);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('ciyu')
    .description('Look up Chinese word (380k library)')
    .requiredOption('--words <word>', 'Chinese word')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.ciyu(options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('baike')
    .description('Search Baidu Baike (encyclopedia)')
    .requiredOption('--words <term>', 'Search term')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.baike(options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('nick')
    .description('Get random nickname (1M library)')
    .option('--min <n>', 'Min length 1-15', String(2))
    .option('--max <n>', 'Max length 1-15', String(6))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.nick(Number(options.min), Number(options.max));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('pinyin')
    .description('Convert Chinese text to Pinyin')
    .requiredOption('--words <text>', 'Chinese text (max 1000 chars)')
    .option('--sep <char>', 'Separator between pinyin')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.pinyin(options.words, options.sep);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('case')
    .description('Convert letter case')
    .requiredOption('--type <n>', '1=upper 2=lower 3=capitalize-first 4=capitalize-each')
    .requiredOption('--words <text>', 'Text to convert (max 1000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.case_(Number(options.type), options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('jfzh')
    .description('Convert between Simplified and Traditional Chinese')
    .requiredOption('--type <n>', '1=simplified→traditional 2=traditional→simplified')
    .requiredOption('--words <text>', 'Text to convert (max 1000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.jfzh(Number(options.type), options.words);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('today')
    .description('Get historical events on this day')
    .option('--month <n>', 'Month (1-12)')
    .option('--day <n>', 'Day (1-31)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.today(
          options.month ? Number(options.month) : undefined,
          options.day ? Number(options.day) : undefined
        );
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('joke')
    .description('Get random joke (200k library)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.joke();
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
