module.exports = {
  apps: [
    {
      name: 'haroo-prod',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3009',
      exec_mode: 'fork',
      instances: 1,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3009,
      },
    },
    {
      name: 'haroo-test',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3010',
      exec_mode: 'fork',
      instances: 1,
      env_test: {
        NODE_ENV: 'production',
        PORT: 3010,
      },
    },
  ],
};
