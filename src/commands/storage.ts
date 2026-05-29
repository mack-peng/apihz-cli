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
        console.log(formatOutput(result));
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
        console.log(formatOutput(result));
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
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
