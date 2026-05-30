import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { HardwareAPI } from '../api/hardware';
import { formatOutput } from '../utils/output';

export function registerHardwareCommands(program: Command): void {
  const hardware = program.command('hardware').description('Hardware benchmark rankings');

  hardware
    .command('laptop-gpu')
    .description('Laptop GPU benchmark rankings')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new HardwareAPI(client);
      try {
        const result = await api.laptopGpu();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  hardware
    .command('desktop-gpu')
    .description('Desktop GPU benchmark rankings')
    .action(async (_options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new HardwareAPI(client);
      try {
        const result = await api.desktopGpu();
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
