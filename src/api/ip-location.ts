import { ApihzClient } from '../utils/http';

export interface IpLookupResponse {
  code: number;
  msg: string;
  zhou: string;
  zhoucode: string;
  guo: string;
  guocode: string;
  sheng: string;
  shengcode: string;
  shi: string;
  shicode: string;
  qu: string;
  qucode: string;
  isp: string;
  lat: string;
  lon: string;
  ip: string;
  td: string;
}

export interface PhoneLookupResponse {
  code: number;
  msg: string;
  haoduan: string;
  shengfen: string;
  chengshi: string;
  fuwushang: string;
  quhao: string;
  youbian: string;
  qhdm: string;
}

export interface RegionResponse {
  code: number;
  msg: string;
  num: number;
}

export interface RegionCodeResponse {
  code: number;
  msg: string;
  dqdm: string;
  qydm: string;
  province: string;
  city: string;
  district: string;
  lon: string;
  lat: string;
}

export interface CountryResponse {
  code: number;
  msg: string;
  data: any[];
}

export interface IdCardResponse {
  code: number;
  msg: string;
  sheng: string;
  shi: string;
  xian: string;
}

export interface VisitorResponse {
  code: number;
  ip: string;
  browser: string;
  os: string;
}

export interface CoordsResponse {
  code: number;
  msg: string;
  address: string;
  lon: number;
  lat: number;
  nation: string;
  province: string;
  city: string;
  county: string;
  town: string;
  province_code: string;
  city_code: string;
  county_code: string;
  town_code: string;
  address_near: string;
  address_distance: number;
  address_position: string;
  poi: string;
  poi_distance: number;
  poi_position: string;
  road: string;
  road_distance: number;
  hctype: number;
}

export interface PlateNumberResponse {
  code: number;
  msg: string;
  sheng: string;
  shi: string;
  idcode: string;
}

export interface PhoneSegmentResponse {
  code: number;
  msg: string;
  sheng: string;
  shi: string;
  haoduan: string;
  isp: string;
  quhao: string;
  youbian: string;
  qhdm: string;
}

export interface ForeignCoordsResponse {
  code: number;
  msg: string;
  country_eng: string;
  level1_eng: string;
  level2_eng: string;
  level3_eng: string;
  country_chn: string;
  level1_chn: string;
  level2_chn: string;
  level3_chn: string;
  iso_country_code: string;
  lon: string;
  lat: string;
}

export interface RandomCoordsResponse {
  code: number;
  msg: string;
  lat: number;
  lng: number;
}

export interface NearbySearchResponse {
  code: number;
  msg: string;
  count: string;
  allpage: number;
  nowpage: number;
  datas: Array<{
    address: string;
    distance: string;
    provinceCode: string;
    cityCode: string;
    county: string;
    typeName: string;
    source: string;
    lonlat: string;
    typeCode: string;
    countyCode: string;
    province: string;
    poiType: string;
    name: string;
    hotPointID: string;
    stationData: any[];
  }>;
}

export interface AreaCodeResponse {
  code: number;
  msg: string;
  sheng: string;
  shi: string;
  quhao: string;
  youbian: string;
  qhdm: string;
}

export interface AddressToCoordsResponse {
  code: number;
  msg: string;
  lng: string;
  lat: string;
  score: number;
  level: string;
}

export interface MapImageResponse {
  code: number;
  msg: string;
}

export class IpLocationAPI {
  constructor(private client: ApihzClient) {}

  async ipLookup(ip?: string, td?: number): Promise<IpLookupResponse> {
    return this.client.get('/api/ip/chaapi.php', { ip, td });
  }

  async phoneLookup(phone: string): Promise<PhoneLookupResponse> {
    return this.client.get('/api/ip/shouji.php', { phone });
  }

  async region(type: number, sheng?: string, shi?: string, xian?: string, zhen?: string): Promise<RegionResponse> {
    return this.client.get('/api/other/xzqh.php', { type, sheng, shi, xian, zhen });
  }

  async regionCode(sheng: string, place: string): Promise<RegionCodeResponse> {
    return this.client.get('/api/other/xzqhdm.php', { sheng, place });
  }

  async country(): Promise<CountryResponse> {
    return this.client.get('/api/other/country.php');
  }

  async idCard(card: string): Promise<IdCardResponse> {
    return this.client.get('/api/other/card.php', { card });
  }

  async visitor(): Promise<VisitorResponse> {
    return this.client.get('/api/ip/getapi.php');
  }

  async coords(lon: string, lat: string): Promise<CoordsResponse> {
    return this.client.get('/api/other/jwjuhe2.php', { lon, lat });
  }

  async plateNumber(words: string): Promise<PlateNumberResponse> {
    return this.client.get('/api/other/chepai.php', { words });
  }

  async phoneSegment(numbers: string): Promise<PhoneSegmentResponse> {
    return this.client.get('/api/ip/haoduan.php', { numbers });
  }

  async foreignCoords(sheng: string, place: string): Promise<ForeignCoordsResponse> {
    return this.client.get('/api/other/xzqhunzb.php', { sheng, place });
  }

  async randomCoords(city: string, code?: string, type?: number): Promise<RandomCoordsResponse> {
    return this.client.get('/api/ip/sjzb.php', { city, code, type });
  }

  async nearbySearch(words: string, lon: string, lat: string, radius?: number, page?: number, type?: string, show?: number): Promise<NearbySearchResponse> {
    return this.client.get('/api/other/diming.php', { words, lon, lat, radius, page, type, show });
  }

  async areaCode(words: string): Promise<AreaCodeResponse> {
    return this.client.get('/api/ip/quhao.php', { words });
  }

  async addressToCoords(address: string): Promise<AddressToCoordsResponse> {
    return this.client.get('/api/other/jwjuhe.php', { address });
  }

  async mapImage(lng: string, lat: string, zoom?: number, width?: number, height?: number): Promise<MapImageResponse> {
    return this.client.get('/api/other/imgtiandi.php', { lng, lat, zoom, width, height });
  }
}
