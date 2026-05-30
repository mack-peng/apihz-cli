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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('guwen')
    .description('Query classical Chinese texts (19 classic works)')
    .requiredOption('--type <n>', '1=catalog 2=content')
    .requiredOption('--number <id>', 'Book number (type=1) or content number (type=2)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.guwen(Number(options.type), options.number);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('poetry')
    .description('Search ancient poetry (300k poems)')
    .requiredOption('--words <keyword>', 'Poet name, verse, or tag')
    .option('--page <n>', 'Page number, 5 per page, max 50', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.poetry(options.words, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('dream')
    .description('Zhou Gong dream interpretation')
    .requiredOption('--word <keyword>', 'Dream keyword')
    .option('--page <n>', 'Page number, max 50', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.dream(options.word, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('dict')
    .description('English word dictionary (100k+ words)')
    .requiredOption('--word <word>', 'English word to look up')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.dictionary(options.word);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('fanyi')
    .description('Aggregate translation (Baidu + Tencent)')
    .requiredOption('--words <text>', 'Text to translate')
    .option('--to <n>', 'Target language: 1=zh 2=en 3=zh-TW 4=ja 5=ko 6=fr 7=es 8=th 9=ar 10=ru 11=pt 12=de 13=it (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.aggregateTranslate(options.words, Number(options.to));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('similarity')
    .description('Detect text similarity between two passages')
    .requiredOption('--a <text>', 'First text passage')
    .requiredOption('--b <text>', 'Second text passage')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.similarity(options.a, options.b);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('dedup')
    .description('Deduplicate text by line or character')
    .requiredOption('--words <text>', 'Text to deduplicate')
    .option('--mode <n>', '1=by line 2=by character')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.dedup(options.words, options.mode ? Number(options.mode) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('stats')
    .description('Text/article character statistics')
    .requiredOption('--words <text>', 'Text to analyze')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.stats(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('size')
    .description('Get text byte size and length')
    .requiredOption('--words <text>', 'Text to measure')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.textSize(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('tongue-twister')
    .description('Get random tongue twister')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.tongueTwister();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('proverb')
    .description('Get random proverb/folk saying')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.proverb();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('couplet')
    .description('Search Chinese couplets')
    .requiredOption('--words <keyword>', 'Search keyword')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.couplet(options.words, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('random-name')
    .description('Generate random Chinese name (1M name library)')
    .option('--surname <char>', 'Specific surname')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.randomName(options.surname);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('random-enname')
    .description('Generate random English name')
    .option('--sex <n>', '0=random 1=male 2=female (default 0)', String(0))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.randomEnglishName(Number(options.sex));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('poet')
    .description('Search poet biography')
    .requiredOption('--name <name>', 'Poet name')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.poet(options.name, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('abbr')
    .description('English abbreviation lookup')
    .requiredOption('--words <abbr>', 'Abbreviation to look up')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.abbreviation(options.words, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('zuci')
    .description('Find compound words from a character')
    .requiredOption('--word <char>', 'Character to form words from')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.wordForm(options.word, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('synonym')
    .description('Look up synonyms and antonyms')
    .requiredOption('--words <word>', 'Word to look up')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.synonymAntonym(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('surname')
    .description('Chinese surname encyclopedia (1000+ surnames)')
    .option('--xing <surname>', 'Specific surname (random if empty)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.surname(options.xing);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('brain-teaser')
    .description('Get random brain teaser (50k library)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.brainTeaser();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('riddle')
    .description('Get random riddle (100k+ riddle library)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.riddle();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('sensitive')
    .description('Detect sensitive/prohibited words (official 100k library)')
    .requiredOption('--words <text>', 'Text to check (max 10000 chars)')
    .option('--replace', 'Replace sensitive words with *', false)
    .option('--list', 'Return list of detected words', false)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.sensitiveWords(
          options.words,
          options.replace ? 1 : 0,
          options.list ? 1 : 0
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('sensitive-custom')
    .description('Detect custom sensitive/prohibited words (self-configured)')
    .requiredOption('--words <text>', 'Text to check (max 30000 chars)')
    .option('--replace', 'Replace sensitive words with *', false)
    .option('--list', 'Return list of detected words', false)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.sensitiveWordsCustom(
          options.words,
          options.replace ? 1 : 0,
          options.list ? 1 : 0
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('segment')
    .description('Word segmentation / keyword extraction')
    .requiredOption('--words <text>', 'Text to segment (max 1000 chars)')
    .option('--sep <char>', 'Separator between keywords')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.wordSegment(options.words, options.sep);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('kfc')
    .description('Crazy Thursday meme text')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.crazyThursday();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('baidu-suggest')
    .description('Baidu search dropdown suggestions')
    .requiredOption('--words <keyword>', 'Search keyword')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.baiduSuggest(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('baidu-related')
    .description('Baidu search related queries')
    .requiredOption('--words <keyword>', 'Search keyword')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.baiduRelated(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('baidu-search')
    .description('Baidu web search results')
    .requiredOption('--words <keyword>', 'Search keyword')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.baiduSearch(options.words, undefined, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-wangyi')
    .description('Extract NetEase news article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentWangyi(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-baijiahao')
    .description('Extract Baijiahao article content (requires Cookie)')
    .requiredOption('--url <url>', 'Article URL')
    .requiredOption('--ck <cookie>', 'Baidu cookie string')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentBaijiahao(options.url, options.ck);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-xiaohongshu')
    .description('Extract Xiaohongshu (RED) article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentXiaohongshu(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-toutiao')
    .description('Extract Toutiao article content')
    .requiredOption('--url <url>', 'Article URL or share link')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentToutiao(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-sina')
    .description('Extract Sina news/article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentSina(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-tencent')
    .description('Extract Tencent News article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentTencent(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-wechat')
    .description('Extract WeChat official account article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentWechat(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  text
    .command('extract-phpzww')
    .description('Extract PHP中文网 article content')
    .requiredOption('--url <url>', 'Article URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new TextAPI(client);
      try {
        const result = await api.contentPhpzww(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
