import { Injectable, Logger } from '@nestjs/common';
import { RoleSeederService } from './role/role.service.seeder';
import { UserSeederService, ProfileSeederService } from './user/';

@Injectable()
export class SeederService {
    constructor(
        private readonly logger: Logger,
        private readonly roleSeederService: RoleSeederService,
        private readonly userSeederService: UserSeederService,
        private readonly profileSeederService: ProfileSeederService,
    ) {}

    async seed() {
        await this.roles()
            .then((completed) => {
                this.logger.debug('Successfuly completed seeding roles...');
                Promise.resolve(completed);
            })
            .catch((error) => {
                this.logger.error('Failed seeding roles...');
                Promise.reject(error);
            });

        await this.users()
            .then((completed) => {
                this.logger.debug('Successfuly completed seeding users...');
                Promise.resolve(completed);
            })
            .catch((error) => {
                this.logger.error('Failed seeding users...');
                Promise.reject(error);
            });

        await this.profiles()
            .then((completed) => {
                this.logger.debug('Successfuly completed seeding profiles...');
                Promise.resolve(completed);
            })
            .catch((error) => {
                this.logger.error('Failed seeding profiles...');
                Promise.reject(error);
            });
    }

    async roles() {
        return await Promise.resolve(this.roleSeederService.createRoles())
            .then((createdRoles) => {
                this.logger.debug(
                    'No. of Roles created : ' +
                        createdRoles.filter((nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage).length,
                );
                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }

    async users() {
        return await Promise.all(this.userSeederService.createUsers())
            .then((createdUsers) => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of Users created : ' +
                        createdUsers.filter((nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage).length,
                );

                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }

    async profiles() {
        return await Promise.resolve(this.profileSeederService.createProfiles())
            .then((createdProfiles) => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of Profile created : ' +
                        createdProfiles.filter((nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage).length,
                );

                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }
}
