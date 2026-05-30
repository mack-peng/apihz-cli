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

  async dataDelete(tj: string): Promise<{ code: number; msg: string; time: string }> {
    return this.client.get('/api/cunchu/datashan.php', { tj });
  }

  async dataUpdate(data: string, tj?: string): Promise<{ code: number; msg: string; time: string }> {
    return this.client.get('/api/cunchu/datagai.php', { data, tj });
  }

  async dataVerify(name1: string, name2: string, data1: string, data2: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/cunchu/datayz.php', { name1, name2, data1, data2 });
  }

  async lightUpload(type: string, name: string, res: string): Promise<{ code: number; msg: string; resurl: string }> {
    return this.client.get('/api/ziyuan/pan.php', { type, name, res });
  }

  async lightDelete(name: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ziyuan/pandel.php', { name });
  }

  async cloudGetPost(url: string, tgid: string, type?: number, dc?: string): Promise<any> {
    return this.client.get('/api/tuoguan/getpost.php', { url, tgid, type, dc });
  }

  async cloudMysql(tgid: string, yuju?: string): Promise<{ code: number; msg: string; time: number; date: any[] }> {
    return this.client.get('/api/tuoguan/mysql.php', { tgid, yuju });
  }
}
