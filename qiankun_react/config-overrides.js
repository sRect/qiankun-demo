module.exports = {
  webpack: config => {
    config.output.library = 'reactApp';
    config.output.libraryTarget = 'umd';
    config.output.publicPath = 'http://localhost:9000/';
    return config;
  },
  devServer: configFunc => {
    return (proxy, allowedHost) => {
      const config = configFunc(proxy, allowedHost);

      // config.port = 9000;
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      }

      return config;
    }
  }
}