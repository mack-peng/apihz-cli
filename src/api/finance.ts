import { ApihzClient } from '../utils/http';

export interface ExchangeRateResponse {
  code: number;
  msg: string;
  uptime: string;
  money: string;
  from: string;
  to: string;
  result: number;
  rate: number;
  data: Array<{
    code?: string;
    name?: string;
    en?: string;
  }>;
}

export interface GoldPriceResponse {
  code: number;
  msg: string;
  date: string;
  data: Array<{
    '合约': string;
    '最新价': string;
    '最高价': string;
    '最低价': string;
    '开盘价': string;
  }>;
}

export interface GoldHistoryResponse {
  code: number;
  msg: string;
  data: Array<{
    '日期': string;
    '合约': string;
    '开盘价': string;
    '最高价': string;
    '最低价': string;
    '收盘价': string;
    '涨跌': string;
    '涨跌幅': string;
    '加权平均价': string;
    '成交量': string;
    '成交金额': string;
    '市场持仓': string;
    '交收方向': string;
    '交收量': string;
  }>;
}

export interface BaiduFinanceResponse {
  code: number;
  msg: string;
  time: number;
  time2: string;
  data: Array<{
    query: string;
    word: string;
    desc: string;
    hotChange: string;
    hotScore: string;
    hotTag: string;
    img: string;
    index: number;
    rawUrl: string;
    url: string;
    appUrl: string;
    show: any[];
  }>;
}

export interface BaiduIndexResponse {
  code: number;
  msg: string;
  words: string;
  all: {
    avg: number;
    yoy: number;
    qoq: number;
  };
  pc: {
    avg: number;
    yoy: number;
    qoq: number;
  };
  wise: {
    avg: number;
    yoy: number;
    qoq: number;
  };
}

export interface LotteryResponse {
  code: number;
  msg: string;
  number: string;
  number1?: string;
  number2?: string;
  qihao: string;
  time: string;
  name: string;
  xiaoshou: string;
  jiangchi?: string;
  endtime?: string;
  [key: string]: any;
}

export class FinanceAPI {
  constructor(private client: ApihzClient) {}

  async exchangeRate(from?: string, to?: string, money?: string): Promise<ExchangeRateResponse> {
    return this.client.get('/api/jinrong/huilv.php', { from, to, money });
  }

  async goldPrice(): Promise<GoldPriceResponse> {
    return this.client.get('/api/jinrong/goldshnew.php');
  }

  async goldHistory(y: string, m: string, d: string): Promise<GoldHistoryResponse> {
    return this.client.get('/api/jinrong/goldshold.php', { y, m, d });
  }

  async baiduFinance(): Promise<BaiduFinanceResponse> {
    return this.client.get('/api/xinwen/baiducj.php');
  }

  async baiduIndex(words: string): Promise<BaiduIndexResponse> {
    return this.client.get('/api/wangzhan/bdzs.php', { words });
  }

  async daletou(qh?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/daletou.php', { qh });
  }

  async fucai3d(qh?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/fucai3d.php', { qh });
  }

  async pailie5(qh?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/pailie5.php', { qh });
  }

  async pailie3(qhid?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/pailie3.php', { qhid });
  }

  async qixingcai(qhid?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/qixingcai.php', { qhid });
  }

  async qilecai(qhid?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/qilecai.php', { qhid });
  }

  async kuaile8(qhid?: string): Promise<LotteryResponse> {
    return this.client.get('/api/caipiao/kuaile8.php', { qhid });
  }
}
