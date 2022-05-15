import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '.';
import { UserService } from '../services';

describe('AppController', () => {
    let userResolver: UserResolver;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserService, UserResolver],
            providers: [UserService],
        }).compile();

        userResolver = app.get<UserResolver>(UserResolver);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(userResolver.getUsers()).toBe([]);
        });
    });
});
