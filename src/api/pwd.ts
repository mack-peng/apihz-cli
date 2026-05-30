import { ApihzClient } from '../utils/http';

export interface PwdResponse {
  code: number;
  msg: string;
}

export interface MorseResponse {
  code: number;
  msg: string;
  words: string;
}

export class PwdAPI {
  constructor(private client: ApihzClient) {}

  async md5(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/md5.php', { words });
  }

  async base64Encode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/base64bm.php', { words });
  }

  async base64Decode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/base64jm.php', { words });
  }

  async authcodeEncrypt(words: string, pwd: string, time?: number): Promise<PwdResponse> {
    return this.client.get('/api/pwd/authcodejiami.php', { words, pwd, time });
  }

  async authcodeDecrypt(words: string, pwd: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/authcodejiemi.php', { words, pwd });
  }

  async desEncrypt(words: string, pwd: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/desjiami.php', { words, pwd });
  }

  async desDecrypt(words: string, pwd: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/desjiemi.php', { words, pwd });
  }

  async rc4Encrypt(words: string, pwd: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/rc4jiami.php', { words, pwd });
  }

  async rc4Decrypt(words: string, pwd: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/rc4jiemi.php', { words, pwd });
  }

  async morse(words: string, type?: number): Promise<MorseResponse> {
    return this.client.get('/api/zici/mosi.php', { words, type });
  }

  async urlEncode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/urlbm.php', { words });
  }

  async urlDecode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/urljm.php', { words });
  }

  async hexEncode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/bm16.php', { words });
  }

  async hexDecode(words: string): Promise<PwdResponse> {
    return this.client.get('/api/pwd/jm16.php', { words });
  }
}
