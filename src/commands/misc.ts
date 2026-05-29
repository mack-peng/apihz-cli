import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { MiscAPI } from '../api/misc';
import { formatOutput } from '../utils/output';

export function registerMiscCommands(program: Command): void {
  const misc = program.command('misc').description('Miscellaneous operations');

  misc
    .command('jiakao')
    .description('Get driving test questions (C1/C4, 2000+ questions)')
    .requiredOption('--type <n>', '1=subject-1 4=subject-4')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.jiakao(Number(options.type));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('qq')
    .description('Query QQ profile info')
    .requiredOption('--qq <number>', 'QQ number to query')
    .option('--ckqq <number>', 'System QQ for CK')
    .option('--skey <key>', 'System QQ skey')
    .option('--pskey <key>', 'System QQ pskey')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.qq(options.qq, options.ckqq, options.skey, options.pskey);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('lottery')
    .description('Query lottery results (双色球)')
    .option('--qh <period>', 'Period number (latest if omitted)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.shuangseqiu(options.qh);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('lanzou')
    .description('Parse Lanzou cloud download link')
    .requiredOption('--url <url>', 'Lanzou share URL')
    .option('--pwd <password>', 'Share password')
    .option('--type <n>', 'Parse method: 1=local 2=proxy (default 1)', String(1))
    .option('--outtype <n>', 'Output: 1=JSON 2=direct URL (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.lanzou(options.url, options.pwd, Number(options.type), Number(options.outtype));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('phone-status')
    .description('Query phone number status (active/suspended/void) - PAID')
    .requiredOption('--number <phone>', 'Phone number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.phoneStatus(options.number);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('phone-online')
    .description('Query phone online duration - PAID')
    .requiredOption('--number <phone>', 'Phone number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.phoneOnline(options.number);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('bank-info')
    .description('Query bank card info (issuing bank, card type) - PAID')
    .requiredOption('--number <card>', 'Bank card number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.bankInfo(options.number);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('chem-eq')
    .description('Balance chemical equations')
    .requiredOption('--reactants <formulas>', 'Reactants, comma-separated, e.g. H2,O2')
    .requiredOption('--products <formulas>', 'Products, comma-separated, e.g. H2O')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.chemEq(options.reactants, options.products);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('element')
    .description('Query chemical element info (periodic table)')
    .requiredOption('--name <name>', 'Element name/symbol/number, e.g. H or 氢 or 1')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.element(options.name);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('mail')
    .description('Send email via SMTP relay')
    .requiredOption('--name <name>', 'Sender nickname')
    .requiredOption('--to <email>', 'Recipient email')
    .requiredOption('--title <title>', 'Email subject')
    .requiredOption('--text <body>', 'Email body')
    .requiredOption('--code <enc>', 'Encoding: utf8 or gbk')
    .requiredOption('--port <n>', 'SMTP port, e.g. 25')
    .requiredOption('--ip <server>', 'SMTP server address')
    .requiredOption('--secure <type>', 'ssl or tls')
    .requiredOption('--idmail <email>', 'Sender email account')
    .requiredOption('--pwd <password>', 'Sender email password')
    .requiredOption('--usermail <email>', 'Sender email (usually same as idmail)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.mail(
          options.name, options.to, options.title, options.text,
          options.code, Number(options.port), options.ip, options.secure,
          options.idmail, options.pwd, options.usermail
        );
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('proxy')
    .description('Get proxy IP - PAID')
    .option('--type <n>', '1=http/https 2=socks5 (default 1)', String(1))
    .option('--ip <addr>', 'Whitelist IP')
    .option('--direct', 'Return ip:port directly', false)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.proxy(Number(options.type), options.ip, options.direct ? 1 : undefined);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('redpack')
    .description('Send Alipay gift red packet (0.1-0.2 CNY) - PAID')
    .requiredOption('--zfb <account>', 'Alipay account')
    .requiredOption('--name <name>', 'Real name for the account')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.redpack(options.zfb, options.name);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
