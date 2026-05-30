import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { AuthAPI } from '../api/auth';
import { formatOutput } from '../utils/output';

export function registerAuthCommands(program: Command): void {
  const auth = program.command('auth').description('Identity verification operations');

  auth
    .command('bank3')
    .description('Verify bank card 3-element (name + card + ID)')
    .requiredOption('--name <name>', 'Account holder name')
    .requiredOption('--number <card>', 'Bank card number')
    .requiredOption('--idcard <id>', 'ID card number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AuthAPI(client);
      try {
        const result = await api.bank3(options.name, options.number, options.idcard);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  auth
    .command('bank2')
    .description('Verify bank card 2-element (name + card)')
    .requiredOption('--name <name>', 'Account holder name')
    .requiredOption('--number <card>', 'Bank card number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AuthAPI(client);
      try {
        const result = await api.bank2(options.name, options.number);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  auth
    .command('alipay')
    .description('Initiate Alipay real-name verification')
    .requiredOption('--name <name>', 'Real name')
    .requiredOption('--number <id>', 'ID card number')
    .option('--url <url>', 'Redirect URL after verification')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AuthAPI(client);
      try {
        const result = await api.alipay(options.name, options.number, options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  auth
    .command('alipay-check')
    .description('Check Alipay verification result')
    .requiredOption('--cxid <id>', 'Query ID from alipay command')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AuthAPI(client);
      try {
        const result = await api.alipayCheck(options.cxid);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
