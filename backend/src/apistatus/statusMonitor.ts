import express from 'express';
import statusMonitor from 'express-status-monitor';
import helmet from 'helmet';
import compression from 'compression';

export const setupMiddleware = (app: express.Application) => {
  //for security headers
  app.use(helmet());
  //for gzip compression
  app.use(compression());
  app.use(
    statusMonitor({
      title: 'Server Status',
      path: '/status',
      spans: [
        { interval: 1, retention: 60 },
        { interval: 5, retention: 60 },
        { interval: 15, retention: 60 },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        heap: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
      healthChecks: [
        {
          protocol: 'http',
          host: 'localhost',
          path: '/',
          port: '3000',
        },
      ],
    })
  );

  app.get('/status');
};
