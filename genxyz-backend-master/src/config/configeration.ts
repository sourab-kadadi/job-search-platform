export default () => ({
    port: parseInt(process.env.PORT, 10) || 2000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    },
    s3Credential: {
      accessKey: process.env.S3_ACCESS_KEY,
      secrateKey: process.env.S3_SECRATE_KEY,
      region: process.env.S3_REGION,
      bucketName: process.env.S3_BUCKET_NAME,
    },
    redisCredential: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    expiryToken: {
      access_token_exp:  parseInt(process.env.ACCESS_TOKEN_EXPIRY),
      refresh_token_exp:  parseInt(process.env.REFRESH_TOKEN_EXPIRY),
    },
    jwtSecrate: {
      access_token_secrate: process.env.ACCESS_TOKEN_SECRATE,
      refresh_token_secrate: process.env.REFRESH_TOKEN_SECRATE

    }
  });