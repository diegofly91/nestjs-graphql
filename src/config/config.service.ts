import * as fs from 'fs';
import { join } from 'path';
import { parse } from 'dotenv';
import { Logger } from '@nestjs/common';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = join(process.cwd(), '.env');
            const existPath = fs.existsSync(envFilePath);

            if (!existPath) {
                Logger.log('.env file does not exist');
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                HOST: process.env.HOST,
                PORT: process.env.PORT,
            };
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
