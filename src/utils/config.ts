import * as fs from 'fs';
import * as path from 'path';

const CONFIG_DIR = path.join(process.env.HOME || process.env.USERPROFILE || '/tmp', '.apihz');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export interface ApihzConfig {
  id?: string;
  key?: string;
  vip?: boolean;
}

export class ConfigManager {
  private config: ApihzConfig;

  constructor() {
    this.config = this.load();
  }

  private load(): ApihzConfig {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      }
    } catch {}
    return {};
  }

  save(config: ApihzConfig): void {
    this.config = this.stripEmpty({ ...this.config, ...config });
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
  }

  private stripEmpty(config: ApihzConfig): ApihzConfig {
    const result: ApihzConfig = {};
    for (const [k, v] of Object.entries(config)) {
      if (v === undefined || v === null || v === '') continue;
      (result as any)[k] = v;
    }
    return result;
  }

  get(key: keyof ApihzConfig): string | boolean | undefined {
    return this.config[key];
  }

  getAll(): ApihzConfig {
    return { ...this.config };
  }

  getPath(): string {
    return CONFIG_FILE;
  }
}
