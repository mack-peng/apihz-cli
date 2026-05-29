import { ApihzClient } from '../utils/http';

export interface UnitConvertResponse {
  code: number;
  num: string;
  unit: string;
  data: Array<{
    num: string;
    unit: string;
    name: string;
  }>;
}

export class UnitAPI {
  constructor(private client: ApihzClient) {}

  async speed(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/sudu.php', { num, unit });
  }

  async timeUnit(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/time.php', { num, unit });
  }

  async density(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/midu.php', { num, unit });
  }

  async frequency(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/pinlv.php', { num, unit });
  }

  async current(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/dianliu.php', { num, unit });
  }

  async voltage(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/dianya.php', { num, unit });
  }

  async resistance(num: number, unit: string): Promise<UnitConvertResponse> {
    return this.client.get('/api/danwei/dianzu.php', { num, unit });
  }
}
