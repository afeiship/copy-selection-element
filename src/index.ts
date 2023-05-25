import nx from '@jswork/next';

declare var wx: any;

type PathType = null | string;

interface EnvManagerOptions {
  prefix: string;
  env: any;
}

interface EnvType {
  readonly [index: string]: unknown;
}

class EnvManager {
  public options = {} as EnvManagerOptions;

  constructor(inOptions: EnvManagerOptions) {
    this.options = nx.mix({ prefix: 'NX_', env: process.env }, inOptions);
  }

  public get(inPath?: PathType) {
    const { prefix, env } = this.options;
    const size = prefix.length;
    nx.forIn(env, (k: string, v: EnvType) => {
      if (k.includes(prefix)) {
        env[k.slice(size)] = v;
        delete env[k];
      }
    });
    return inPath ? nx.get(env, inPath) : env;
  }

  public set(inCmdRc) {
    const envs = inCmdRc;
    const { prefix, env } = this.options;
    const size = prefix.length;
    nx.forIn(envs, (_: string, value) => {
      nx.forIn(value, (k: string, v: EnvType) => {
        // v: must be string
        if (typeof v === 'string') env[k] = v;
        if (!k.includes(prefix)) {
          value[size + k] = v;
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
