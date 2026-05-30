import { ApihzClient } from '../utils/http';

export interface FaceCompareResponse {
  code: number;
  msg: string;
}

export interface FaceAttrResponse {
  code: number;
  msg: string;
  face: string;
  Age: string;
  Beauty: string;
  Emotion: string;
  Gender: string;
}

export interface OcrResponse {
  code: number;
  msg: string;
}

export interface IdCardResponse {
  code: number;
  msg: string;
  name: string;
  address: string;
  birth: string;
  nation: string;
  sex: string;
  idnum: string;
  authority: string;
  validdate: string;
  advancedInfo: any;
}

export interface BankCardResponse {
  code: number;
  msg: string;
  bankinfo: string;
  cardname: string;
  cardno: string;
  cardtype: string;
  validdate: string;
}

export interface LicenseResponse {
  code: number;
  msg: string;
}

export interface VehicleResponse {
  code: number;
  msg: string;
}

export interface ProductResponse {
  code: number;
  msg: string;
}

export class AiAPI {
  constructor(private client: ApihzClient) {}

  async faceCompare(type: number, imga: string, imgb: string): Promise<FaceCompareResponse> {
    return this.client.get('/api/ai/facebd.php', { type, imga, imgb });
  }

  async faceLiveness(type: number, img: string): Promise<FaceCompareResponse> {
    return this.client.get('/api/ai/faceht.php', { type, img });
  }

  async faceAttr(type: number, img: string, sxtype: number): Promise<FaceAttrResponse> {
    return this.client.get('/api/ai/facesx.php', { type, img, sxtype });
  }

  async ocr(type: number, img: string, ljf?: string): Promise<OcrResponse> {
    return this.client.get('/api/ai/shituwen.php', { type, img, ljf });
  }

  async idCard(type: number, img: string): Promise<IdCardResponse> {
    return this.client.get('/api/ai/shenfenzheng.php', { type, img });
  }

  async bankCard(type: number, img: string): Promise<BankCardResponse> {
    return this.client.get('/api/ai/yinhangka.php', { type, img });
  }

  async drivingLicense(type: number, img: string): Promise<LicenseResponse> {
    return this.client.get('/api/ai/jiashizheng.php', { type, img });
  }

  async vehicleLicense(type: number, img: string, class_: number): Promise<LicenseResponse> {
    return this.client.get('/api/ai/xingshizheng.php', { type, img, class: class_ });
  }

  async businessLicense(type: number, img: string): Promise<LicenseResponse> {
    return this.client.get('/api/ai/yingyezhizhao.php', { type, img });
  }

  async receipt(type: number, img: string): Promise<LicenseResponse> {
    return this.client.get('/api/ai/piaodan.php', { type, img });
  }

  async plate(type: number, img: string): Promise<LicenseResponse> {
    return this.client.get('/api/ai/chepai.php', { type, img });
  }

  async vehicle(type: number, img: string): Promise<VehicleResponse> {
    return this.client.get('/api/ai/cheliang.php', { type, img });
  }

  async product(type: number, img: string): Promise<ProductResponse> {
    return this.client.get('/api/ai/shangpin.php', { type, img });
  }

  async tag(type: number, img: string): Promise<ProductResponse> {
    return this.client.get('/api/ai/biaoqian.php', { type, img });
  }

  async lightOcr(img: string, lan?: string, type?: number, threshold?: number, psm?: number): Promise<OcrResponse> {
    return this.client.get('/api/ocr/apihzocr.php', { img, lan, type, threshold, psm });
  }

  async idCardVerify(name: string, number: string): Promise<{ code: number; msg: string; errocode?: string }> {
    return this.client.get('/api/shiming/idcard.php', { name, number });
  }

  async lightAi(words: string, sid?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/apihzlfm.php', { words, sid });
  }

  async hunyuan(words: string, hykey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/hunyuanlite.php', { words, hykey });
  }

  async zhipuGlm(words: string, zpkey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/zpflash.php', { words, zpkey });
  }

  async wenxin(words: string, bdkey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/wxyy35.php', { words, bdkey });
  }

  async wenxin2(words: string, bdkey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/wxtiny.php', { words, bdkey });
  }

  async wenxin3(words: string, bdkey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/wxspeed.php', { words, bdkey });
  }

  async wenxin4(words: string, bdkey?: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/wxlite.php', { words, bdkey });
  }

  async xunfei(words: string): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/ai/xinghuolite.php', { words });
  }

  async wxFaceQuery1(cxid: string, type: number): Promise<{ code: number; msg: string; idcard?: string; name?: string }> {
    return this.client.get('/api/shiming/wxface1q.php', { cxid, type });
  }

  async wxFaceQuery2(cxid: string, type: number): Promise<{ code: number; msg: string; idcard?: string; name?: string }> {
    return this.client.get('/api/shiming/wxface2q.php', { cxid, type });
  }

  async imgSearch1(img: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/shitu/ytst1.php', { img, page });
  }

  async imgSearch2(img: string, page?: number): Promise<{ code: number; msg: string }> {
    return this.client.get('/api/shitu/ytst2.php', { img, page });
  }
}
