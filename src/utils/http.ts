import { ConfigManager } from './config';

const API_NORMAL_BASE = 'https://cn.apihz.cn';
const API_VIP_BASE = 'https://vip.apihz.cn';

export class ApihzClient {
  private id: string;
  private key: string;
  private baseUrl: string;

  constructor(opts?: { id?: string; key?: string; vip?: boolean }) {
    const config = new ConfigManager();
    this.id = opts?.id || process.env.APIHZ_ID || String(config.get('id') || '');
    this.key = opts?.key || process.env.APIHZ_KEY || String(config.get('key') || '');
    const vip = opts?.vip ?? Boolean(process.env.APIHZ_VIP) ?? Boolean(config.get('vip'));
    this.baseUrl = vip ? API_VIP_BASE : API_NORMAL_BASE;
  }

  async get<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
    const url = new URL(this.baseUrl + endpoint);
    url.searchParams.set('id', this.id);
    url.searchParams.set('key', this.key);

    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data.code === 400) {
      throw new Error(data.msg || 'Request failed');
    }

    return data as T;
  }
}
