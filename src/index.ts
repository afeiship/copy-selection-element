import nx from '@jswork/next';
import '@jswork/next-deep-clone';
import '@jswork/next-json';

declare var wx: any;

const MSG = {
  envname: "Don't use envname as key, it's reserved!",
};

interface EnvManagerOptions {
  prefix: string;
  env?: Record<string, string | undefined>;
  harmony?: boolean;
}

interface EnvType {
  readonly [index: string]: unknown;
}

class EnvManager {
  public options = {} as EnvManagerOptions;

  constructor(inOptions: EnvManagerOptions) {
    this.options = nx.mix({ prefix: 'NX_', env: process.env }, inOptions);
    this.init();
  }

  public init() {
    const { harmony } = this.options;
    if (harmony) nx.set(nx, '$env', this.get.bind(this));
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

  public set(inEnvs) {
    const { prefix, env } = this.options;
    nx.forIn(inEnvs, (mode: string, value) => {
      const envName = `${prefix}ENVNAME`;
      nx.forIn(value, (k: string, v: EnvType) => {
        // v: must be string, process.env[k] = string(v);
        const parsed = nx.stringify(v);
        env![k.toUpperCase()] = parsed;
        env![envName] = mode;
        // detect user defined envname
        if (k.toUpperCase() === 'ENVNAME') throw new Error(MSG.envname);
        if (!k.includes(prefix)) {
          value[(prefix + k).toUpperCase()] = parsed;
          delete value[k];
        }
      });
    });
    return inEnvs;
  }
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = EnvManager;
}

export default EnvManager;
