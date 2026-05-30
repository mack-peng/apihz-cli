import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { FinanceAPI } from '../api/finance';
import { formatOutput } from '../utils/output';

export function registerFinanceCommands(program: Command): void {
  const finance = program.command('finance').description('Finance, gold, lottery operations');

  finance
    .command('exchange-rate')
    .description('Currency exchange rate conversion (160+ currencies)')
    .option('--from <code>', 'Source currency code (e.g. USD)')
    .option('--to <code>', 'Target currency code (e.g. CNY)')
    .requiredOption('--money <amount>', 'Amount to convert')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.exchangeRate(options.from, options.to, options.money);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('gold-price')
    .description('Shanghai Gold Exchange real-time delayed quotes')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.goldPrice();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('gold-history')
    .description('Shanghai Gold Exchange historical quotes')
    .requiredOption('--y <year>', 'Year (2024+)')
    .requiredOption('--m <month>', 'Month (1-12)')
    .requiredOption('--d <day>', 'Day (1-31)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.goldHistory(options.y, options.m, options.d);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('baidu-finance')
    .description('Baidu finance trending list')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.baiduFinance();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('baidu-index')
    .description('Baidu keyword search volume index')
    .requiredOption('--words <keyword>', 'Keyword to query')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.baiduIndex(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-daletou')
    .description('Super Lotto (超级大乐透) draw results')
    .option('--qh <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.daletou(options.qh);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-3d')
    .description('Fucai 3D (福彩3D) draw results')
    .option('--qh <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.fucai3d(options.qh);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-pl5')
    .description('Pailie 5 (排列5) draw results')
    .option('--qh <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.pailie5(options.qh);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-pl3')
    .description('Pailie 3 (排列3) draw results')
    .option('--qhid <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.pailie3(options.qhid);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-qxc')
    .description('Qixingcai (七星彩) draw results')
    .option('--qhid <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.qixingcai(options.qhid);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-qlc')
    .description('Qilecai (七乐彩) draw results')
    .option('--qhid <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.qilecai(options.qhid);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  finance
    .command('lottery-kl8')
    .description('Kuaile 8 (快乐8) draw results')
    .option('--qhid <period>', 'Draw period number (empty for latest)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new FinanceAPI(client);
      try {
        const result = await api.kuaile8(options.qhid);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
