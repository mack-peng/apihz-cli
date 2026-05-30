# Installation Guide for LLM Agents

You are an AI agent (Claude Code, Codex, Cursor, etc.). This guide is written for you. Do not make the human read it.

## Quick Prompt (for humans to copy-paste)

If a human pasted this to you, follow the instructions below:

> Install and configure `@orangemust/apihz-cli` using the guide at `docs/guide/installation.md`. First check `~/.apihz/config.json` if it exists, then ask me for my apihz.cn Developer ID and KEY (get them from apihz.cn User Center). Verify with `apihz-cli time now --type=20`.

---

## What You're Installing

`@orangemust/apihz-cli` is a CLI for [apihz.cn](https://www.apihz.cn/) (接口盒子), giving you terminal access to 479+ APIs — time, weather, IP geolocation, image search, QR codes, text translation, news, AI recognition, voice, SMS, unit conversion, and more. Free tier: 10 calls/min, unlimited daily.

---

## Step 1: Install the Package

```bash
npm install -g @orangemust/apihz-cli
```

Or run without installing (slower but zero setup):

```bash
npx @orangemust/apihz-cli time now
```

Verify:

```bash
which apihz-cli && apihz-cli --version
```

If `command not found`, your Node.js global bin isn't on `PATH`:

```bash
export PATH="$(npm root -g)/../bin:$PATH"
```

If you get a permission error on macOS/Linux:

```bash
sudo npm install -g @orangemust/apihz-cli
```

---

## Step 2: Check Existing Config

Before creating new credentials, check what's already configured:

```bash
apihz-cli config show
```

If an ID exists and works, skip to verification. Otherwise, configure fresh.

---

## Step 3: Get API Credentials

The human needs to provide two values from their [apihz.cn User Center](https://www.apihz.cn/) (用户中心 → 开发信息):

- **Developer ID** (数字ID) — a numeric string like `10016043`
- **Developer KEY** (通讯秘钥) — a hex string

Ask the human for both, then configure:

```bash
# Basic setup (free tier)
apihz-cli config set --id=<id> --key=<key>

# If the human has a VIP subscription
apihz-cli config set --id=<id> --key=<key> --vip
```

Config is stored at `~/.apihz/config.json`. Override per-command with flags:

```bash
apihz-cli time now --id=<id> --key=<key>
```

---

## Step 4: Verify

```bash
apihz-cli time now --type=20
```

Successful output includes `code: 200` with date, time, lunar calendar, zodiac. `code: 400` means wrong id/key.

```bash
apihz-cli ip lookup
```

Should return your IP geolocation.

---

## All Commands (292 total)

### time — 5 commands
```
apihz-cli time now --type=20                # Get current Beijing time with lunar calendar
apihz-cli time to-timestamp --time="2024-03-20 16:16:16"  # Convert datetime to Unix timestamp
apihz-cli time from-timestamp --time=1710925735  # Convert Unix timestamp to datetime
apihz-cli time calendar                      # Get today full calendar info (solar/lunar/festival/zodiac)
apihz-cli time country --country=US          # Get country time and timezone
```

### weather — 16 commands
```
apihz-cli weather by-address --place=绵阳 --sheng=四川 --day=3  # 1-7 day forecast by city
apihz-cli weather by-ip --day=1              # 1-7 day forecast by IP auto-location
apihz-cli weather by-coords --lon=116.30 --lat=40.05  # 1-7 day forecast by coordinates
apihz-cli weather moji15 --sheng=四川 --place=绵阳  # 15-day forecast (Moji source)
apihz-cli weather cloud                      # Weather satellite cloud map
apihz-cli weather precipitation              # 10-day precipitation anomaly chart
apihz-cli weather temp-anomaly               # 10-day average temperature anomaly chart
apihz-cli weather humidity                   # 10cm soil relative humidity chart
apihz-cli weather tengxun7day --province=四川 --city=绵阳  # 7-day Tencent weather
apihz-cli weather moji15-ip                  # 15-day Moji forecast by IP
apihz-cli weather precip-forecast --time=1   # National precipitation forecast (1-7 days ahead)
apihz-cli weather alarm-detail --number=<id> # Weather alarm detail by alarm ID
apihz-cli weather foreign-city --city=东京   # 6-day foreign city forecast
apihz-cli weather history --sheng=四川 --place=绵阳 --y=2024 --m=6  # Historical weather (2011+)
apihz-cli weather global-1day --lon=116.30 --lat=40.05  # 1-day global forecast by coords
apihz-cli weather global-5day --lon=116.30 --lat=40.05  # 5-day global forecast by coords
```

### ip — 2 commands
```
apihz-cli ip lookup --ip=112.192.49.243      # Query IP geolocation (IPv4/IPv6)
apihz-cli ip visitor                          # Get visitor IP, browser, and OS info
```

### phone — 2 commands
```
apihz-cli phone lookup --phone=13219931963   # Query phone number location
apihz-cli phone segment --numbers=1321993    # Query phone segment (city, carrier, area code)
```

### image — 10 commands
```
apihz-cli image memes --words=开心           # Search memes/emoji packs
apihz-cli image search --words=风景 --source=baidu  # Search images
apihz-cli image wallpaper --type=1           # Random wallpaper
apihz-cli image avatar --type=5              # Random avatar (17 categories)
apihz-cli image bing                          # Bing daily wallpaper
apihz-cli image nasa                          # Random NASA astronomy picture
apihz-cli image food --words=萝卜            # Food compatibility query
apihz-cli image compress --img=<url>         # Compress/convert image
apihz-cli image qq-avatar --num=5            # Random QQ user avatars (10M+)
apihz-cli image ascii --img=<url>            # Convert image to ASCII art
```

### text — 48 commands
```
apihz-cli text translate --words="你好" --from=2 --to=1  # Translate 50+ languages
apihz-cli text yiyan                          # Random quote (120k library)
apihz-cli text yiyan-search --words=奋斗     # Search quotes by keyword
apihz-cli text hanzi --word=天               # Chinese character lookup (20k)
apihz-cli text ciyu --words=宇宙             # Chinese word lookup (380k)
apihz-cli text baike --words=北京            # Baidu Baike search
apihz-cli text nick --min=2 --max=6          # Random nickname (1M library)
apihz-cli text pinyin --words="接口盒子"     # Convert to Pinyin
apihz-cli text case --type=1 --words="hello" # Letter case conversion
apihz-cli text jfzh --type=1 --words="你好" # Simplified/Traditional conversion
apihz-cli text today                          # Historical events on this day
apihz-cli text joke                           # Random joke (200k library)
apihz-cli text guwen --type=1 --number=1     # Classical Chinese texts (19 works)
apihz-cli text poetry --words=李白           # Ancient poetry search (300k)
apihz-cli text dream --word=水               # Zhou Gong dream interpretation
apihz-cli text dict --word=hello             # English dictionary (100k+)
apihz-cli text fanyi --words="hello"         # Aggregate translation (Baidu+Tencent)
apihz-cli text similarity --a="text1" --b="text2"  # Text similarity detection
apihz-cli text dedup --words="a,a,b"         # Text deduplication
apihz-cli text stats --words="hello world"   # Text character statistics
apihz-cli text size --words="hello"          # Text byte size and length
apihz-cli text tongue-twister                # Random tongue twister
apihz-cli text proverb                        # Random proverb/folk saying
apihz-cli text couplet --words=春             # Chinese couplet search
apihz-cli text random-name                    # Random Chinese name (1M)
apihz-cli text random-enname --sex=1         # Random English name
apihz-cli text poet --name=李白              # Poet biography search
apihz-cli text abbr --words=API              # English abbreviation lookup
apihz-cli text zuci --word=天                # Compound word finder
apihz-cli text synonym --words=开心          # Synonyms and antonyms
apihz-cli text surname --xing=张             # Chinese surname encyclopedia (1000+)
apihz-cli text brain-teaser                   # Random brain teaser (50k)
apihz-cli text riddle                          # Random riddle (100k+)
apihz-cli text sensitive --words="text"      # Sensitive word detection (official)
apihz-cli text sensitive-custom --words="text"  # Sensitive word detection (custom)
apihz-cli text segment --words="我爱北京"    # Word segmentation/keyword extraction
apihz-cli text kfc                            # Crazy Thursday meme text
apihz-cli text baidu-suggest --words=天气    # Baidu search suggestions
apihz-cli text baidu-related --words=天气    # Baidu related searches
apihz-cli text baidu-search --words=天气     # Baidu web search
apihz-cli text extract-wangyi --url=<url>    # Extract NetEase article
apihz-cli text extract-baijiahao --url=<url> --ck=<cookie>  # Extract Baijiahao article
apihz-cli text extract-xiaohongshu --url=<url>  # Extract Xiaohongshu article
apihz-cli text extract-toutiao --url=<url>   # Extract Toutiao article
apihz-cli text extract-sina --url=<url>      # Extract Sina article
apihz-cli text extract-tencent --url=<url>   # Extract Tencent News article
apihz-cli text extract-wechat --url=<url>    # Extract WeChat article
apihz-cli text extract-phpzww --url=<url>    # Extract PHP中文网 article
```

### chengyu — 3 commands
```
apihz-cli chengyu random                      # Random idiom (30k library)
apihz-cli chengyu chain --word=天            # Idioms starting with character
apihz-cli chengyu lookup --words=焕然一新    # Idiom definition lookup
```

### news — 11 commands
```
apihz-cli news baidu                          # Baidu hot search ranking
apihz-cli news weibo                          # Weibo hot search ranking
apihz-cli news douyin                         # Douyin hot search ranking
apihz-cli news baidu-hotmeme                  # Baidu hot meme ranking
apihz-cli news baidu-livelihood               # Baidu livelihood ranking
apihz-cli news baidu-novel                    # Baidu novel ranking
apihz-cli news weibo-rising                   # Weibo real-time rising hotspots
apihz-cli news weibo-entertainment            # Weibo entertainment ranking
apihz-cli news toutiao                        # Toutiao hot ranking
apihz-cli news temp-rank                      # National city temperature ranking
apihz-cli news lottery2000                    # SSQ lottery statistics (2000 draws)
```

### network — 29 commands
```
apihz-cli network icp --domain=apihz.cn      # Query ICP filing info
apihz-cli network icp-plus --domain=apihz.cn # ICP filing (stable, offline DB)
apihz-cli network domain --domain=example.com  # Check domain registration
apihz-cli network tdk --url=https://apihz.cn  # Get webpage Title/Description/Keywords
apihz-cli network seo --domain=apihz.cn      # Website SEO info
apihz-cli network baidu-index --domain=apihz.cn  # Baidu indexed page count
apihz-cli network sogou-index --domain=apihz.cn  # Sogou indexed page count
apihz-cli network 360-index --domain=apihz.cn    # 360 indexed page count
apihz-cli network bing-index --domain=apihz.cn   # Bing indexed page count
apihz-cli network aizhan-weight --domain=apihz.cn  # Aizhan website weight
apihz-cli network tcp-port --host=example.com --port=80  # TCP port check
apihz-cli network whois --domain=example.com  # TLD WHOIS info
apihz-cli network whois-all --domain=example.com  # Global WHOIS (1000+ TLDs)
apihz-cli network reverse-dns --ip=8.8.8.8   # Reverse DNS lookup
apihz-cli network domain-3 --hz=cn            # Available 3-char short domains
apihz-cli network letsencrypt --type=1 --domain=example.com  # LetsEncrypt SSL
apihz-cli network ssl-check --domain=example.com  # SSL certificate check
apihz-cli network redirect --url=https://example.com  # Get redirect URL
apihz-cli network extract-links --url=https://example.com  # Extract all links
apihz-cli network text-content --url=https://example.com  # Extract plain text
apihz-cli network http-status --url=https://example.com  # HTTP status code
apihz-cli network screenshot --url=https://example.com  # Webpage screenshot
apihz-cli network ping --host=example.com    # Ping domain/IP
apihz-cli network send-tcp --ip=1.2.3.4 --port=80 --data="GET /"  # Send TCP data
apihz-cli network send-udp --ip=1.2.3.4 --port=80 --data="hello"  # Send UDP data
apihz-cli network wechat-check --url=https://example.com  # WeChat block check
apihz-cli network short-url-query --code=abc --domain=00l.xyz  # Short URL query
apihz-cli network short-url-create --url=https://example.com  # Create short URL
apihz-cli network icp-light --domain=apihz.cn  # ICP filing (lightweight)
```

### qrcode — 3 commands
```
apihz-cli qrcode create --text="hello"       # Generate QR code
apihz-cli qrcode parse --type=1 --img=<url>  # Parse QR code (basic)
apihz-cli qrcode parse-plus --type=1 --img=<url>  # Parse QR/barcode (advanced)
```

### region — 3 commands
```
apihz-cli region list --type=1               # Query admin regions (province→village)
apihz-cli region code --sheng=四川 --place=绵阳  # Region code and coordinates
apihz-cli region country                      # All countries info
```

### idcard — 1 command
```
apihz-cli idcard lookup --card=510704888888888888  # ID card location query
```

### geo — 6 commands
```
apihz-cli geo reverse --lon=116.30 --lat=40.05  # Reverse geocode (coords→address)
apihz-cli geo address --address="北京市海淀区"  # Forward geocode (address→coords)
apihz-cli geo foreign --sheng=加利福尼亚 --place=洛杉矶  # Foreign coords query
apihz-cli geo random --city=上海市            # Random city coordinates
apihz-cli geo nearby --words=公交 --lon=116.30 --lat=40.05  # Nearby places search
apihz-cli geo map --lng=116.30 --lat=40.05   # Generate map image
```

### plate — 1 command
```
apihz-cli plate lookup --words=川B1234       # License plate location query
```

### code — 1 command
```
apihz-cli code lookup --words=上海           # Area code / postal code query
```

### unit — 13 conversions
```
apihz-cli unit speed --num=100 --unit=米秒   # Speed conversion
apihz-cli unit time --num=3600 --unit=秒     # Time unit conversion
apihz-cli unit density --num=1 --unit=kg/m³  # Density conversion
apihz-cli unit frequency --num=1000 --unit=Hz # Frequency conversion
apihz-cli unit current --num=1 --unit=A      # Current conversion
apihz-cli unit voltage --num=220 --unit=V    # Voltage conversion
apihz-cli unit resistance --num=100 --unit=Ω # Resistance conversion
apihz-cli unit length --num=1000 --unit=米   # Length conversion
apihz-cli unit temperature --num=25 --unit=C # Temperature conversion
apihz-cli unit storage --num=1 --unit=GB     # Storage conversion
apihz-cli unit power --num=1000 --unit=W     # Power conversion
apihz-cli unit force --num=10 --unit=N       # Force conversion
apihz-cli unit illuminance --num=100 --unit=lx  # Illuminance conversion
```

### misc — 26 commands
```
apihz-cli misc jiakao --type=1               # Driving test questions (C1/C4)
apihz-cli misc qq --qq=123456               # QQ profile query
apihz-cli misc lottery                        # SSQ lottery result query
apihz-cli misc lanzou --url=<url>            # Lanzou cloud link parser
apihz-cli misc phone-status --number=13219931963  # Phone status (PAID)
apihz-cli misc phone-online --number=13219931963  # Phone online duration (PAID)
apihz-cli misc bank-info --number=6222...    # Bank card info (PAID)
apihz-cli misc chem-eq --reactants=H2,O2 --products=H2O  # Balance chemical equation
apihz-cli misc element --name=H              # Chemical element query
apihz-cli misc mail --name=张三 --to=a@b.com --title=Hi --text=Hello  # Send email (SMTP)
apihz-cli misc proxy --type=1               # Get proxy IP (PAID)
apihz-cli misc redpack --zfb=account --name=张三  # Alipay red packet (PAID)
apihz-cli misc uuid                           # Generate UUID
apihz-cli misc calc --formula="(5+6)*10"     # Calculator (scientific notation)
apihz-cli misc timer --type=1 --number=1     # Stopwatch (start/query, up to 10)
apihz-cli misc counter-manual --type=1 --number=1  # Manual-reset counter
apihz-cli misc counter-daily --type=1        # Daily-auto-reset counter
apihz-cli misc baota --btapi=<url> --btkey=<key>  # BT Panel operation (PAID)
apihz-cli misc mcserver --host=play.example.com  # Minecraft server query
apihz-cli misc temp-mail-info --mail=a@b.com  # Temp email info/change password
apihz-cli misc temp-mail-list --mail=a@b.com --pwd=xxx  # Temp email inbox
apihz-cli misc imap-mail --mail=a@b.com --pwd=xxx --proto=imap --ip=imap.qq.com --port=993 --ssl=ssl  # IMAP/POP3 email fetch
apihz-cli misc announcement                   # Latest announcements
apihz-cli misc blank-stat                     # Blank stat (analytics only)
apihz-cli misc sec-to-time --sec=3661        # Seconds → D/H/M/S conversion
apihz-cli misc time-diff --time1=1700000000 --time2=1700003600  # Time difference
```

### storage — 10 commands
```
apihz-cli storage text --type=2 --numid=1     # Text storage CRUD (1000 entries)
apihz-cli storage data-create --name=data1,data2 --data="val1","val2"  # Create data entry
apihz-cli storage data-query --name=* --page=1 --limit=10  # Query data storage
apihz-cli storage data-delete --tj=data1<>'张三'  # Delete records
apihz-cli storage data-update --data="field1<>'newval'"  # Update records
apihz-cli storage data-verify --name1=user --name2=pwd --data1=admin --data2=123456  # Verify fields
apihz-cli storage upload --type=jpg --name=photo --res=<base64>  # Upload file (100M free)
apihz-cli storage delete-file --name=photo   # Delete uploaded file
apihz-cli storage cloud-getpost --url=<url> --tgid=<id>  # Cloud GET/POST proxy
apihz-cli storage cloud-mysql --tgid=<id>    # Cloud MySQL middleware
```

### config — 5 commands
```
apihz-cli config set --id=<id> --key=<key>   # Save credentials
apihz-cli config show                         # Show current config
apihz-cli config get <key>                    # Get a specific config value
apihz-cli config reset                        # Clear all config
apihz-cli config path                         # Show config file path
```

### pwd — 14 encryption commands
```
apihz-cli pwd md5 --words="hello"            # MD5 hash
apihz-cli pwd base64-encode --words="hello"  # BASE64 encode
apihz-cli pwd base64-decode --words=<base64> # BASE64 decode
apihz-cli pwd authcode-encrypt --words="hello" --pwd=key # Authcode encrypt
apihz-cli pwd authcode-decrypt --words=<enc> --pwd=key   # Authcode decrypt
apihz-cli pwd des-encrypt --words="hello" --pwd=key123456789012345678  # DES encrypt
apihz-cli pwd des-decrypt --words=<enc> --pwd=key        # DES decrypt
apihz-cli pwd rc4-encrypt --words="hello" --pwd=password # RC4 encrypt
apihz-cli pwd rc4-decrypt --words=<hex> --pwd=password   # RC4 decrypt
apihz-cli pwd morse --words="hello"          # Morse code encode/decode
apihz-cli pwd url-encode --words="你好世界" # URL encode
apihz-cli pwd url-decode --words=<encoded>   # URL decode
apihz-cli pwd hex-encode --words="hello"     # Hex encode
apihz-cli pwd hex-decode --words=<hex>       # Hex decode
```

### transport — 9 commands
```
apihz-cli transport train-remain --add=绵阳 --end=成都 --y=2025 --m=6 --d=10  # Remaining tickets
apihz-cli transport train-transfer --add=绵阳 --end=成都 --y=2025 --m=6 --d=10  # Transfer options
apihz-cli transport train-published-price --add=绵阳 --end=成都 --y=2025 --m=6 --d=10  # Published prices
apihz-cli transport train-ticket-price --train-order=<id> --depart-index=0 --arrive-index=1 --seatcode=<code> --y=2025 --m=6 --d=10  # Detailed prices
apihz-cli transport train-stops --train-order=<id>  # Train stopping stations
apihz-cli transport bus-route --starlon=121.42 --starlat=31.20 --endlon=121.31 --endlat=31.19  # Bus route plan
apihz-cli transport bus-line-info --uuid=<id> # Bus line stop details
apihz-cli transport navigation --starlon=121.42 --starlat=31.20 --endlon=121.31 --endlat=31.19  # Driving/navigation route
apihz-cli transport express --number=<tracking_number>  # Express delivery tracking
```

### bilibili — 17 commands
```
apihz-cli bilibili ranking                    # Bilibili comprehensive ranking
apihz-cli bilibili live-categories            # Bilibili live categories
apihz-cli bilibili live-anchors               # Bilibili popular anchors
apihz-cli bilibili video-info --url=<url>    # Bilibili video info
apihz-cli bilibili user-info --buid=<uid>    # Bilibili user stats
apihz-cli bilibili live-url --room=<id>      # Live room streaming URL
apihz-cli bilibili live-rooms --fid=<id> --zid=<id>  # Live room list by category
apihz-cli bilibili maoyan-movie               # Maoyan box office ranking
apihz-cli bilibili maoyan-tv                  # Maoyan web TV drama ranking
apihz-cli bilibili maoyan-web-movie           # Maoyan web movie ranking
apihz-cli bilibili maoyan-web-drama           # Maoyan web drama ranking
apihz-cli bilibili maoyan-tv-rating           # Maoyan TV rating ranking
apihz-cli bilibili maoyan-variety             # Maoyan variety show ranking
apihz-cli bilibili baidu-movie                # Baidu movie hot search
apihz-cli bilibili baidu-tv                   # Baidu TV drama hot search
apihz-cli bilibili baidu-car                  # Baidu car hot search
apihz-cli bilibili random-video               # Random girl/dance short video
```

### calendar — 12 commands
```
apihz-cli calendar day-detail --nian=2024 --yue=3 --ri=20  # Date 12时辰 details
apihz-cli calendar today-detail               # Today 12时辰 details
apihz-cli calendar today-luck                 # Today 时辰 luck (吉凶/喜神/财神)
apihz-cli calendar day-luck --nian=2024 --yue=3 --ri=20  # Specific date 时辰 luck
apihz-cli calendar day-info --nian=2024 --yue=3 --ri=20  # Calendar info for date
apihz-cli calendar elapsed                     # Elapsed/remaining time
apihz-cli calendar mbti --type=1 --version=3  # MBTI personality test
apihz-cli calendar zhuge --words="问前程"     # 诸葛神数 divination (384签)
apihz-cli calendar zhuge-qian                 # Random 诸葛神签 (100签)
apihz-cli calendar guanyin                    # Random 观音灵签 (100签)
apihz-cli calendar yuelao                     # Random 月老灵签 (100签)
apihz-cli calendar guandi                     # Random 关帝灵签 (100签)
```

### finance — 12 commands
```
apihz-cli finance exchange-rate --from=USD --to=CNY --money=100  # Currency exchange (160+)
apihz-cli finance gold-price                  # Shanghai Gold Exchange quotes
apihz-cli finance gold-history --y=2024 --m=3 --d=1  # Gold historical quotes
apihz-cli finance baidu-finance               # Baidu finance trending
apihz-cli finance baidu-index --words=天气    # Baidu keyword search volume
apihz-cli finance lottery-daletou             # 超级大乐透 draw results
apihz-cli finance lottery-3d                  # 福彩3D draw results
apihz-cli finance lottery-pl5                 # 排列5 draw results
apihz-cli finance lottery-pl3                 # 排列3 draw results
apihz-cli finance lottery-qxc                 # 七星彩 draw results
apihz-cli finance lottery-qlc                 # 七乐彩 draw results
apihz-cli finance lottery-kl8                 # 快乐8 draw results
```

### earthquake — 3 commands
```
apihz-cli earthquake latest                    # Latest global earthquake
apihz-cli earthquake report --year=2025 --month=3 --day=1  # Historical speed report
apihz-cli earthquake history --year=2025 --month=3 --day=1  # Historical official determination
```

### airport — 2 commands
```
apihz-cli airport search --word=北京          # Search airport by name/code
apihz-cli airport codes                        # All domestic airport IATA codes
```

### hardware — 2 commands
```
apihz-cli hardware laptop-gpu                 # Laptop GPU benchmark rankings
apihz-cli hardware desktop-gpu                # Desktop GPU benchmark rankings
```

---

### Paid APIs (requires sufficient balance)

```
apihz-cli ai face-compare --type=1 --imga=<url1> --imgb=<url2>  # Face comparison
apihz-cli ai face-liveness --type=1 --img=<url>  # Face liveness detection
apihz-cli ai face-attr --type=1 --img=<url> --mode=1  # Face attribute analysis
apihz-cli ai ocr --type=1 --img=<url>        # Text recognition (multi-language)
apihz-cli ai idcard --type=1 --img=<url>     # ID card recognition
apihz-cli ai bankcard --type=1 --img=<url>   # Bank card recognition
apihz-cli ai driving-license --type=1 --img=<url>  # Driving license recognition
apihz-cli ai vehicle-license --type=1 --img=<url> --page=1  # Vehicle license recognition
apihz-cli ai business-license --type=1 --img=<url>  # Business license recognition
apihz-cli ai receipt --type=1 --img=<url>    # Receipt/invoice recognition
apihz-cli ai plate --type=1 --img=<url>      # License plate recognition
apihz-cli ai vehicle --type=1 --img=<url>    # Vehicle make/model/color
apihz-cli ai product --type=1 --img=<url>    # Product recognition
apihz-cli ai tag --type=1 --img=<url>        # Image tag recognition
apihz-cli ai light-ocr --img=<url>           # Lightweight OCR (10+ languages)
apihz-cli ai idcard-verify --name=张三 --number=510...  # ID real-name verification
apihz-cli ai chat-light --words="你好"       # InterfaceBox lightweight AI
apihz-cli ai chat-hunyuan --words="你好"     # Tencent Hunyuan Lite
apihz-cli ai chat-zhipu --words="你好"       # Zhipu GLM-4-Flash
apihz-cli ai chat-wenxin --words="你好"      # Baidu Wenxin 3.5
apihz-cli ai chat-wenxin2 --words="你好"     # Wenxin 3.5 (channel 1)
apihz-cli ai chat-wenxin3 --words="你好"     # Wenxin 3.5 (channel 2)
apihz-cli ai chat-wenxin4 --words="你好"     # Wenxin 3.5 (channel 3)
apihz-cli ai chat-xunfei --words="你好"      # Xunfei Spark AI Lite
apihz-cli ai wxface-query1 --cxid=<id> --type=1  # WeChat face scan (enhanced)
apihz-cli ai wxface-query2 --cxid=<id> --type=1  # WeChat face scan (basic)
apihz-cli ai img-search1 --img=<url>         # Search by image (channel 1)
apihz-cli ai img-search2 --img=<url>         # Search by image (channel 2)

apihz-cli voice to-text --type=1 --data=<url> --format=wav  # Speech to text
apihz-cli voice to-voice --text="你好" --type=1  # Text to speech

apihz-cli sms send --phone=13219931963       # Send SMS (platform template)
apihz-cli sms send-verify --type=1 --phone=13219931963  # Send & verify SMS
apihz-cli sms send-aliyun --phone=13219931963 --aliid=<id> --alikey=<key> --sign=<sign> --template=<id> --code=123456  # Send via Aliyun
apihz-cli sms query-status --qid=<id>        # SMS delivery status

apihz-cli auth bank3 --name=张三 --number=6222... --idcard=510...  # Bank card 3-element verify
apihz-cli auth bank2 --name=张三 --number=6222...  # Bank card 2-element verify
apihz-cli auth alipay --name=张三 --number=510...  # Alipay real-name verify
apihz-cli auth alipay-check --cxid=<id>      # Alipay verification result

apihz-cli misc phone-status --number=13219931963  # Phone status query
apihz-cli misc phone-online --number=13219931963  # Phone online duration
apihz-cli misc bank-info --number=6222...    # Bank card info query
apihz-cli misc proxy --type=1               # Proxy IP
apihz-cli misc redpack --zfb=account --name=张三  # Alipay red packet
apihz-cli misc baota --btapi=<url> --btkey=<key>  # BT Panel operation
```

Pass `--raw` to any command for compact JSON output (no pretty-print).

---

## Environment Variables (Skip Config Entirely)

```bash
export APIHZ_ID=10016043
export APIHZ_KEY=xxxx
export APIHZ_VIP=1
```

Then run without `--id` / `--key`.

**Priority** (highest to lowest):
1. CLI flag: `--id <id> --key <key>`
2. Environment variable: `APIHZ_ID`, `APIHZ_KEY`
3. Config file: `~/.apihz/config.json`

---

## Common Failures Agents Face

**"Request failed" / code: 400**
→ Wrong or missing id/key. Check `apihz-cli config show`. If empty, configure.

**"通讯秘钥错误"**
→ Developer KEY is wrong. Get a fresh one from apihz.cn User Center.

**"查询失败，请重试"**
→ Server-side issue. Retry after a few seconds. Or try `--vip` if you have VIP access.

**"Cannot find module"**
→ Global install didn't register. Re-run `npm install -g apihz-cli`.

**"HTTP 4xx" or "HTTP 5xx"**
→ Network issue or apihz.cn server issue. Try with `--vip` flag for VIP line.

**Chinese unit conversion fails**
→ Some unit conversion APIs require Chinese unit names (e.g. `米秒` not `km/h`). Check `/path/to/apihz-cli --help` for each command.

**Paid API returns 400**
→ Insufficient balance. The human needs to top up their apihz.cn account.

---

## The One-Liner

For agents that trust copy-paste:

```bash
npm install -g apihz-cli && apihz-cli config set --id=<id> --key=<key> && apihz-cli time now --type=20
```

Replace `<id>` and `<key>` with actual credentials.

---

## Done

You now have programmatic access to 479+ APIs through apihz.cn. Time, weather, images, translation, AI recognition, QR codes, SMS, chemical equations — all from a terminal an agent can automate.

If something breaks: check the credentials first. 90% of issues are wrong id/key.
