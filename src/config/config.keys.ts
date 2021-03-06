export enum Configuration {
    // Node Server
    HOST = 'HOST',
    PORT = 'PORT',

    // Database
    DATABASE_HOST = 'DATABASE_HOST',
    DATABASE_PORT = 'DATABASE_PORT',
    DATABASE_USER = 'DATABASE_USER',
    DATABASE_PASS = 'DATABASE_PASS',
    DATABASE_NAME = 'DATABASE_NAME',
    DATABASE_TYPE = 'DATABASE_TYPE',
    DATABASE_MIGRATIONS_DIR = 'DATABASE_MIGRATIONS_DIR',
    DATABASE_TIMEZONE = 'DATABASE_TIMEZONE',

    // JWT
    JWT_SECRET = 'JWT_SECRET',

    //  GraphQL
    GRAPHQL_DEGUB = 'GRAPHQL_DEGUB',
    PLAYGROUND = 'PLAYGROUND',

    // MAILGUN
    MY_DOMAIN = 'MY_DOMAIN',
    MAILGUN_API_KEY = 'MAILGUN_API_KEY',
    MAILGUN_HOST = 'MAILGUN_HOST',
    MAILGUN_USERNAME = 'MAILGUN_USERNAME',

    // OTHERS
    EMAIL = 'EMAIL',
    LOGO = 'LOGO',
    SSL_CERTIFICATE = 'SSL_CERTIFICATE',
    SSL_CERTIFICATE_KEY = 'SSL_CERTIFICATE_KEY',
}
