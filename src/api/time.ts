import { ApihzClient } from '../utils/http';

export interface TimeNowResponse {
  code: number;
  y: string;
  m: string;
  d: string;
  h: string;
  i: string;
  s: string;
  sjc: number;
  wenum: string;
  wecn: string;
  ny: string;
  nm: string;
  nd: string;
  yall: string;
  nod: string;
  now: string;
  sx: string;
  msg: string;
}

export interface TimeConvertResponse {
  code: number;
  msg: string;
}

export interface TimeGetDayResponse {
  code: number;
  msg: string;
  [key: string]: any;
}

export interface TimeCountryResponse {
  code: number;
  data: {
    country: {
      cn: string;
      en: string;
      iso2: string;
      lat: number;
      lng: number;
      utc_offset: string;
    };
    utc_time: {
      timestamp: number;
      datetime: string;
    };
    timezones: Array<{
      name: string;
      offset: string;
      current_time: string;
      is_dst: boolean;
    }>;
  };
}

export class TimeAPI {
  constructor(private client: ApihzClient) {}

  async now(type?: number): Promise<TimeNowResponse | TimeConvertResponse> {
    return this.client.get('/api/time/getapi.php', { type });
  }

  async timestampTo(time: string): Promise<TimeConvertResponse> {
    return this.client.get('/api/time/zsjcapi.php', { time });
  }

  async timestampFrom(time: string, type?: number): Promise<TimeConvertResponse> {
    return this.client.get('/api/time/ztimeapi.php', { time, type });
  }

  async getDay(type?: number): Promise<TimeGetDayResponse> {
    return this.client.get('/api/time/getday.php', { type });
  }

  async countryTime(country: string): Promise<TimeCountryResponse> {
    return this.client.get('/api/time/timecountry.php', { country });
  }
}
