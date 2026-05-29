# apihz-cli

Command-line interface for [apihz.cn](https://www.apihz.cn/) — 接口盒子, 479+ APIs at your terminal.

[![npm version](https://img.shields.io/npm/v/apihz-cli.svg)](https://www.npmjs.com/package/apihz-cli)

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
npm install -g apihz-cli

# Or run without installing:
# npx apihz-cli time now
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
--raw        Output raw API response without formatting
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
```

### IP & Location (位置坐标)

```bash
apihz-cli ip lookup                      # Your IP geolocation
apihz-cli ip lookup --ip=112.192.49.243
apihz-cli ip visitor                     # IP + browser + OS
apihz-cli phone lookup --phone=13219931963
apihz-cli region list --type=1           # Provinces list
apihz-cli region list --type=2 --sheng=四川  # Cities
apihz-cli region code --sheng=四川 --place=绵阳  # Region code + coords
apihz-cli region country                 # All countries info
apihz-cli idcard lookup --card=510704888888888888
apihz-cli geo reverse --lon=116.30 --lat=40.05  # Coords → address
```

### Image (图像)

```bash
apihz-cli image memes --words=开心 --source=apihz
apihz-cli image search --words=风景 --source=baidu
apihz-cli image wallpaper --type=1        # 0=rand 1=general 2=beauty
apihz-cli image avatar --type=5           # 0-16 categories (anime etc.)
apihz-cli image bing                      # Bing daily wallpaper
apihz-cli image nasa --hd                 # NASA astronomy picture
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
```

### Network (域名网站)

```bash
apihz-cli network icp --domain=apihz.cn
apihz-cli network icp-plus --domain=apihz.cn
apihz-cli network domain --domain=example.com
apihz-cli network tdk --url=https://www.apihz.cn
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
```

### SMS (短信)

```bash
apihz-cli sms send --phone=13219931963
apihz-cli sms send-verify --type=1 --phone=13219931963
apihz-cli sms send-verify --type=2 --phone=13219931963 --code=123456
apihz-cli sms send-aliyun --phone=13219931963 --aliid=... --alikey=... --sign=... --template=... --code=123456
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
