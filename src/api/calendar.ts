import { ApihzClient } from '../utils/http';

export class CalendarAPI {
  constructor(private client: ApihzClient) {}

  async dayHours(type?: number, nian?: number, yue?: number, ri?: number): Promise<any> {
    return this.client.get('/api/time/getzddayhs.php', { type, nian, yue, ri });
  }

  async todayHours(): Promise<any> {
    return this.client.get('/api/time/getdayhs.php');
  }

  async todayLuck(): Promise<any> {
    return this.client.get('/api/time/getdayh.php');
  }

  async dayLuck(nian?: number, yue?: number, ri?: number): Promise<any> {
    return this.client.get('/api/time/getzddayh.php', { nian, yue, ri });
  }

  async dayInfo(nian?: number, yue?: number, ri?: number): Promise<any> {
    return this.client.get('/api/time/getzdday.php', { nian, yue, ri });
  }

  async elapsed(): Promise<any> {
    return this.client.get('/api/time/timemsg.php');
  }

  async mbti(type?: number, version?: number, num?: number, qcan?: string): Promise<any> {
    return this.client.get('/api/mingli/mbti.php', { type, version, num, qcan });
  }

  async zhuge(words?: string): Promise<any> {
    return this.client.get('/api/mingli/zhuge2.php', { words });
  }

  async zhugeQian(): Promise<any> {
    return this.client.get('/api/mingli/zhuge.php');
  }

  async guanyin(): Promise<any> {
    return this.client.get('/api/mingli/guanyin.php');
  }

  async yuelao(): Promise<any> {
    return this.client.get('/api/mingli/yuelao.php');
  }

  async guandi(): Promise<any> {
    return this.client.get('/api/mingli/guandi.php');
  }
}
