const enviroment = {
  baseURL: process.env.BASE_URL || "http://localhost:8080",
  urlsPermitidas: [],
  clientId: process.env.CLIENT_ID || 'easychat',
  clientSecret: process.env.CLIENT_SECRET || 'easychat',
  production: process.env.NODE_ENV === 'production'
};

export { enviroment };
