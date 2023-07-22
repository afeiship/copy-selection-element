import nx from '@jswork/next';
import '@jswork/next-deep-clone';
import '@jswork/next-json';

declare var wx: any;

interface EnvManagerOptions {
  prefix: string;
  env?: any;
}

interface EnvType {
  readonly [index: string]: unknown;
}

class EnvManager {
  public options = {} as EnvManagerOptions;

  constructor(inOptions: EnvManagerOptions) {
    this.options = nx.mix({ prefix: 'NX_', env: process.env }, inOptions);
  }

  public get(inPath?: string) {
    const { prefix, env } = this.options;
    const size = prefix.length;
    const clonedEnv = nx.deepClone(env);
    const path = inPath?.toUpperCase();
    nx.forIn(clonedEnv, (k: string, v: EnvType) => {
      if (k.includes(prefix)) {
        clonedEnv[k.slice(size).toUpperCase()] = nx.parse(v as unknown as string);
        delete clonedEnv[k];
      }
    });
    const res = path ? nx.get(clonedEnv, path) : clonedEnv;
    return nx.parse(res);
  }

  public set(inCmdRc) {
    const envs = inCmdRc;
    const { prefix, env } = this.options;
    nx.forIn(envs, (_: string, value) => {
      nx.forIn(value, (k: string, v: EnvType) => {
        // v: must be string, process.env[k] = string(v);
        const parsed = nx.stringify(v);
        env[k.toUpperCase()] = parsed;
        if (!k.includes(prefix)) {
          value[(prefix + k).toUpperCase()] = parsed;
          delete value[k];
        }
      });
    });
    return envs;
  }
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = EnvManager;
}

export default EnvManager;
