import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { SmsAPI } from '../api/sms';
import { formatOutput } from '../utils/output';

export function registerSmsCommands(program: Command): void {
  const sms = program.command('sms').description('SMS operations');

  sms
    .command('send')
    .description('Send SMS verification code (platform template)')
    .requiredOption('--phone <number>', 'Phone number')
    .option('--code <code>', 'Custom verification code (default random 6-digit)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new SmsAPI(client);
      try {
        const result = await api.send(options.phone, options.code);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  sms
    .command('send-verify')
    .description('Send and verify SMS code (two-step)')
    .requiredOption('--type <n>', '1=send code 2=verify code')
    .requiredOption('--phone <number>', 'Phone number')
    .option('--code <code>', 'Verification code (required for type=2)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new SmsAPI(client);
      try {
        const result = await api.sendVerify(Number(options.type), options.phone, options.code);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  sms
    .command('send-aliyun')
    .description('Send SMS via Aliyun (own template)')
    .requiredOption('--phone <number>', 'Phone number')
    .requiredOption('--aliid <id>', 'Aliyun AccessKey ID')
    .requiredOption('--alikey <key>', 'Aliyun AccessKey Secret')
    .requiredOption('--sign <sign>', 'SMS signature')
    .requiredOption('--template <id>', 'SMS template ID')
    .requiredOption('--code <code>', 'Verification code')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new SmsAPI(client);
      try {
        const result = await api.sendAliyun(options.phone, options.aliid, options.alikey, options.sign, options.template, options.code);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
