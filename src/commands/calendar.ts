import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { CalendarAPI } from '../api/calendar';
import { formatOutput } from '../utils/output';

export function registerCalendarCommands(program: Command): void {
  const calendar = program.command('calendar').description('Calendar and fortune operations');

  calendar
    .command('day-detail')
    .description('Get 12时辰 detailed info for a specific date (90 fields each)')
    .option('--type <n>', '0=solar 1=lunar (default 0)', String(0))
    .requiredOption('--nian <year>', 'Year (>= 1800)')
    .requiredOption('--yue <month>', 'Month')
    .requiredOption('--ri <day>', 'Day')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.dayHours(Number(options.type), Number(options.nian), Number(options.yue), Number(options.ri));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('today-detail')
    .description('Get 12时辰 detailed info for today (90 fields each)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.todayHours();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('today-luck')
    .description('Get 12时辰 luck info for today (吉凶/喜神/财神/宜忌)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.todayLuck();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('day-luck')
    .description('Get 12时辰 luck info for a specific date (吉凶/喜神/财神/宜忌)')
    .requiredOption('--nian <year>', 'Solar year (>= 1900)')
    .requiredOption('--yue <month>', 'Solar month')
    .requiredOption('--ri <day>', 'Solar day')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.dayLuck(Number(options.nian), Number(options.yue), Number(options.ri));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('day-info')
    .description('Get calendar info for a specific date (lunar/solar/festival/zodiac)')
    .requiredOption('--nian <year>', 'Solar year (>= 1800)')
    .requiredOption('--yue <month>', 'Solar month')
    .requiredOption('--ri <day>', 'Solar day')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.dayInfo(Number(options.nian), Number(options.yue), Number(options.ri));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('elapsed')
    .description('Get elapsed and remaining time (today/week/month/year)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.elapsed();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('mbti')
    .description('MBTI personality test (48/93/200 questions)')
    .requiredOption('--type <n>', '1=get question 2=submit answers')
    .option('--version <n>', '1=basic(48) 2=pro(93) 3=full(200)', String(3))
    .option('--num <n>', 'Question number (required when type=1)')
    .option('--qcan <answers>', 'Answers comma-separated, e.g. A,B,A (required when type=2)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.mbti(
          Number(options.type),
          Number(options.version),
          options.num ? Number(options.num) : undefined,
          options.qcan
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('zhuge')
    .description('诸葛神数 divination by 3 characters (384签)')
    .requiredOption('--words <chars>', 'Three Chinese characters for divination')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.zhuge(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('zhuge-qian')
    .description('随机获取诸葛神签-100签版')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.zhugeQian();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('guanyin')
    .description('随机获取观音灵签-100签版')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.guanyin();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('yuelao')
    .description('随机获取月老灵签-100签版')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.yuelao();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  calendar
    .command('guandi')
    .description('随机获取关帝灵签-100签版')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new CalendarAPI(client);
      try {
        const result = await api.guandi();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
