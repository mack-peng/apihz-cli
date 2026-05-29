import { ApihzClient } from '../utils/http';

export interface TranslateResponse {
  code: number;
  words: string;
  msg: string;
}

export interface YiyanResponse {
  code: number;
  msg: string;
}

export interface YiyanSearchResponse {
  code: number;
  msg: string;
  ly: string;
}

export interface ChengyuResponse {
  code: number;
  msg: string;
  words: string;
  bushou: string;
  shouzi: string;
  pingyin: string;
  jieshi: string;
  chuchu: string;
  tongyi: string;
  fanyi: string;
  liju: string;
  yinzheng: string;
  yufa: string;
  en: string;
}

export interface HanziResponse {
  code: number;
  msg: string;
  word: string;
  bushou: string;
  bihua: string;
  jianjie: string;
  yindiao: string;
  pinyin: string;
  wubi: string;
  image: string;
  smallimage: string;
  fantizi: string;
  zy: string;
  wuxing: string;
  jg: string;
  fantibihua: string;
  unicode: string;
  zm: string;
  cj: string;
  bishun: string;
  bishunm: string;
  xiefa: string;
  jieshi: string;
}

export interface CiyuResponse {
  code: number;
  msg: string;
  words: string;
  content: string;
  zcpy: string;
  zcpywu: string;
  zczy: string;
  zcszm: string;
  cx: string;
  wljs: string;
}

export interface TextConvertResponse {
  code: number;
  msg: string;
  words: string;
}

export interface NickResponse {
  code: number;
  msg: string;
}

export interface TodayResponse {
  code: number;
  msg: string;
  title: string;
  y: string;
  m: string;
  d: string;
  words: string;
  url: string;
}

export class TextAPI {
  constructor(private client: ApihzClient) {}

  async translate(words: string, ytype: number, etype: number, htype?: number): Promise<TranslateResponse> {
    return this.client.get('/api/zici/fanyiapihz.php', { words, ytype, etype, htype });
  }

  async yiyan(): Promise<YiyanResponse> {
    return this.client.get('/api/yiyan/api.php');
  }

  async yiyanSearch(words: string): Promise<YiyanSearchResponse> {
    return this.client.get('/api/yiyan/ssapi.php', { words });
  }

  async chengyuRand(): Promise<ChengyuResponse> {
    return this.client.get('/api/zici/sjcy.php');
  }

  async chengyuFirst(word: string): Promise<ChengyuResponse> {
    return this.client.get('/api/zici/cyjl.php', { word });
  }

  async chengyuLookup(words: string): Promise<ChengyuResponse> {
    return this.client.get('/api/zici/chacy.php', { words });
  }

  async hanzi(word: string): Promise<HanziResponse> {
    return this.client.get('/api/zici/chazd.php', { word });
  }

  async ciyu(words: string): Promise<CiyuResponse> {
    return this.client.get('/api/zici/chaciyu.php', { words });
  }

  async baike(words: string, ck?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/baikebaidu.php', { words, ck });
  }

  async nick(length1?: number, length2?: number): Promise<NickResponse> {
    return this.client.get('/api/zici/sjwm.php', { length1, length2 });
  }

  async pinyin(words: string, type?: string): Promise<TextConvertResponse> {
    return this.client.get('/api/zici/pinyin.php', { words, type });
  }

  async case_(type: number, words: string): Promise<TextConvertResponse> {
    return this.client.get('/api/zici/daxiao.php', { type, words });
  }

  async jfzh(type: number, words: string): Promise<TextConvertResponse> {
    return this.client.get('/api/zici/jfzh.php', { type, words });
  }

  async today(m?: number, d?: number): Promise<TodayResponse> {
    return this.client.get('/api/zici/today.php', { m, d });
  }

  async joke(): Promise<{ code: number; content: string }> {
    return this.client.get('/api/zici/xiaohua.php');
  }
}
