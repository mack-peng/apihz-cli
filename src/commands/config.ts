import { Command } from 'commander';
import { ConfigManager } from '../utils/config';
import { formatOutput } from '../utils/output';

function maskKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export function registerConfigCommands(program: Command): void {
  const config = program.command('config').description('Manage apihz-cli configuration');

  config
    .command('set')
    .description('Save credentials to ~/.apihz/config.json')
    .option('--id <id>', 'Developer ID')
    .option('--key <key>', 'Developer KEY')
    .option('--vip', 'Use VIP line by default')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const cm = new ConfigManager();
      const updates: Record<string, any> = {};
      if (opts.id) updates.id = opts.id;
      if (opts.key) updates.key = opts.key;
      if (opts.vip) updates.vip = true;
      if (Object.keys(updates).length === 0) {
        console.error('Error: at least one of --id, --key, --vip is required');
        process.exit(1);
      }
      cm.save(updates);
      const keys = Object.keys(updates).join(', ');
      console.log(formatOutput({ message: `Saved: ${keys}` }));
    });

  config
    .command('show')
    .description('Show current configuration')
    .action(() => {
      const cm = new ConfigManager();
      const all = cm.getAll();
      const display: Record<string, any> = { ...all };
      if (display.key) display.key = maskKey(display.key);
      if (Object.keys(display).length === 0) {
        console.log(formatOutput({ message: 'No configuration set. Use "apihz-cli config set --id=<id> --key=<key>"' }));
        return;
      }
      console.log(formatOutput(display));
    });

  config
    .command('get')
    .description('Get a specific config value')
    .argument('<key>', 'Config key (id, key, vip)')
    .action((key: string) => {
      const cm = new ConfigManager();
      const val = cm.get(key as any);
      if (val === undefined || val === '') {
        console.error(`Config key "${key}" not set`);
        process.exit(1);
      }
      console.log(formatOutput({ [key]: val }));
    });

  config
    .command('reset')
    .description('Clear all configuration')
    .action(() => {
      const cm = new ConfigManager();
      cm.save({ id: '', key: '', vip: false });
      console.log(formatOutput({ message: 'Configuration cleared' }));
    });

  config
    .command('path')
    .description('Show config file path')
    .action(() => {
      const cm = new ConfigManager();
      console.log(cm.getPath());
    });
}
