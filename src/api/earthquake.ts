import { ApihzClient } from '../utils/http';

export class EarthquakeAPI {
  constructor(private client: ApihzClient) {}

  async latest(): Promise<any> {
    return this.client.get('/api/tianqi/dizhen.php');
  }

  async report(y: string, m: string, d: string): Promise<any> {
    return this.client.get('/api/tianqi/dizhensuold.php', { y, m, d });
  }

  async history(y: string, m: string, d: string): Promise<any> {
    return this.client.get('/api/tianqi/dizhenold.php', { y, m, d });
  }
}
