import { ApihzClient } from '../utils/http';

export interface WeatherResponse {
  code: number;
  msg: string;
  guo: string;
  sheng: string;
  shi: string;
  name: string;
  weather1: string;
  weather2: string;
  wd1: string;
  wd2: string;
  winddirection1: string;
  winddirection2: string;
  windleve1: string;
  windleve2: string;
  weather1img: string;
  weather2img: string;
  lon: string;
  lat: string;
  uptime: string;
  nowinfo: {
    precipitation: string;
    temperature: string;
    pressure: string;
    humidity: string;
    windDirection: string;
    windDirectionDegree: string;
    windSpeed: string;
    windScale: string;
    feelst: string;
    uptime: string;
  };
  alarm: Array<{
    id: string;
    title: string;
    signaltype: string;
    signallevel: string;
    effective: string;
    eventType: string;
    severity: string;
    type: string;
  }>;
  weatherday2?: any;
  weatherday3?: any;
  weatherday4?: any;
  weatherday5?: any;
  weatherday6?: any;
  weatherday7?: any;
}

export interface Weather15Response {
  code: number;
  msg: string;
  place: string;
  data: Array<{
    week1: string;
    week2: string;
    wea1: string;
    wea2: string;
    wendu1: string;
    wendu2: string;
    img1: string;
    img2: string;
  }>;
}

export interface WeatherImageResponse {
  code: number;
  msg: string;
}

export class WeatherAPI {
  constructor(private client: ApihzClient) {}

  async byAddress(sheng?: string, place?: string, day?: number, hourtype?: number, suntimetype?: number): Promise<WeatherResponse> {
    return this.client.get('/api/tianqi/tqyb.php', { sheng, place, day, hourtype, suntimetype });
  }

  async byIP(ip?: string, day?: number, hourtype?: number, suntimetype?: number): Promise<WeatherResponse> {
    return this.client.get('/api/tianqi/tqybip.php', { ip, day, hourtype, suntimetype });
  }

  async byCoords(lon: string, lat: string, day?: number, hourtype?: number, suntimetype?: number): Promise<WeatherResponse> {
    return this.client.get('/api/tianqi/tqybjw.php', { lon, lat, day, hourtype, suntimetype });
  }

  async moji15(sheng: string, place: string): Promise<Weather15Response> {
    return this.client.get('/api/tianqi/tqybmoji15.php', { sheng, place });
  }

  async cloud(): Promise<WeatherImageResponse> {
    return this.client.get('/api/tianqi/wxyt.php');
  }

  async precipitation(): Promise<WeatherImageResponse> {
    return this.client.get('/api/tianqi/jsl.php');
  }

  async tempAnomaly(): Promise<WeatherImageResponse> {
    return this.client.get('/api/tianqi/qwt.php');
  }

  async humidity(): Promise<WeatherImageResponse> {
    return this.client.get('/api/tianqi/trsd.php');
  }

  async tengxun7day(province: string, city: string, county?: string): Promise<any> {
    return this.client.get('/api/tianqi/tengxun.php', { province, city, county });
  }

  async moji15IP(ip?: string): Promise<Weather15Response> {
    return this.client.get('/api/tianqi/tqybmoji15ip.php', { ip });
  }

  async precipitationForecast(time: number): Promise<WeatherImageResponse> {
    return this.client.get('/api/tianqi/jslyb.php', { time });
  }

  async alarmDetail(number: string): Promise<any> {
    return this.client.get('/api/tianqi/yj.php', { number });
  }

  async foreignCity6day(city: string): Promise<any> {
    return this.client.get('/api/tianqi/tqybun.php', { city });
  }

  async historyWeather(sheng: string, place: string, y: number, m: number, d?: number): Promise<any> {
    return this.client.get('/api/tianqi/oldtqyb.php', { sheng, place, y, m, d });
  }

  async global1day(lon: string, lat: string): Promise<any> {
    return this.client.get('/api/tianqi/tqybjw1.php', { lon, lat });
  }

  async global5day(lon: string, lat: string): Promise<any> {
    return this.client.get('/api/tianqi/tqybjw5.php', { lon, lat });
  }
}
