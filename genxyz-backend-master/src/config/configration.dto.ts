export interface Iconfigeration {
    port: number;
    database: IdatabaseConfig;
    s3: Is3Config;
    redis: IredisConfig;
    expiryToken: ItokenExp;
    jwtSecrate: IjwtTokenSecrate;
}

export interface IdatabaseConfig {
    host: string;
    username: string;
    password: string;
    databaseName: string;
}

export interface Is3Config {
    accessKey: string;
    secrateKey: string;
    region: string;
    bucketName: string;
}

export interface IredisConfig {
    host: string;
    username: string;
    password: string;
    databaseName: string;
}

export interface ItokenExp {
    access_token_exp: number;
    refresh_token_exp: number;
}

export interface IjwtTokenSecrate {
    access_token_secrate: string;
    refresh_token_secrate: string;
}