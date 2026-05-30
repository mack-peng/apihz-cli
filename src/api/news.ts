import { ApihzClient } from '../utils/http';

export interface NewsResponse {
  code: number;
  msg: string;
  time: number;
  time2: string;
  data: Array<{
    query?: string;
    word?: string;
    desc?: string;
    hotChange?: string;
    hotScore?: string;
    hotTag?: string;
    img?: string;
    index?: number;
    rawUrl?: string;
    url?: string;
    appUrl?: string;
    title?: string;
    icon?: string;
    desc_extr?: string;
    scheme?: string;
    event_time?: string;
    hot_value?: string;
    label?: string;
    video_count?: string;
  }>;
  topContent?: any[];
}

export class NewsAPI {
  constructor(private client: ApihzClient) {}

  async baidu(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/baidu.php');
  }

  async weibo(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/weibo.php');
  }

  async douyin(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/douyin.php');
  }

  async baiduHotMeme(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/baidurg.php');
  }

  async baiduLivelihood(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/baidums.php');
  }

  async baiduNovel(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/baidunovel.php');
  }

  async weiboRising(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/weibo2.php');
  }

  async weiboEntertainment(): Promise<NewsResponse> {
    return this.client.get('/api/xinwen/weibo3.php');
  }

  async toutiao(): Promise<any> {
    return this.client.get('/api/xinwen/toutiao.php');
  }

  async temperatureRank(type?: number, px?: number, page?: number): Promise<any> {
    return this.client.get('/api/tianqi/tqybwdpx.php', { type, px, page });
  }

  async lottery2000(): Promise<any> {
    return this.client.get('/api/caipiao/shuangseqiutj.php');
  }
}
