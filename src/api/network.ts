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
}
