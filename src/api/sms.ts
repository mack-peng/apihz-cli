import { ApihzClient } from '../utils/http';

export interface SmsSendResponse {
  code: number;
  msg: string;
  qid: string;
}

export interface SmsVerifyResponse {
  code: number;
  msg: string;
}

export class SmsAPI {
  constructor(private client: ApihzClient) {}

  async send(phone: string, code?: string): Promise<SmsSendResponse> {
    return this.client.get('/api/sms/dfapi.php', { phone, code });
  }

  async sendVerify(type: number, phone: string, code?: string): Promise<SmsSendResponse> {
    return this.client.get('/api/cunchu/sms.php', { type, phone, code });
  }

  async sendAliyun(phone: string, aliid: string, alikey: string, smssign: string, templateid: string, code: string): Promise<SmsVerifyResponse> {
    return this.client.get('/api/sms/zfaliapi.php', { phone, aliid, alikey, smssign, templateid, code });
  }
}
