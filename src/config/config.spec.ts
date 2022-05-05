import { ConfigService } from './config.service';

describe('ConfigModule', () => {
    let configService: ConfigService;

    beforeAll(() => {
        configService = new ConfigService();
    });

    it('This should return the name of the application according to the APP_NAME key in the .env file.', () => {
        expect('Posta').toBe(configService.get('APP_NAME'));
    });
});
