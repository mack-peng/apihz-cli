import { ApihzClient } from '../utils/http';

export interface IcpResponse {
  code: number;
  msg: string;
  td: string;
  type: string;
  icp: string;
  unit: string;
  domain: string;
  time: string;
}

export interface DomainResponse {
  code: number;
  msg: string;
  domain: string;
  type: number;
  whois?: string;
}

export interface TdkResponse {
  code: number;
  msg: string;
  ico: string;
  title: string;
  keywords: string;
  description: string;
}

export interface SeoResponse {
  code: number;
  msg: string;
  domain: string;
  title: string;
  keywords: string;
  description: string;
  baiduip: string;
  baiduip2: string;
  chuzhan: string;
  neilian: string;
  bdqz: string;
  bdqz2: string;
  sgqz: string;
  [key: string]: any;
}

export interface IndexCountResponse {
  code: number;
  msg: string;
  url: string;
  num: string;
}

export interface TcpPortResponse {
  code: number;
  msg: string;
  host: string;
  port: string;
  state: string;
}

export interface WhoisResponse {
  code: number;
  msg: string;
  domain: string;
  handle: string;
  status: string;
  zcname: string;
  addtime: string;
  endtime: string;
  uptime: string;
  dnssec: boolean;
  ns1: string;
  ns2: string;
  [key: string]: any;
}

export interface WhoisAllResponse {
  code: number;
  msg: string;
  domain: string;
  whois: string;
}

export interface ReverseDnsResponse {
  code: number;
  msg: string;
  ip: string;
  reverse_dns: string;
  reverse_dns_exists: boolean;
  is_bot: boolean;
  verified: boolean;
  query_time: number;
  timestamp: string;
  reverse_verification: any;
  forward_verification: any;
}

export interface Domain3Response {
  code: number;
  msg: string;
  domains: Array<{ domain: string; time: string }>;
}

export interface LetsencryptResponse {
  code: number;
  msg: string;
  order: string;
  dnsurl: string;
  dnstype: string;
  dnsvalue: string;
  dnsurl2?: string;
  dnstype2?: string;
  dnsvalue2?: string;
  data?: {
    zskey: string;
    zspem: string;
    expires_at: string;
    domain: string;
  };
}

export interface SslCheckResponse {
  code: number;
  msg: string;
  url: string;
  subject: any;
  issuer: any;
  validity: any;
  key_info: any;
  fingerprints: any;
  serial_number: string;
  version: string;
  is_self_signed: boolean;
  extensions: any;
  raw_data: any;
}

export interface RedirectResponse {
  code: number;
  msg: string;
  url: string;
}

export interface ExtractLinksResponse {
  code: number;
  msg: string;
  img: string[];
  video: string[];
  music: string[];
  package: string[];
  document: string[];
  css: string[];
  js: string[];
  html: string[];
  php: string[];
  other: string[];
}

export interface TextContentResponse {
  code: number;
  msg: string;
  data: string;
}

export interface HttpStatusResponse {
  code: number;
  msg: string;
}

export interface ScreenshotResponse {
  code: number;
  imgurl: string;
}

export interface PingResponse {
  code: number;
  msg: string;
  time: string;
  host: string;
  realhost: string;
  ip: string;
  dy: string;
  dz: string;
  sheng: string;
  shi: string;
  isp: string;
  lat: string;
  lon: string;
}

export interface SendDataResponse {
  code: number;
  msg: string;
}

export interface WechatCheckResponse {
  code: number;
  msg: string;
  url: string;
}

export interface ShortUrlQueryResponse {
  code: number;
  msg: string;
  ucode: string;
  domain: string;
  dwz: string;
  url: string;
  daynum: string;
  ydaynum: string;
  numall: string;
  addtime: string;
  endtime: string;
  addtime2: string;
  endtime2: string;
  on: string;
}

export interface ShortUrlCreateResponse {
  code: number;
  msg: string;
  ucode: string;
  domain: string;
  dwz: string;
}

export interface IcpLightResponse {
  code: number;
  msg: string;
  icp: string;
}

export class NetworkAPI {
  constructor(private client: ApihzClient) {}

  async icp(domain: string): Promise<IcpResponse> {
    return this.client.get('/api/wangzhan/icp.php', { domain });
  }

  async icpPlus(domain: string): Promise<IcpResponse> {
    return this.client.get('/api/wangzhan/icpwd.php', { domain });
  }

  async domainCheck(domain: string): Promise<DomainResponse> {
    return this.client.get('/api/wangzhan/domainzc.php', { domain });
  }

  async tdk(url: string, type?: number): Promise<TdkResponse> {
    return this.client.get('/api/wangzhan/getdata.php', { url, type });
  }

  async seo(domain: string, td?: number, hctype?: number): Promise<SeoResponse> {
    return this.client.get('/api/wangzhan/seo1.php', { domain, td, hctype });
  }

  async baiduIndex(domain: string): Promise<IndexCountResponse> {
    return this.client.get('/api/wangzhan/slbaidu.php', { domain });
  }

  async sogouIndex(domain: string): Promise<IndexCountResponse> {
    return this.client.get('/api/wangzhan/slsougou.php', { domain });
  }

  async so360Index(domain: string): Promise<IndexCountResponse> {
    return this.client.get('/api/wangzhan/sl360.php', { domain });
  }

  async bingIndex(domain: string): Promise<IndexCountResponse> {
    return this.client.get('/api/wangzhan/slbiying.php', { domain });
  }

  async aizhanWeight(domain: string): Promise<any> {
    return this.client.get('/api/wangzhan/aizhanqz.php', { domain });
  }

  async tcpPort(host: string, port?: number, type?: number): Promise<TcpPortResponse> {
    return this.client.get('/api/wangzhan/port.php', { host, port, type });
  }

  async whois(domain: string): Promise<WhoisResponse> {
    return this.client.get('/api/wangzhan/whois.php', { domain });
  }

  async whoisAll(domain: string, type?: number): Promise<WhoisAllResponse> {
    return this.client.get('/api/wangzhan/whoisall.php', { domain, type });
  }

  async reverseDns(ip?: string): Promise<ReverseDnsResponse> {
    return this.client.get('/api/ip/fdns.php', { ip });
  }

  async domain3(hz: string, page?: number): Promise<Domain3Response> {
    return this.client.get('/api/wangzhan/domain3.php', { hz, page });
  }

  async letsencrypt(type: number, domain?: string, order?: string): Promise<LetsencryptResponse> {
    return this.client.get('/api/ssl/letsencrypt.php', { type, domain, order });
  }

  async sslCheck(domain: string): Promise<SslCheckResponse> {
    return this.client.get('/api/wangzhan/sslq.php', { domain });
  }

  async redirect(url: string): Promise<RedirectResponse> {
    return this.client.get('/api/wangzhan/tiaozhuan.php', { url });
  }

  async extractLinks(url: string, type?: number): Promise<ExtractLinksResponse> {
    return this.client.get('/api/wangzhan/getres.php', { url, type });
  }

  async textContent(url: string, dy?: number): Promise<TextContentResponse> {
    return this.client.get('/api/wangzhan/getyuan.php', { url, dy });
  }

  async httpStatus(url: string, type?: number): Promise<HttpStatusResponse> {
    return this.client.get('/api/wangzhan/getcode.php', { url, type });
  }

  async screenshot(url: string, width?: number, height?: number, quality?: number): Promise<ScreenshotResponse> {
    return this.client.get('/api/wangzhan/jietu.php', { url, width, height, quality });
  }

  async ping(host: string, type?: number): Promise<PingResponse> {
    return this.client.get('/api/wangzhan/ping.php', { host, type });
  }

  async sendTcp(ip: string, port: number, data: string): Promise<SendDataResponse> {
    return this.client.get('/api/datacs/tcp.php', { ip, port, data });
  }

  async sendUdp(ip: string, port: number, data: string): Promise<SendDataResponse> {
    return this.client.get('/api/datacs/udp.php', { ip, port, data });
  }

  async wechatCheck(url: string): Promise<WechatCheckResponse> {
    return this.client.get('/api/wangzhan/wxfh.php', { url });
  }

  async shortUrlQuery(code: string, domain: string): Promise<ShortUrlQueryResponse> {
    return this.client.get('/api/wangzhan/dwz3.php', { code, domain });
  }

  async shortUrlCreate(url: string, type?: number): Promise<ShortUrlCreateResponse> {
    return this.client.get('/api/wangzhan/dwz1.php', { url, type });
  }

  async icpLight(domain: string, hctype?: number): Promise<IcpLightResponse> {
    return this.client.get('/api/wangzhan/icpf.php', { domain, hctype });
  }
}
