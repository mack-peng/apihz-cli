import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

import {
  registerConfigCommands,
  registerTimeCommands,
  registerWeatherCommands,
  registerIpLocationCommands,
  registerImageCommands,
  registerTextCommands,
  registerNetworkCommands,
  registerNewsCommands,
  registerQrcodeCommands,
  registerAiCommands,
  registerVoiceCommands,
  registerAuthCommands,
  registerStorageCommands,
  registerSmsCommands,
  registerUnitCommands,
  registerMiscCommands,
} from './commands';

export function decorateProgram(program: Command): void {
  program
    .name('apihz-cli')
    .description('CLI for apihz.cn API marketplace (接口盒子) — 479+ APIs at your terminal')
    .version(pkg.version)
    .option('--id <id>', 'Developer ID (overrides config and env)')
    .option('--key <key>', 'Developer KEY (overrides config and env)')
    .option('--vip', 'Use VIP line (https://vip.apihz.cn)')
    .option('--raw', 'Output raw API response without formatting');

  registerConfigCommands(program);
  registerTimeCommands(program);
  registerWeatherCommands(program);
  registerIpLocationCommands(program);
  registerImageCommands(program);
  registerTextCommands(program);
  registerNetworkCommands(program);
  registerNewsCommands(program);
  registerQrcodeCommands(program);
  registerAiCommands(program);
  registerVoiceCommands(program);
  registerAuthCommands(program);
  registerStorageCommands(program);
  registerSmsCommands(program);
  registerUnitCommands(program);
  registerMiscCommands(program);
}
