import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards';

export function Auth() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}
