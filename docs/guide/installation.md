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

## What You Can Do Now

### Core (Free)

```
apihz-cli time now --type=20                 # 北京时间 + 农历生肖
apihz-cli time calendar                       # 万年历 (60+ fields)
apihz-cli time country --country=US           # 各国时间/时区
apihz-cli time to-timestamp --time="2024-03-20 16:16:16"
apihz-cli time from-timestamp --time=1710925735

apihz-cli weather by-address --place=绵阳 --sheng=四川 --day=3 --hourtype=1
apihz-cli weather by-ip --day=1
apihz-cli weather by-coords --lon=116.30 --lat=40.05
apihz-cli weather cloud                        # 卫星云图

apihz-cli ip lookup --ip=112.192.49.243
apihz-cli ip visitor                           # IP + 浏览器 + OS
apihz-cli phone lookup --phone=13219931963

apihz-cli image memes --words=开心
apihz-cli image search --words=风景 --source=baidu
apihz-cli image wallpaper --type=1
apihz-cli image avatar --type=5
apihz-cli image bing
apihz-cli image nasa

apihz-cli text translate --words="你好" --from=2 --to=1
apihz-cli text yiyan
apihz-cli text pinyin --words="接口盒子"
apihz-cli text case --type=1 --words="hello"
apihz-cli text jfzh --type=1 --words="你好"
apihz-cli text hanzi --word=天
apihz-cli text ciyu --words=宇宙
apihz-cli text baike --words=北京
apihz-cli text nick --min=2 --max=6
apihz-cli text today
apihz-cli text joke

apihz-cli chengyu random
apihz-cli chengyu chain --word=天
apihz-cli chengyu lookup --words=焕然一新

apihz-cli news baidu
apihz-cli news weibo
apihz-cli news douyin

apihz-cli network icp --domain=apihz.cn
apihz-cli network domain --domain=example.com
apihz-cli network tdk --url=https://apihz.cn

apihz-cli qrcode create --text="hello"
apihz-cli qrcode parse --type=1 --img=<url>

apihz-cli region list --type=1
apihz-cli region code --sheng=四川 --place=绵阳
apihz-cli region country
apihz-cli idcard lookup --card=510704888888888888
apihz-cli geo reverse --lon=116.30 --lat=40.05

apihz-cli unit speed --num=100 --unit=米秒
apihz-cli unit time --num=3600 --unit=秒
apihz-cli unit voltage --num=220 --unit=伏特

apihz-cli misc jiakao --type=1
apihz-cli misc lottery
apihz-cli misc chem-eq --reactants=H2,O2 --products=H2O
apihz-cli misc element --name=H

apihz-cli storage text --type=2 --numid=1
apihz-cli storage data-query --name=* --page=1 --limit=10
```

### Paid APIs (requires sufficent balance)

```
apihz-cli ai ocr --type=1 --img=<url>
apihz-cli ai idcard --type=1 --img=<url>
apihz-cli ai face-compare --type=1 --imga=<url1> --imgb=<url2>
apihz-cli ai face-attr --type=1 --img=<url> --mode=1
apihz-cli voice to-text --type=1 --data=<url> --format=wav
apihz-cli voice to-voice --text="你好" --type=1
apihz-cli sms send --phone=13219931963
apihz-cli auth bank2 --name=张三 --number=6222...
apihz-cli auth alipay --name=张三 --number=5107...
apihz-cli misc proxy --type=1
```

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
