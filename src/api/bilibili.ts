import { ApihzClient } from '../utils/http';

export class BilibiliAPI {
  constructor(private client: ApihzClient) {}

  async ranking(): Promise<any> {
    return this.client.get('/api/bang/bilibili1.php');
  }

  async liveCategories(): Promise<any> {
    return this.client.get('/api/fun/bilifl.php');
  }

  async liveAnchors(): Promise<any> {
    return this.client.get('/api/fun/bilizbrq.php');
  }

  async videoInfo(url: string, ck?: string): Promise<any> {
    return this.client.get('/api/caiji/bivideoinfo.php', { url, ck });
  }

  async userInfo(buid: string, ck?: string): Promise<any> {
    return this.client.get('/api/caiji/biinfo.php', { buid, ck });
  }

  async liveUrl(room: string): Promise<any> {
    return this.client.get('/api/fun/bilizb.php', { room });
  }

  async liveRooms(fid: string, zid: string, page?: string, ck?: string): Promise<any> {
    return this.client.get('/api/fun/bilizblist.php', { fid, zid, page, ck });
  }

  async maoyanMovie(): Promise<any> {
    return this.client.get('/api/bang/maoyan1.php');
  }

  async maoyanTv(): Promise<any> {
    return this.client.get('/api/bang/maoyan2.php');
  }

  async maoyanWebMovie(): Promise<any> {
    return this.client.get('/api/bang/maoyan5.php');
  }

  async maoyanWebDrama(): Promise<any> {
    return this.client.get('/api/bang/maoyan3.php');
  }

  async maoyanTvRating(): Promise<any> {
    return this.client.get('/api/bang/maoyan6.php');
  }

  async maoyanVariety(): Promise<any> {
    return this.client.get('/api/bang/maoyan4.php');
  }

  async baiduMovie(): Promise<any> {
    return this.client.get('/api/xinwen/baidumovie.php');
  }

  async baiduTv(): Promise<any> {
    return this.client.get('/api/xinwen/baiduteleplay.php');
  }

  async baiduCar(): Promise<any> {
    return this.client.get('/api/xinwen/baiducar.php');
  }

  async randomVideo(): Promise<any> {
    return this.client.get('/api/fun/girl.php');
  }
}
