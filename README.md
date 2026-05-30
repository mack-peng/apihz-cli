# apihz-cli

Command-line interface for [apihz.cn](https://www.apihz.cn/) — 接口盒子, 479+ APIs at your terminal.

[![npm version](https://img.shields.io/npm/v/@orangemust/apihz-cli.svg)](https://www.npmjs.com/package/@orangemust/apihz-cli)

---

## Installation

### For Humans

Copy and paste this prompt to your LLM agent (Claude Code, Cursor, Codex, etc.):

```text
Install and configure apihz-cli by following the instructions here:
https://raw.githubusercontent.com/mack-peng/apihz-cli/main/docs/guide/installation.md
```

Or read the [Installation Guide](docs/guide/installation.md), but seriously, let an agent do it. Humans fat-finger configs.

### For LLM Agents

Fetch the installation guide and follow it:

```bash
curl -s https://raw.githubusercontent.com/mack-peng/apihz-cli/main/docs/guide/installation.md
```

---

## Quick Start

### Install

```bash
npm install -g @orangemust/apihz-cli

# Or run without installing:
# npx @orangemust/apihz-cli time now
```

### 1. Get API Credentials

Register at [apihz.cn](https://www.apihz.cn/) to get your Developer ID and KEY (User Center → 开发信息).

### 2. Configure

```bash
apihz-cli config set --id=10016043 --key=xxxxxxxx
```

### 3. Try It

```bash
apihz-cli time now --type=20
apihz-cli ip lookup
apihz-cli text yiyan
apihz-cli news baidu
```

---

## Configuration

```bash
# Save credentials
apihz-cli config set --id=<id> --key=<key>

# Enable VIP line
apihz-cli config set --vip

# Show current config (key masked)
apihz-cli config show

# Get a specific value
apihz-cli config get id

# Clear all
apihz-cli config reset

# Config file path
apihz-cli config path
```

**Priority**: CLI flags > Environment variables > Config file (`~/.apihz/config.json`)

| Env | Usage |
|-----|-------|
| `APIHZ_ID` | Developer ID |
| `APIHZ_KEY` | Developer KEY |
| `APIHZ_VIP` | Set to `1` for VIP line |

---

## Global Options

```
--id <id>    Developer ID (overrides config and env)
--key <key>  Developer KEY (overrides config and env)
--vip        Use VIP line (https://vip.apihz.cn)
--raw        Compact JSON output (no indentation)
```

---

## Commands

### Time (时间)

```bash
apihz-cli time now --type=20           # Current time + lunar + zodiac
apihz-cli time to-timestamp --time="2024-03-20 16:16:16"
apihz-cli time from-timestamp --time=1710925735 --type=1
apihz-cli time calendar                 # Full calendar: solar/lunar/festival
apihz-cli time country --country=US    # Country timezone info
```

### Weather (天气)

```bash
apihz-cli weather by-address --place=绵阳 --sheng=四川 --day=3
apihz-cli weather by-ip --day=1 --hourtype=1
apihz-cli weather by-coords --lon=116.30 --lat=40.05
apihz-cli weather moji15 --sheng=四川 --place=绵阳
apihz-cli weather cloud                  # Satellite cloud map
apihz-cli weather precipitation          # Precipitation anomaly chart
apihz-cli weather temp-anomaly           # Temperature anomaly chart
apihz-cli weather humidity               # Soil humidity chart
apihz-cli weather tengxun7day --province=四川 --city=绵阳
apihz-cli weather moji15-ip --ip=49.234.56.79
apihz-cli weather global1day --lon=116.30 --lat=40.05
apihz-cli weather history --sheng=四川 --place=绵阳 --y=2025 --m=6 --d=1
```

### IP & Location (位置坐标)

```bash
apihz-cli ip lookup                      # Your IP geolocation
apihz-cli ip lookup --ip=112.192.49.243
apihz-cli ip visitor                     # IP + browser + OS
apihz-cli phone lookup --phone=13219931963
apihz-cli phone segment --numbers=1321993  # Phone prefix lookup
apihz-cli region list --type=1           # Provinces list
apihz-cli region list --type=2 --sheng=四川  # Cities
apihz-cli region code --sheng=四川 --place=绵阳  # Region code + coords
apihz-cli region country                 # All countries info
apihz-cli idcard lookup --card=510704888888888888
apihz-cli geo reverse --lon=116.30 --lat=40.05  # Coords → address
apihz-cli geo address --address="四川省绵阳市"    # Address → coords
apihz-cli geo nearby --lon=116.30 --lat=40.05    # Nearby places
apihz-cli plate lookup --words="川B"             # License plate lookup
```

### Image (图像)

```bash
apihz-cli image memes --words=开心 --source=apihz
apihz-cli image search --words=风景 --source=baidu
apihz-cli image wallpaper --type=1        # 0=rand 1=general 2=beauty
apihz-cli image avatar --type=5           # 0-16 categories (anime etc.)
apihz-cli image bing                      # Bing daily wallpaper
apihz-cli image nasa --hd                 # NASA astronomy picture
apihz-cli image compress --img=<url> --quality=80  # Image compress/convert
apihz-cli image food --words=牛奶         # Food compatibility
```

### Text & Dictionary (字词句名)

```bash
apihz-cli text translate --words="你好" --from=2 --to=1
apihz-cli text yiyan                      # Random quote (120k library)
apihz-cli text yiyan-search --words=人生
apihz-cli text pinyin --words="接口盒子"
apihz-cli text hanzi --word=天            # Character lookup
apihz-cli text ciyu --words=宇宙          # Word lookup
apihz-cli text baike --words=北京         # Baidu encyclopedia
apihz-cli text nick --min=2 --max=6       # Random nickname
apihz-cli text case --type=1 --words="hello"  # Case convert
apihz-cli text jfzh --type=1 --words="接口盒子"  # Simplified↔Traditional
apihz-cli text today                      # Today in history
apihz-cli text joke                       # Random joke (200k)
apihz-cli text dream --word=鱼            # Dream interpretation
apihz-cli text poetry --words="李白"       # Ancient poetry
apihz-cli text proverb                    # Random proverb
apihz-cli text couplet --words="春风"      # Chinese couplet
apihz-cli text random-name                # Random Chinese name
apihz-cli text riddle                     # Random riddle
apihz-cli text brain-teaser               # Random brain teaser
apihz-cli text kfc                        # Crazy Thursday文案
apihz-cli text baidu-search --words="接口盒子"
```

### Idioms (成语)

```bash
apihz-cli chengyu random                  # Random idiom (30k)
apihz-cli chengyu chain --word=天         # Idiom starting with 天
apihz-cli chengyu lookup --words=焕然一新
```

### QR Code (二维码)

```bash
apihz-cli qrcode create --text="hello"    # Generate QR code
apihz-cli qrcode parse --type=1 --img=<url>  # Parse QR code
apihz-cli qrcode parse-plus --type=1 --img=<url>  # Advanced parse
```

### News (新闻热点)

```bash
apihz-cli news baidu
apihz-cli news weibo
apihz-cli news douyin
apihz-cli news toutiao                     # Toutiao hot list
apihz-cli news weibo-entertainment          # Weibo entertainment
apihz-cli news weibo-rising                 # Weibo rising topics
apihz-cli news baidu-meme                   # Baidu hot memes
apihz-cli news temperature-rank             # National temp ranking
```

### Network (域名网站)

```bash
apihz-cli network icp --domain=apihz.cn
apihz-cli network icp-plus --domain=apihz.cn
apihz-cli network domain --domain=example.com
apihz-cli network tdk --url=https://www.apihz.cn
apihz-cli network seo --domain=baidu.com           # SEO comprehensive info
apihz-cli network whois --domain=example.com       # WHOIS lookup
apihz-cli network tcp-port --host=apihz.cn         # TCP port check
apihz-cli network ping --host=apihz.cn             # Ping test
apihz-cli network short-url-create --url=<url>      # Short URL
apihz-cli network screenshot --url=<url>            # PAID: webpage screenshot
```

### AI Recognition (AI识别) — PAID

```bash
apihz-cli ai face-compare --type=1 --imga=<url1> --imgb=<url2>
apihz-cli ai face-liveness --type=1 --img=<url>
apihz-cli ai face-attr --type=1 --img=<url> --mode=1
apihz-cli ai ocr --type=1 --img=<url>
apihz-cli ai idcard --type=1 --img=<url>
apihz-cli ai bankcard --type=1 --img=<url>
apihz-cli ai driving-license --type=1 --img=<url>
apihz-cli ai vehicle-license --type=1 --img=<url> --page=1
apihz-cli ai business-license --type=1 --img=<url>
apihz-cli ai receipt --type=1 --img=<url>
apihz-cli ai plate --type=1 --img=<url>      # License plate
apihz-cli ai vehicle --type=1 --img=<url>    # Vehicle make/model
apihz-cli ai product --type=1 --img=<url>    # Product recognition
apihz-cli ai tag --type=1 --img=<url>        # Image tags
apihz-cli ai light-ocr --img=<url>           # Lightweight OCR
apihz-cli ai chat-light --text="你好" --to=1  # Light AI chat
apihz-cli ai chat-hunyuan --text="你好"       # Tencent Hunyuan
```
```

### Voice (语音) — PAID

```bash
apihz-cli voice to-text --type=1 --data=<url> --format=wav
apihz-cli voice to-voice --text="你好" --type=1 --voice=1001
```

### Auth (实名认证) — PAID

```bash
apihz-cli auth bank3 --name=张三 --number=6222... --idcard=5107...
apihz-cli auth bank2 --name=张三 --number=6222...
apihz-cli auth alipay --name=张三 --number=5107...
apihz-cli auth alipay-check --cxid=xxxx
```

### Storage (存储)

```bash
apihz-cli storage text --type=2 --numid=1           # Read entry
apihz-cli storage text --type=1 --numid=1 --words="hello" --title="test"
apihz-cli storage data-create --name=data1,data2 --data="val1","val2"
apihz-cli storage data-query --name=* --page=1 --limit=10
apihz-cli storage data-update --id=<rid> --name=data1 --data="new_val"
apihz-cli storage data-delete --tj="data1<>'张三'"
```

### SMS (短信)

```bash
apihz-cli sms send --phone=13219931963
apihz-cli sms send-verify --type=1 --phone=13219931963
apihz-cli sms send-verify --type=2 --phone=13219931963 --code=123456
apihz-cli sms send-aliyun --phone=13219931963 --aliid=... --alikey=... --sign=... --template=... --code=123456
apihz-cli sms query-status --qid=<query_id>     # Check SMS delivery
```

### Unit Conversion (单位换算)

```bash
apihz-cli unit speed --num=100 --unit=米秒
apihz-cli unit time --num=3600 --unit=秒
apihz-cli unit density --num=1 --unit=千克立方米
apihz-cli unit frequency --num=1000 --unit=赫兹
apihz-cli unit current --num=5 --unit=安培
apihz-cli unit voltage --num=220 --unit=伏特
apihz-cli unit resistance --num=1000 --unit=欧姆
```

### Unit Conversion (单位换算)

```bash
apihz-cli unit speed --num=100 --unit=米秒
apihz-cli unit time --num=3600 --unit=秒
apihz-cli unit density --num=1 --unit=千克立方米
apihz-cli unit frequency --num=1000 --unit=赫兹
apihz-cli unit current --num=5 --unit=安培
apihz-cli unit voltage --num=220 --unit=伏特
apihz-cli unit resistance --num=1000 --unit=欧姆
apihz-cli unit length --num=1000 --unit=米
apihz-cli unit temperature --num=100 --unit=摄氏度
apihz-cli unit storage --num=1024 --unit=MB
apihz-cli unit power --num=1 --unit=瓦特
apihz-cli unit force --num=1 --unit=牛顿
apihz-cli unit illuminance --num=1000 --unit=勒克斯
```

### Encryption (加密解密)

```bash
apihz-cli pwd md5 --words="hello"               # MD5 hash
apihz-cli pwd base64-encode --words="hello"     # BASE64 encode
apihz-cli pwd base64-decode --words="aGVsbG8="  # BASE64 decode
apihz-cli pwd authcode-encrypt --words="hello" --pwd=secret
apihz-cli pwd authcode-decrypt --words="..." --pwd=secret
apihz-cli pwd des-encrypt --words="hello" --pwd=secret
apihz-cli pwd des-decrypt --words="..." --pwd=secret
apihz-cli pwd rc4-encrypt --words="hello" --pwd=secret
apihz-cli pwd rc4-decrypt --words="..." --pwd=secret
apihz-cli pwd morse --type=1 --words="SOS"
apihz-cli pwd url-encode --words="你好世界"
apihz-cli pwd url-decode --words="%E4%BD%A0%E5%A5%BD"
apihz-cli pwd hex-encode --words="hello"
apihz-cli pwd hex-decode --words="68656c6c6f"
```

### Transport (交通物流)

```bash
apihz-cli transport train-remain --add=绵阳 --end=成都 --y=2025 --m=6 --d=10
apihz-cli transport train-transfer --add=绵阳 --end=成都 --y=2025 --m=6 --d=10
apihz-cli transport train-published-price --add=绵阳 --end=成都 --y=2025 --m=6 --d=10
apihz-cli transport train-stops --train=G3286
apihz-cli transport bus-route --starlon=121.42 --starlat=31.20 --endlon=121.31 --endlat=31.19
apihz-cli transport bus-line-info --uuid=<line_uuid>
apihz-cli transport navigation --starlon=121.42 --starlat=31.20 --endlon=121.31 --endlat=31.19
apihz-cli transport express --number=98069508...
```

### Bilibili & Entertainment (B站/视频)

```bash
apihz-cli bilibili ranking                       # B站综合排行榜
apihz-cli bilibili live-categories               # 直播分区列表
apihz-cli bilibili live-anchors                  # 人气主播榜单
apihz-cli bilibili video-info --url=<bilibili_url>
apihz-cli bilibili user-info --buid=<mid>
apihz-cli bilibili live-url --room=<roomid>
apihz-cli bilibili live-rooms --zid=<zone_id>
apihz-cli bilibili maoyan-movie                  # 猫眼电影票房
apihz-cli bilibili maoyan-tv                     # 猫眼电视剧
apihz-cli bilibili baidu-movie                   # 百度电影榜
apihz-cli bilibili random-video                  # 随机小姐姐视频
```

### Calendar & Fortune (日历命理)

```bash
apihz-cli calendar day-detail --nian=2025 --yue=6 --ri=1 --type=1
apihz-cli calendar today-detail                   # 今日12时辰详情
apihz-cli calendar today-luck                     # 今日吉凶宜忌
apihz-cli calendar day-luck --nian=2025 --yue=6 --ri=1
apihz-cli calendar day-info --nian=2025 --yue=6 --ri=1
apihz-cli calendar elapsed                        # 已过/剩余时间
apihz-cli calendar mbti --type=1 --version=1      # MBTI测试
apihz-cli calendar zhuge --words="问前程"          # 诸葛测字
apihz-cli calendar zhuge-qian                     # 诸葛神签
apihz-cli calendar guanyin                        # 观音灵签
apihz-cli calendar yuelao                         # 月老灵签
apihz-cli calendar guandi                         # 关帝灵签
```

### Finance (金融彩票)

```bash
apihz-cli finance exchange-rate --from=USD --to=CNY --money=100
apihz-cli finance gold-price                      # 上海金交所延时行情
apihz-cli finance gold-history --y=2025 --m=6 --d=1
apihz-cli finance baidu-finance                   # 百度财经榜
apihz-cli finance baidu-index --words="接口盒子"    # 百度指数
apihz-cli finance lottery-daletou                  # 大乐透
apihz-cli finance lottery-3d                       # 福彩3D
apihz-cli finance lottery-pl5                      # 排列5
apihz-cli finance lottery-pl3                      # 排列3
apihz-cli finance lottery-qxc                      # 七星彩
apihz-cli finance lottery-qlc                      # 七乐彩
apihz-cli finance lottery-kl8                      # 快乐8
```

### Earthquake (地震)

```bash
apihz-cli earthquake latest                       # 全球最新地震
apihz-cli earthquake report --year=2025 --month=6 --day=1
apihz-cli earthquake history --year=2025 --month=6 --day=1
```

### Airport (机场)

```bash
apihz-cli airport search --word=北京
apihz-cli airport codes                          # 国内机场代码大全
```

### Hardware (硬件排行)

```bash
apihz-cli hardware laptop-gpu                     # 笔记本显卡天梯
apihz-cli hardware desktop-gpu                    # 桌面显卡天梯
```

### Misc (杂项)

```bash
apihz-cli misc jiakao --type=1               # Driving test questions
apihz-cli misc qq --qq=10001
apihz-cli misc lottery                       # Lottery results
apihz-cli misc lanzou --url=<share_link> --pwd=6pvs
apihz-cli misc phone-status --number=13219931963   # PAID
apihz-cli misc phone-online --number=13219931963   # PAID
apihz-cli misc bank-info --number=6222...          # PAID
apihz-cli misc chem-eq --reactants=H2,O2 --products=H2O
apihz-cli misc element --name=H                    # Periodic table
apihz-cli misc mail --name=... --to=... --title=... --text=... (etc.)
apihz-cli misc proxy --type=1                      # PAID
apihz-cli misc redpack --zfb=account --name=张三   # PAID
apihz-cli misc uuid                                # Generate UUID
apihz-cli misc calc --formula="1+2*3"
apihz-cli misc sec-to-time --seconds=86400
apihz-cli misc time-diff --time1=1700000000 --time2=1700086400
```

---

## Development

```bash
npm install
npm run build
npm run watch
```

## License

MIT
