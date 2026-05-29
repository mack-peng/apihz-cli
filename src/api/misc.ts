import { ApihzClient } from '../utils/http';

export interface JiakaoResponse {
  code: number;
  type: string;
  subtype: string;
  title: string;
  pic: string;
  opta: string;
  optb: string;
  optc: string;
  optd: string;
  answer: string;
  jtsl: string;
  jtjq: string;
  jttp: string;
}

export interface QqResponse {
  code: number;
  qq: string;
  head: string;
  Level: string;
  Name: string;
  NetworkDay: string;
  iVip: string;
  iSVip: string;
  iPCQQOnline: string;
}

export interface CaipiaoResponse {
  code: number;
  number: string;
  number1: string;
  qihao: string;
  time: string;
  no1num: string;
  no1money: string;
  no2num: string;
  no2money: string;
  no3num: string;
  no3money: string;
  no4num: string;
  no4money: string;
  no5num: string;
  no5money: string;
  no6num: string;
  no6money: string;
  name: string;
  xiaoshou: string;
  jiangchi: string;
  no1msg: string;
}

export interface LanzouResponse {
  code: number;
  msg: string;
  name: string;
  filesize: string;
  downurl: string;
}

export interface PhoneStatusResponse {
  code: number;
  msg: string;
  type: number;
}

export interface PhoneOnlineResponse {
  code: number;
  msg: string;
  time: string;
}

export interface BankInfoResponse {
  code: number;
  msg: string;
  bank: string;
  type: number;
}

export interface ChemResponse {
  code: number;
  fcs: string;
  fcsall: string;
  left: string;
  right: string;
  reactant: string[];
  product: string[];
}

export interface ElementResponse {
  code: number;
  id: number;
  zwmc: string;
  ysfh: string;
  ywmc: string;
  yzzl: string;
  yzbj: string;
  dzgx: string;
}

export interface MailResponse {
  code: number;
  msg: string;
}

export interface ProxyResponse {
  code: number;
  msg: string;
  ip: string;
  port: string;
  prov: string;
  city: string;
}

export interface RedpackResponse {
  code: number;
  msg: string;
  order: string;
  time: string;
  money: string;
}

export class MiscAPI {
  constructor(private client: ApihzClient) {}

  async jiakao(type: number): Promise<JiakaoResponse> {
    return this.client.get('/api/jiaotong/jiakao.php', { type });
  }

  async qq(qq: string, ckqq?: string, skey?: string, pskey?: string): Promise<QqResponse> {
    return this.client.get('/api/other/qq.php', { qq, ckqq, skey, pskey });
  }

  async shuangseqiu(qh?: string): Promise<CaipiaoResponse> {
    return this.client.get('/api/caipiao/shuangseqiu.php', { qh });
  }

  async lanzou(url: string, pwd?: string, type?: number, outtype?: number): Promise<LanzouResponse> {
    return this.client.get('/api/ziyuan/lanzou.php', { url, pwd, type, outtype });
  }

  async phoneStatus(number: string): Promise<PhoneStatusResponse> {
    return this.client.get('/api/other/phonezt.php', { number });
  }

  async phoneOnline(number: string): Promise<PhoneOnlineResponse> {
    return this.client.get('/api/other/phone.php', { number });
  }

  async bankInfo(number: string): Promise<BankInfoResponse> {
    return this.client.get('/api/other/bank.php', { number });
  }

  async chemEq(reactants: string, products: string): Promise<ChemResponse> {
    return this.client.get('/api/other/hxfcs.php', { reactants, products });
  }

  async element(name: string): Promise<ElementResponse> {
    return this.client.get('/api/other/yuansu.php', { name });
  }

  async mail(name: string, tomail: string, title: string, text: string, code: string, port: number, ip: string, secure: string, idmail: string, pwd: string, usermail: string): Promise<MailResponse> {
    return this.client.get('/api/mail/zfapi.php', { name, tomail, title, text, code, port, ip, secure, idmail, pwd, usermail });
  }

  async proxy(type?: number, ip?: string, tjtype?: number): Promise<ProxyResponse> {
    return this.client.get('/api/ip/dlip.php', { type, ip, tjtype });
  }

  async redpack(zfb: string, name: string): Promise<RedpackResponse> {
    return this.client.get('/api/hongbao/zfb.php', { zfb, name });
  }
}
