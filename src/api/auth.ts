import { ApihzClient } from '../utils/http';

export interface AuthBankResponse {
  code: number;
  msg: string;
  errocode?: string;
}

export interface AuthAlipayResponse {
  code: number;
  msg: string;
  cxid: string;
  rzurl: string;
  ewmurl: string;
}

export interface AuthAlipayCheckResponse {
  code: number;
  msg: string;
  name: string;
  number: string;
  alipay_user_id: string;
  user_id: string;
  addtime: string;
  endtime: string;
}

export class AuthAPI {
  constructor(private client: ApihzClient) {}

  async bank3(name: string, number: string, idcard: string): Promise<AuthBankResponse> {
    return this.client.get('/api/shiming/bank3.php', { name, number, idcard });
  }

  async bank2(name: string, number: string): Promise<AuthBankResponse> {
    return this.client.get('/api/shiming/bank2.php', { name, number });
  }

  async alipay(name: string, number: string, url?: string): Promise<AuthAlipayResponse> {
    return this.client.get('/api/shiming/alipay.php', { name, number, url });
  }

  async alipayCheck(cxid: string): Promise<AuthAlipayCheckResponse> {
    return this.client.get('/api/shiming/alipay3.php', { cxid });
  }
}
