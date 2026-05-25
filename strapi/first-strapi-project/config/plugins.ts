import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        accessTokenLifespan: 604800, // 1 week (default)
        maxRefreshTokenLifespan: 2592000, // 30 days
        idleRefreshTokenLifespan: 604800, // 7 days
        httpOnly: false, // Set to true for HTTP-only cookies
        cookie: {
          name: 'strapi_up_refresh',
          sameSite: 'lax',
          path: '/',
          secure: false, // true in production
        },
      },
      ratelimit: {
        enabled: true,
        interval: { min: 5 },
        max: 5,
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT"),
        secure: true,
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: "Strapi Notification <" + env("SMTP_USER") + ">",
        defaultReplyTo: env("SMTP_USER"),
      },
    },
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
      sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
      sharp: {
        cache: true,
        concurrency: 4,
      },
      security: {
        allowedTypes: ['image/*', 'application/*'],
        deniedTypes: ['application/x-sh', 'application/x-dosexec']
      },
      concurrentUploadSize: 5,
    },
  },
});

export default config;
