import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { NetworkAPI } from '../api/network';
import { formatOutput } from '../utils/output';

export function registerNetworkCommands(program: Command): void {
  const network = program.command('network').description('Domain and website operations');

  network
    .command('icp')
    .description('Query ICP filing info')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.icp(options.domain);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('icp-plus')
    .description('Query ICP filing info (stable version, offline DB)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.icpPlus(options.domain);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('domain')
    .description('Check domain registration status')
    .requiredOption('--domain <domain>', 'Domain name (free: .com/.cn only)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.domainCheck(options.domain);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('tdk')
    .description('Get webpage Title/Description/Keywords')
    .requiredOption('--url <url>', 'Website URL')
    .option('--node <n>', 'Access node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.tdk(options.url, Number(options.node));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
