import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService, UserCompanyService } from '@/modules/user/services';
import { RoleService } from '@/modules/role/services';
import { Token, LoginUserDto } from '../dtos';
import { IUserPayload } from '../interfaces';
import { Status } from '@/modules/shared/enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService,
        private readonly userCompanyService: UserCompanyService,
    ) {}

    async validateUser(dto: LoginUserDto): Promise<boolean> {
        const { username, password } = dto;
        const user = await this.userService.getPasswordByUsename(username);
        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new NotFoundException('Alguno de los datos no coincide');
        if (user.status !== Status.ACTIVE) throw new NotFoundException('El usuario esta no esta ACTIVO');
        return true;
    }

    async payloadData(username: string): Promise<Token> {
        const user = await this.userService.getUserByUsername(username);
        const role = await this.roleService.getRoleById(user.roleId);
        const userCompany = await this.userCompanyService.getUserCompanyByUserId(user.id);

        const payload = {
            ...user,
            roleName: role.name,
            companyId: userCompany?.companyId,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(auth: string) {
        const token = auth.replace('Bearer ', '');
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
