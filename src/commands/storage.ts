import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { StorageAPI } from '../api/storage';
import { formatOutput } from '../utils/output';

export function registerStorageCommands(program: Command): void {
  const storage = program.command('storage').description('Data storage operations');

  storage
    .command('text')
    .description('Text storage CRUD (1000 entries, 5000 chars each)')
    .requiredOption('--type <n>', '1=write 2=read 3=prepend 4=append')
    .requiredOption('--numid <n>', 'Entry ID (1-1000)')
    .option('--words <text>', 'Content (for write/prepend/append)')
    .option('--title <text>', 'Title (for write)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.text(Number(options.type), Number(options.numid), options.words, options.title);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('data-create')
    .description('Create data storage entry (30 fields)')
    .requiredOption('--name <fields>', 'Field names, e.g. data1,data2')
    .requiredOption('--data <values>', 'Values in same order, e.g. "val1","val2"')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.dataCreate(options.name, options.data);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('data-query')
    .description('Query data storage (supports conditions, sort, pagination)')
    .requiredOption('--name <fields>', 'Field names or * for all')
    .option('--tj <conditions>', 'Filter conditions, e.g. data1<>"张三"')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .option('--limit <n>', 'Results per page (default 1)', String(1))
    .option('--pxname <field>', 'Sort field')
    .option('--px <n>', '1=asc 2=desc')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.dataQuery(
          options.name,
          options.tj,
          Number(options.page),
          Number(options.limit),
          options.pxname,
          options.px ? Number(options.px) : undefined
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('data-delete')
    .description('Delete data storage records by condition')
    .requiredOption('--tj <conditions>', 'Delete condition, e.g. data1<>\'张三\'')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.dataDelete(options.tj);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('data-update')
    .description('Update data storage records')
    .requiredOption('--data <fields>', 'Update content, e.g. field1<>\'newval\'')
    .option('--tj <conditions>', 'Update condition, e.g. field2<>\'val\'')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.dataUpdate(options.data, options.tj);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('data-verify')
    .description('Verify two fields against stored data (e.g. username + password)')
    .requiredOption('--name1 <field>', 'First field name')
    .requiredOption('--name2 <field>', 'Second field name')
    .requiredOption('--data1 <value>', 'First field value')
    .requiredOption('--data2 <value>', 'Second field value')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.dataVerify(options.name1, options.name2, options.data1, options.data2);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('upload')
    .description('Upload file to light storage (100M free, base64 encoded)')
    .requiredOption('--type <ext>', 'File extension, e.g. jpg, png (no php/html/htm)')
    .requiredOption('--name <name>', 'File name (max 200 chars, same name only uploadable once)')
    .requiredOption('--res <base64>', 'File data in BASE64, encoded <1M')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.lightUpload(options.type, options.name, options.res);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('delete-file')
    .description('Delete file from light storage by filename')
    .requiredOption('--name <name>', 'File name to delete')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.lightDelete(options.name);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('cloud-getpost')
    .description('Cloud-hosted GET/POST proxy (no id/key needed on API side)')
    .requiredOption('--url <url>', 'Target request URL')
    .requiredOption('--tgid <id>', 'Managed params ID from user backend')
    .option('--type <n>', '0=GET, 1=POST (default 1)')
    .option('--dc <params>', 'Dynamic params, separate with (-) instead of &')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.cloudGetPost(options.url, options.tgid, options.type ? Number(options.type) : undefined, options.dc);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  storage
    .command('cloud-mysql')
    .description('Cloud-hosted MySQL middleware (no id/key needed on API side)')
    .requiredOption('--tgid <id>', 'Managed params ID from user backend')
    .option('--yuju <sql>', 'SQL statement (uses managed statement if not provided)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new StorageAPI(client);
      try {
        const result = await api.cloudMysql(options.tgid, options.yuju);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
