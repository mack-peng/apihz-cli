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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('light-ocr')
    .description('Lightweight OCR image recognition (10+ languages, paid)')
    .requiredOption('--img <data>', 'Image URL or BASE64 (max 500KB)')
    .option('--lang <lang>', 'Recognition language (default chi_sim+eng)')
    .option('--binarize', 'Enable binarization processing', true)
    .option('--threshold <n>', 'Binarization threshold 0-1 (default 0.7)', String(0.7))
    .option('--psm <n>', 'Segmentation mode 0-10 (default 10)', String(10))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.lightOcr(
          options.img,
          options.lang,
          options.binarize ? 1 : 0,
          Number(options.threshold),
          Number(options.psm)
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('idcard-verify')
    .description('Real-name verification (national ID, paid)')
    .requiredOption('--name <name>', 'Person name')
    .requiredOption('--number <id>', 'ID card number')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.idCardVerify(options.name, options.number);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-light')
    .description('InterfaceBox official lightweight AI model')
    .requiredOption('--words <text>', 'Chat content (max 5000)')
    .option('--sid <n>', 'Line ID: 1 or 2 (default random)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.lightAi(
          options.words,
          options.sid ? Number(options.sid) : undefined
        );
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-hunyuan')
    .description('Tencent Hunyuan Lite AI chat')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .option('--key <key>', 'Custom Tencent Hunyuan API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.hunyuan(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-zhipu')
    .description('Zhipu GLM-4-Flash AI chat')
    .requiredOption('--words <text>', 'Chat content')
    .option('--key <key>', 'Custom Zhipu API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.zhipuGlm(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-wenxin')
    .description('Baidu Wenxin 3.5 AI chat')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .option('--key <key>', 'Custom Baidu Qianfan API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wenxin(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-wenxin2')
    .description('Baidu Wenxin 3.5 AI chat (channel 1)')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .option('--key <key>', 'Custom Baidu Qianfan API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wenxin2(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-wenxin3')
    .description('Baidu Wenxin 3.5 AI chat (channel 2)')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .option('--key <key>', 'Custom Baidu Qianfan API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wenxin3(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-wenxin4')
    .description('Baidu Wenxin 3.5 AI chat (channel 3)')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .option('--key <key>', 'Custom Baidu Qianfan API key')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wenxin4(options.words, options.key);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('chat-xunfei')
    .description('Xunfei Spark AI Lite chat')
    .requiredOption('--words <text>', 'Chat content (max 10000)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.xunfei(options.words);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('wxface-query1')
    .description('WeChat face scan verification (enhanced) - query result')
    .requiredOption('--cxid <id>', 'Query ID from step 1 initiate')
    .requiredOption('--type <n>', 'Scan mode: 1=near-far scan 2=flash scan')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wxFaceQuery1(options.cxid, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('wxface-query2')
    .description('WeChat face scan verification (basic) - query result')
    .requiredOption('--cxid <id>', 'Query ID from step 1 initiate')
    .requiredOption('--type <n>', 'Scan mode: 1=number 2=action 3=quiet')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.wxFaceQuery2(options.cxid, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('img-search1')
    .description('Search images by image - channel 1')
    .requiredOption('--img <data>', 'Image URL or BASE64 (max 1M)')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.imgSearch1(options.img, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  ai
    .command('img-search2')
    .description('Search images by image - channel 2')
    .requiredOption('--img <data>', 'Image URL or BASE64 (max 1M)')
    .option('--page <n>', 'Page number', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new AiAPI(client);
      try {
        const result = await api.imgSearch2(options.img, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
