import { ApihzClient } from '../utils/http';

export interface ImageSearchResponse {
  code: number;
  msg: string;
  page: string;
  maxpage: string;
  count: string;
  res: string[];
}

export interface ImageUrlResponse {
  code: number;
  msg: string;
}

export class ImageAPI {
  constructor(private client: ApihzClient) {}

  async bqBaidu(words?: string, page?: number, limit?: number): Promise<ImageSearchResponse> {
    return this.client.get('/api/img/apihzbqbbaidu.php', { words, page, limit });
  }

  async bqSougou(words?: string, page?: number): Promise<ImageSearchResponse> {
    return this.client.get('/api/img/apihzbqbsougou.php', { words, page });
  }

  async bqApihz(type: number, words?: string, page?: number, limit?: number): Promise<ImageSearchResponse> {
    return this.client.get('/api/img/apihzbqb.php', { type, words, page, limit });
  }

  async imgBaidu(words?: string, page?: number, limit?: number, type?: number): Promise<ImageSearchResponse> {
    return this.client.get('/api/img/apihzimgbaidu.php', { words, page, limit, type });
  }

  async imgSougou(words?: string, page?: number, type?: number): Promise<ImageSearchResponse> {
    return this.client.get('/api/img/apihzimgsougou.php', { words, page, type });
  }

  async imgBz(type: number, imgtype: number): Promise<ImageUrlResponse> {
    return this.client.get('/api/img/apihzimgbz.php', { type, imgtype });
  }

  async imgTx(type?: number, imgtype?: number): Promise<ImageUrlResponse> {
    return this.client.get('/api/img/apihzimgtx.php', { type, imgtype });
  }

  async bing(type: number): Promise<ImageUrlResponse> {
    return this.client.get('/api/img/bingapi.php', { type });
  }

  async nasa(type: number, hd: number): Promise<ImageUrlResponse> {
    return this.client.get('/api/img/nasaapi.php', { type, hd });
  }
}
