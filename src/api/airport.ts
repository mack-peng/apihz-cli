import { ApihzClient } from '../utils/http';

export class AirportAPI {
  constructor(private client: ApihzClient) {}

  async search(words: string, page?: string): Promise<any> {
    return this.client.get('/api/jiaotong/airport.php', { words, page });
  }

  async codes(): Promise<any> {
    return this.client.get('/api/jiaotong/jichangcode.php');
  }
}
