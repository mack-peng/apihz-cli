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

  async guwen(type: number, number: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/guwen.php', { type, number });
  }

  async poetry(words: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/poetry.php', { words, page });
  }

  async dream(word: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/mingli/zhougong.php', { word, page });
  }

  async dictionary(word: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/danci.php', { word });
  }

  async aggregateTranslate(words: string, type?: number): Promise<{ code: number; msg: string; words: string }> {
    return this.client.get('/api/zici/fanyi.php', { words, type });
  }

  async similarity(words1: string, words2: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/xiangsi.php', { words1, words2 });
  }

  async dedup(words: string, type?: number): Promise<{ code: number; msg: string; words: string }> {
    return this.client.get('/api/zici/quchong.php', { words, type });
  }

  async stats(words: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/zishu.php', { words });
  }

  async textSize(words: string): Promise<{ code: number; size: number; length: number; msg: string }> {
    return this.client.get('/api/zici/size.php', { words });
  }

  async tongueTwister(): Promise<{ code: number; name: string; content: string; msg: string }> {
    return this.client.get('/api/zici/raokouling.php');
  }

  async proverb(): Promise<{ code: number; saying: string; content: string; msg: string }> {
    return this.client.get('/api/zici/yanyu.php');
  }

  async couplet(words: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/duilian.php', { words, page });
  }

  async randomName(xing?: string): Promise<{ code: number; msg: string; name: string; xing: string; ming: string; sex: string }> {
    return this.client.get('/api/zici/baijiaming.php', { xing });
  }

  async randomEnglishName(sex?: number): Promise<{ code: number; msg: string; name: string; xing: string; ming: string; sex: string }> {
    return this.client.get('/api/zici/enname.php', { sex });
  }

  async poet(name: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/poet.php', { name, page });
  }

  async abbreviation(words: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/abbr.php', { words, page });
  }

  async wordForm(word: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/zuci.php', { word, page });
  }

  async synonymAntonym(words: string): Promise<{ code: number; jyc: string; fyc: string; cj: string; msg: string }> {
    return this.client.get('/api/zici/jfc.php', { words });
  }

  async surname(xing?: string, type?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/baijiaxing.php', { xing, type });
  }

  async brainTeaser(): Promise<{ code: number; title: string; daan: string; msg: string }> {
    return this.client.get('/api/zici/jizhuanwan.php');
  }

  async riddle(): Promise<{ code: number; type: string; mimian: string; tishi: string; midi: string; msg: string }> {
    return this.client.get('/api/zici/miyu.php');
  }

  async sensitiveWords(words: string, replacetype?: number, mgctype?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/mgc.php', { words, replacetype, mgctype });
  }

  async sensitiveWordsCustom(words: string, replacetype?: number, mgctype?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/mgc2.php', { words, replacetype, mgctype });
  }

  async wordSegment(words: string, type?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/fenci.php', { words, type });
  }

  async crazyThursday(): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/zici/fkxqs.php');
  }

  async baiduSuggest(words: string, ck?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/wangzhan/soubaiduxl.php', { words, ck });
  }

  async baiduRelated(words: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/wangzhan/soubaiduxg.php', { words });
  }

  async baiduSearch(words: string, tn?: string, page?: number, ck?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/wangzhan/soubaidu.php', { words, tn, page, ck });
  }

  async contentWangyi(url: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/wangyi.php', { url });
  }

  async contentBaijiahao(url: string, ck: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/baijiahao.php', { url, ck });
  }

  async contentXiaohongshu(url: string, hctype?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/xiaohongshu.php', { url, hctype });
  }

  async contentToutiao(idorurl: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/toutiao.php', { idorurl });
  }

  async contentSina(url: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/sina.php', { url });
  }

  async contentTencent(url: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/tengxun.php', { url });
  }

  async contentWechat(url: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/wx.php', { url });
  }

  async contentPhpzww(url: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/caiji/phpzww.php', { url });
  }
}
