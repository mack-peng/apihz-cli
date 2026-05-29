import { Command } from 'commander';
import { ApihzClient } from '../utils/http';
import { AiAPI } from '../api/ai';
import { formatOutput } from '../utils/output';

export function registerAiCommands(program: Command): void {
  const ai = program.command('ai').description('AI recognition operations');

  ai
    .command('face-compare')
    .description('Compare two face images for identity match')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--imga <data>', 'Image A URL or BASE64')
    .requiredOption('--imgb <data>', 'Image B URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.faceCompare(Number(options.type), options.imga, options.imgb);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('face-liveness')
    .description('Detect if face is live or spoofed')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Face image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.faceLiveness(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('face-attr')
    .description('Analyze face attributes (age, gender, emotion, beauty)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Face image URL or BASE64')
    .option('--mode <n>', '1=all attributes 2=face detection only (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.faceAttr(Number(options.type), options.img, Number(options.mode));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('ocr')
    .description('Recognize text from image (multi-language)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64')
    .option('--sep <char>', 'Content separator')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.ocr(Number(options.type), options.img, options.sep);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('idcard')
    .description('Recognize ID card info (front and back)')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'ID card image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.idCard(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('bankcard')
    .description('Recognize bank card info')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Bank card image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.bankCard(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('driving-license')
    .description('Recognize driving license info')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'License image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.drivingLicense(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('vehicle-license')
    .description('Recognize vehicle license info')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'License image URL or BASE64')
    .requiredOption('--page <n>', '1=front page 2=back page')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.vehicleLicense(Number(options.type), options.img, Number(options.page));
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('business-license')
    .description('Recognize business license info')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'License image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.businessLicense(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('receipt')
    .description('Recognize receipt/invoice info')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Receipt image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.receipt(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('plate')
    .description('Recognize license plate')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.plate(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('vehicle')
    .description('Recognize vehicle make/model/color')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.vehicle(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('product')
    .description('Recognize product from image')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.product(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('tag')
    .description('Recognize image tags')
    .requiredOption('--type <n>', '1=remote URL 2=BASE64')
    .requiredOption('--img <data>', 'Image URL or BASE64')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.tag(Number(options.type), options.img);
        console.log(formatOutput(result));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
