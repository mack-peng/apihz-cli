import { ApihzClient } from '../utils/http';

export class TransportAPI {
  constructor(private client: ApihzClient) {}

  async trainRemain(add: string, end: string, y: string, m: string, d: string, ck?: string): Promise<any> {
    return this.client.get('/api/12306/api.php', { add, end, y, m, d, ck });
  }

  async trainTransfer(add: string, end: string, y: string, m: string, d: string, page?: string): Promise<any> {
    return this.client.get('/api/12306/apihc.php', { add, end, y, m, d, page });
  }

  async trainPublishedPrice(add: string, end: string, y: string, m: string, d: string, ck?: string): Promise<any> {
    return this.client.get('/api/12306/api4.php', { add, end, y, m, d, ck });
  }

  async trainTicketPrice(train_order: string, depart_index: string, arrive_index: string, seatcode: string, y: string, m: string, d: string, ck?: string): Promise<any> {
    return this.client.get('/api/12306/api2.php', { train_order, depart_index, arrive_index, seatcode, y, m, d, ck });
  }

  async trainStops(train_order: string, ck?: string): Promise<any> {
    return this.client.get('/api/12306/api3.php', { train_order, ck });
  }

  async busRoute(starlon: string, starlat: string, endlon: string, endlat: string, linetype?: string, type?: string): Promise<any> {
    return this.client.get('/api/jiaotong/gongjiao.php', { starlon, starlat, endlon, endlat, linetype, type });
  }

  async busLineInfo(uuid: string, type?: string): Promise<any> {
    return this.client.get('/api/jiaotong/gongjiao2.php', { uuid, type });
  }

  async navigation(starlon: string, starlat: string, endlon: string, endlat: string, mid?: string, linetype?: string, type?: string): Promise<any> {
    return this.client.get('/api/jiaotong/daohang.php', { starlon, starlat, endlon, endlat, mid, linetype, type });
  }

  async express(number: string, mobile?: string, code?: string, sort?: string): Promise<any> {
    return this.client.get('/api/kuaidi/others.php', { number, mobile, code, sort });
  }
}
