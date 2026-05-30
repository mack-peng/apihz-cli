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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('uuid')
    .description('Generate a random UUID')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.uuid();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('calc')
    .description('Calculate a mathematical expression (supports scientific notation)')
    .requiredOption('--formula <expr>', 'Formula, no spaces, e.g. (5+6)*10-(8+2)*10')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.calculator(options.formula);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('timer')
    .description('Stopwatch: start or query timers (up to 10)')
    .requiredOption('--type <n>', '1=start timing, 2=query timing')
    .option('--number <n>', 'Timer number 1-10 (required for --type 1, omit for --type 2 to query all)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.timer(Number(options.type), options.number ? Number(options.number) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('counter-manual')
    .description('Manual-reset counter: increment/query/reset (up to 10 counters)')
    .requiredOption('--type <n>', '1=increment, 2=query, 3=reset to zero')
    .requiredOption('--number <n>', 'Counter number 1-10 (omit for --type 2 to query all)')
    .option('--num <n>', 'Increment value (integer, default +1)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.counterManual(Number(options.type), Number(options.number), options.num ? Number(options.num) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('counter-daily')
    .description('Daily-auto-reset counter: increment/query (resets at midnight)')
    .requiredOption('--type <n>', '1=increment, 2=query')
    .option('--number <n>', 'Counter number 1-10 (required for --type 1, omit for --type 2 to query all)')
    .option('--num <n>', 'Increment value (integer, default +1)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.counterDaily(Number(options.type), options.number ? Number(options.number) : undefined, options.num ? Number(options.num) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('baota')
    .description('Operate BT Panel (BaoTa) via API - PAID')
    .requiredOption('--btapi <url>', 'BT Panel API URL, e.g. http://127.0.0.1:8888/system?action=GetNetWork')
    .requiredOption('--btkey <key>', 'BT Panel API access key')
    .option('--can <params>', 'Extra request params, replace & with <>')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.baota(options.btapi, options.btkey, options.can);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('mcserver')
    .description('Query Minecraft server info')
    .requiredOption('--host <addr>', 'Server address (IP or domain)')
    .option('--port <n>', 'Server port (default 25565)', String(25565))
    .option('--xy <n>', '0=auto 1=modern 2=legacy 3=UDP 4=compat (default 0)', String(0))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.mcserver(options.host, Number(options.port), Number(options.xy));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('temp-mail-info')
    .description('Query/modify temp email info (password, expiry)')
    .requiredOption('--mail <email>', 'Temp email address')
    .option('--pwd <password>', 'New password (8-20 chars), omit to query only')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.tempMailInfo(options.mail, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('temp-mail-list')
    .description('Get inbox content for a temp email')
    .requiredOption('--mail <email>', 'Temp email address')
    .requiredOption('--pwd <password>', 'Email password')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.tempMailList(options.mail, options.pwd, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('imap-mail')
    .description('Fetch emails via IMAP/POP3 (QQ, NetEase, etc.)')
    .requiredOption('--mail <email>', 'Email address')
    .requiredOption('--pwd <password>', 'Password/auth code')
    .requiredOption('--proto <imap|pop3>', 'Protocol: imap or pop3')
    .requiredOption('--ip <addr>', 'Server address, e.g. pop.qq.com')
    .requiredOption('--port <n>', 'Server port')
    .requiredOption('--ssl <ssl|tls>', 'Encryption: ssl or tls')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .option('--num <n>', 'Emails per page (default 5, max 5)', String(5))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.imapMail(options.mail, options.pwd, options.proto, options.ip, Number(options.port), options.ssl, Number(options.page), Number(options.num));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('announcement')
    .description('Query published announcements')
    .option('--num <n>', 'Number of latest announcements (default 1, max 10)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.announcement(Number(options.num));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('blank-stat')
    .description('Blank stat endpoint (no data returned, for analytics only)')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.blankStat();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('sec-to-time')
    .description('Convert seconds to days/hours/minutes/seconds')
    .requiredOption('--sec <n>', 'Seconds to convert')
    .option('--type <n>', 'Format: 1=Y/D/H/M/S 2=D/H/M/S 3=H/M/S 4=M/S (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.secondsToTime(Number(options.sec), Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  misc
    .command('time-diff')
    .description('Calculate formatted time difference between two timestamps')
    .requiredOption('--time1 <ts>', 'First timestamp (Unix)')
    .requiredOption('--time2 <ts>', 'Second timestamp (Unix)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new MiscAPI(client);
      try {
        const result = await api.timeDiff(options.time1, options.time2);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
