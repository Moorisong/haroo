module.exports.HAROO_DETAIL = {
  NAME_KOR_EN: '하루(Haroo)',
};

module.exports.TEXT = {
  AUTHORIZATION: 'authorization',
  INITTIAL: {
    VOTE: {
      TOPIC: 'Initial Vote',
      OPTIONS: ['a', 'b', 'c', 'd'],
      KNOWLEDGE: 'Knowledge Section',
    },
  },
  ENV: {
    DEV: 'development',
    PROD: 'production',
  },
  TOKEN: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
  },
  COOKIE_MAX_AGE: {
    ACCESS_TOKEN: 60 * 60 * 2 * 1000,
    REFRESH_TOKEN: 60 * 60 * 24 * 1000
  }
};

module.exports.PAHT = {
  KAKAO: {
    AUTH_TOKEN: 'https://kauth.kakao.com/oauth/token',
    USER: 'https://kapi.kakao.com/v2/user/me',
  },
};
