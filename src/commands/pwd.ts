import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { PwdAPI } from '../api/pwd';
import { formatOutput } from '../utils/output';

export function registerPwdCommands(program: Command): void {
  const pwd = program.command('pwd').description('Encryption/decryption operations');

  pwd
    .command('md5')
    .description('MD5 hash encryption')
    .requiredOption('--words <text>', 'Text to encrypt (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.md5(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('base64-encode')
    .description('BASE64 encode')
    .requiredOption('--words <text>', 'Text to encode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.base64Encode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('base64-decode')
    .description('BASE64 decode')
    .requiredOption('--words <text>', 'Text to decode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.base64Decode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('authcode-encrypt')
    .description('Authcode encryption')
    .requiredOption('--words <text>', 'Text to encrypt (max 10000 chars)')
    .requiredOption('--pwd <password>', 'Encryption password (max 200 chars)')
    .option('--time <seconds>', 'Validity period in seconds', undefined)
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.authcodeEncrypt(options.words, options.pwd, options.time ? Number(options.time) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('authcode-decrypt')
    .description('Authcode decryption')
    .requiredOption('--words <text>', 'Text to decrypt (max 10000 chars)')
    .requiredOption('--pwd <password>', 'Decryption password (max 200 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.authcodeDecrypt(options.words, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('des-encrypt')
    .description('DES encryption')
    .requiredOption('--words <text>', 'Text to encrypt (max 10000 chars)')
    .requiredOption('--pwd <key>', 'Encryption key (24 bytes)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.desEncrypt(options.words, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('des-decrypt')
    .description('DES decryption')
    .requiredOption('--words <text>', 'Text to decrypt (max 10000 chars)')
    .requiredOption('--pwd <key>', 'Decryption key (24 bytes)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.desDecrypt(options.words, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('rc4-encrypt')
    .description('RC4 encryption')
    .requiredOption('--words <text>', 'Text to encrypt (max 10000 chars)')
    .requiredOption('--pwd <password>', 'Encryption password (max 200 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.rc4Encrypt(options.words, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('rc4-decrypt')
    .description('RC4 decryption')
    .requiredOption('--words <text>', 'Hex text to decrypt (max 10000 chars)')
    .requiredOption('--pwd <password>', 'Decryption password (max 200 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.rc4Decrypt(options.words, options.pwd);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('morse')
    .description('Morse code encode/decode')
    .requiredOption('--words <text>', 'Text or morse code to convert (max 1000 chars)')
    .option('--type <n>', '0=text→morse (default), 1=morse→text', '0')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.morse(options.words, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('url-encode')
    .description('URL encode')
    .requiredOption('--words <text>', 'Text to encode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.urlEncode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('url-decode')
    .description('URL decode')
    .requiredOption('--words <text>', 'Text to decode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.urlDecode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('hex-encode')
    .description('Hex encode')
    .requiredOption('--words <text>', 'Text to encode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.hexEncode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  pwd
    .command('hex-decode')
    .description('Hex decode')
    .requiredOption('--words <text>', 'Text to decode (max 10000 chars)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new PwdAPI(client);
      try {
        const result = await api.hexDecode(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
