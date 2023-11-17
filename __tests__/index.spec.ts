import EnvManager from '../src';

const mgr = new EnvManager({ prefix: 'NX_', env: {} });

describe('api.basic', () => {
  test('normail single value case + predefined mode', () => {
    mgr.set({
      beta: {
        api_account: 'https://backend-service-account-api.beta.saybot.net',
        api_teacher: 'https://teacher-app-api.beta.saybot.net',
        api_upload: 'http://upload.beta.saybot.net',
      },
      production: {
        api_account: 'https://account-api.alo7.com',
        api_teacher: 'https://teacher-api.alo7.com',
        api_upload: 'https://upload.alo7.com',
        NX_BASE_URL: 'https://api.github.com/users/afeiship',
        NX_DEBUG: true,
      },
    });


    expect(mgr.get('debug')).toBe(true);
    expect(mgr.get('API_ACCOUNT')).toBe('https://account-api.alo7.com');
    expect(mgr.get('envname')).toBe('production');
  });

  test('user defined envname shoud throw error', () => {
    expect(() => {
      mgr.set({
        beta: {
          envname: 'beta',
          api_account: 'https://backend-service-account-api.beta.saybot.net',
          api_teacher: 'https://teacher-app-api.beta.saybot.net',
          api_upload: 'http://upload.beta.saybot.net',
        },
        production: {
          envname: 'production',
          api_account: 'https://account-api.alo7.com',
          api_teacher: 'https://teacher-api.alo7.com',
          api_upload: 'https://upload.alo7.com',
          NX_BASE_URL: 'https://api.github.com/users/afeiship',
          NX_DEBUG: true,
        },
      });
    }).toThrow();
  })
});
