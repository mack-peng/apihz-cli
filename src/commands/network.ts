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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
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
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('seo')
    .description('Query website SEO info (weight, indexing, ICP, domain age)')
    .requiredOption('--domain <domain>', 'Domain name')
    .option('--td <n>', 'Query channel: 1=local (default), 2=proxy')
    .option('--hctype <n>', '0=prefer cache (default), 1=direct query')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.seo(options.domain, options.td ? Number(options.td) : undefined, options.hctype ? Number(options.hctype) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('baidu-index')
    .description('Query Baidu indexed page count (real-time)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.baiduIndex(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('sogou-index')
    .description('Query Sogou indexed page count (real-time)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.sogouIndex(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('360-index')
    .description('Query 360 indexed page count (real-time)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.so360Index(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('bing-index')
    .description('Query Bing indexed page count (real-time)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.bingIndex(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('aizhan-weight')
    .description('Query Aizhan website weight/rank')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.aizhanWeight(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('tcp-port')
    .description('Check if a TCP port is open')
    .requiredOption('--host <host>', 'Target IP or domain')
    .option('--port <n>', 'Port number (default 80)', String(80))
    .option('--node <n>', 'Detection node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.tcpPort(options.host, Number(options.port), Number(options.node));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('whois')
    .description('Query top-level domain WHOIS info (formatted)')
    .requiredOption('--domain <domain>', 'Domain name')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.whois(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('whois-all')
    .description('Query global domain WHOIS info (1000+ TLDs)')
    .requiredOption('--domain <domain>', 'Domain name')
    .option('--type <n>', '1=cache 2=registry direct (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.whoisAll(options.domain, Number(options.type));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('reverse-dns')
    .description('Reverse DNS lookup and spider verification')
    .option('--ip <addr>', 'IP address (default: caller IP)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.reverseDns(options.ip);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('domain-3')
    .description('Batch get available 3-char short domains')
    .requiredOption('--hz <suffix>', 'TLD: cn/com/net/xyz/vip/cc/top/club/shop/tv/fun')
    .option('--page <n>', 'Page number (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.domain3(options.hz, Number(options.page));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('letsencrypt')
    .description('Manage LetsEncrypt free SSL certificates (90-day)')
    .requiredOption('--type <n>', '1=apply 2=get cert 3=query history')
    .option('--domain <domain>', 'Domain name (required for apply)')
    .option('--order <id>', 'Order ID (required for get/query)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.letsencrypt(Number(options.type), options.domain, options.order);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('ssl-check')
    .description('Check SSL certificate info for a website')
    .requiredOption('--domain <domain>', 'Domain or URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.sslCheck(options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('redirect')
    .description('Get webpage redirect destination URL')
    .requiredOption('--url <url>', 'Webpage URL')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.redirect(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('extract-links')
    .description('Extract all links from a webpage')
    .requiredOption('--url <url>', 'Target URL')
    .option('--node <n>', 'Access node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.extractLinks(options.url, Number(options.node));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('text-content')
    .description('Extract plain text from a webpage (no HTML/CSS/JS)')
    .requiredOption('--url <url>', 'Target URL')
    .option('--node <n>', 'Access node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.textContent(options.url, Number(options.node));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('http-status')
    .description('Get webpage HTTP status code (regional nodes)')
    .requiredOption('--url <url>', 'Target URL')
    .option('--node <n>', 'Detection node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.httpStatus(options.url, Number(options.node));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('screenshot')
    .description('Take a webpage screenshot preview (costs 50 points)')
    .requiredOption('--url <url>', 'Target URL')
    .option('--width <n>', 'Screenshot width (max 1280)', String(1280))
    .option('--height <n>', 'Screenshot height (max 1024)', String(1024))
    .option('--quality <n>', 'Image quality (max 90)', String(90))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.screenshot(options.url, Number(options.width), Number(options.height), Number(options.quality));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('ping')
    .description('Ping a domain or IP (regional nodes)')
    .requiredOption('--host <host>', 'Domain or IP to ping')
    .option('--node <n>', 'Node: 1=CN 2=HK 3=US (default 1)', String(1))
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.ping(options.host, Number(options.node));
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('send-tcp')
    .description('Send TCP data to a host')
    .requiredOption('--ip <addr>', 'Target IP')
    .requiredOption('--port <n>', 'Target port')
    .requiredOption('--data <data>', 'Data to send (max 1000 bytes)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.sendTcp(options.ip, Number(options.port), options.data);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('send-udp')
    .description('Send UDP data to a host')
    .requiredOption('--ip <addr>', 'Target IP')
    .requiredOption('--port <n>', 'Target port')
    .requiredOption('--data <data>', 'Data to send (max 1000 bytes)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.sendUdp(options.ip, Number(options.port), options.data);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('wechat-check')
    .description('Check if a domain is blocked by WeChat')
    .requiredOption('--url <url>', 'URL to check')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.wechatCheck(options.url);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('short-url-query')
    .description('Query short URL info (stats, target URL)')
    .requiredOption('--code <code>', 'Short URL suffix')
    .requiredOption('--domain <domain>', 'Short URL domain')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.shortUrlQuery(options.code, options.domain);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('short-url-create')
    .description('Create a short URL (random suffix)')
    .requiredOption('--url <url>', 'Target URL to shorten')
    .option('--type <n>', '1=00l.xyz 2=l00.xyz (default random)')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.shortUrlCreate(options.url, options.type ? Number(options.type) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });

  network
    .command('icp-light')
    .description('Query ICP filing number (lightweight, fast)')
    .requiredOption('--domain <domain>', 'Domain name')
    .option('--hctype <n>', '0=prefer cache (default), 1=direct query')
    .action(async (options, command) => {
      const opts = command.optsWithGlobals();
      const client = new ApihzClient({ id: opts.id, key: opts.key, vip: opts.vip });
      const api = new NetworkAPI(client);
      try {
        const result = await api.icpLight(options.domain, options.hctype ? Number(options.hctype) : undefined);
        console.log(formatOutput(result, !opts.raw));
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    });
}
