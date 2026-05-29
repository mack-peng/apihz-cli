import { ApihzClient } from '../utils/http';

export interface StorageTextResponse {
  code: number;
  msg: string;
  jiluid: string;
  time: string;
  words: string;
  title: string;
}

export interface StorageDataResponse {
  code: number;
  msg: string;
  data: any[];
}

export class StorageAPI {
  constructor(private client: ApihzClient) {}

  async text(type: number, numid: number, words?: string, title?: string): Promise<StorageTextResponse> {
    return this.client.get('/api/cunchu/textcc.php', { type, numid, words, title });
  }

  async dataCreate(name: string, data: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/cunchu/datazeng.php', { name, data });
  }

  async dataQuery(name: string, tj?: string, page?: number, limit?: number, pxname?: string, px?: number): Promise<StorageDataResponse> {
    return this.client.get('/api/cunchu/datacha.php', { name, tj, page, limit, pxname, px });
  }
}
