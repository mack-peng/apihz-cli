import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { VoiceAPI } from '../api/voice';
import { formatOutput } from '../utils/output';

export function registerVoiceCommands(program: Command): void {
  const voice = program.command('voice').description('Voice/speech operations');

  voice
    .command('to-text')
    .description('Convert speech to text (60s max, 22 languages)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--data <data>', 'Audio URL or BASE64')
    .requiredOption('--format <fmt>', 'Format: wav/pcm/ogg/mp3/m4a/aac/amr')
    .option('--lang <code>', 'Language code (default 8k_zh)', '8k_zh')
    .option('--datalen <n>', 'Pre-encoded file length for BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new VoiceAPI(client);
      try {
        const result = await api.toText(Number(options.type), options.data, options.format, options.lang, options.datalen ? Number(options.datalen) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  voice
    .command('to-voice')
    .description('Convert text to speech')
    .requiredOption('--text <text>', 'Text (CN max 150 chars, EN max 500)')
    .requiredOption('--type <n>', '1=return URL 2=return BASE64')
    .option('--vtype <n>', 'Audio format: 1=wav 2=mp3 (default 1)', String(1))
    .option('--volume <n>', 'Volume 0-10 (default 0)', String(0))
    .option('--speed <n>', 'Speed -2~6 (default 0)', String(0))
    .option('--voice <id>', 'Voice ID (default 1001)', String(1001))
    .option('--lg <n>', 'Language: 1=CN 2=EN 3=JP (default 1)', String(1))
    .option('--emotion <type>', 'Emotion: neutral/sad/happy/angry/fear')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new VoiceAPI(client);
      try {
        const result = await api.toVoice(
          options.text,
          Number(options.type),
          Number(options.vtype),
          Number(options.volume),
          Number(options.speed),
          Number(options.voice),
          Number(options.lg),
          options.emotion
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
