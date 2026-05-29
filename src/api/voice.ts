import { ApihzClient } from '../utils/http';

export interface VoiceToTextResponse {
  code: number;
  msg: string;
}

export interface VoiceToVoiceResponse {
  code: number;
  msg: string;
}

export class VoiceAPI {
  constructor(private client: ApihzClient) {}

  async toText(type: number, data: string, format: string, vicetype?: string, datalen?: number): Promise<VoiceToTextResponse> {
    return this.client.get('/api/yuyin/shibie.php', { type, data, format, vicetype, datalen });
  }

  async toVoice(text: string, type: number, vtype?: number, volume?: number, speed?: number, voicetype?: number, lg?: number, qg?: string): Promise<VoiceToVoiceResponse> {
    return this.client.get('/api/yuyin/hecheng.php', { text, type, vtype, volume, speed, voicetype, lg, qg });
  }
}
