import { ApihzClient } from '../utils/http';

export class HardwareAPI {
  constructor(private client: ApihzClient) {}

  async laptopGpu(): Promise<any> {
    return this.client.get('/api/bang/xianka2.php');
  }

  async desktopGpu(): Promise<any> {
    return this.client.get('/api/bang/xianka1.php');
  }
}
