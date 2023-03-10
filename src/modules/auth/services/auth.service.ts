import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '@/modules/user/interfaces';
import { UserService } from '@/modules/user/services';
import { RoleService } from '@/modules/role/services';
import { Token, LoginUserDto } from '../dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService,
    ) {}

    async validateUser(dto: LoginUserDto): Promise<Token> {
        const { username, password } = dto;
        const user = await this.userService.getUserByUsername(username);
        await this.comparePassword(password, username);
        return await this.payloadData(user);
    }

    async comparePassword(password, username) {
        const userPassword = await this.userService.getPasswordByUsename(username);
        const passwordHashed = await bcrypt.compare(password, userPassword);
        if (!passwordHashed) {
            throw new NotFoundException('La contraseña no coincide');
        }
    }

    async payloadData(user: IUser) {
        if (user && user.status != 'ACTIVE') {
            throw new NotFoundException('El usuario esta no esta ACTIVO');
        }
        const role = await this.roleService.getRoleById(user.roleId);

        const payload = {
            username: user.username,
            id: user.id,
            roleName: role.name,
            roleId: user.roleId,
            status: user.status,
            companyId: null,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(auth: string) {
        const token = auth;
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
