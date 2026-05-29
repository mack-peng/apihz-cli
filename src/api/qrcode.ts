import { ApihzClient } from '../utils/http';

export interface QrcodeResponse {
  code: number;
  msg: string;
}

export class QrcodeAPI {
  constructor(private client: ApihzClient) {}

  async create(text: string, level?: number, size?: number, bjcolour?: string, xscolour?: string): Promise<QrcodeResponse> {
    return this.client.get('/api/ewm/api.php', { text, level, size, bjcolour, xscolour });
  }

  async parse(type: number, img: string, sty?: string): Promise<QrcodeResponse> {
    return this.client.get('/api/ewm/jxapi.php', { type, img, sty });
  }

  async parsePlus(type: number, img: string): Promise<QrcodeResponse> {
    return this.client.get('/api/ewm/apiplus.php', { type, img });
  }
}
