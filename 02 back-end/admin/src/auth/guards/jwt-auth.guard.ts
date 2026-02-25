import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    
    // Si c'est une requête API ou Ajax, on ne redirige pas, on lève une 401
    const isApi = request.url.includes('/comments') || request.url.includes('/auth/me');

    if (err || !user) {
      if (isApi) {
        throw err || new UnauthorizedException();
      }
      const response = context.switchToHttp().getResponse();
      return response.redirect('/auth/login');
    }
    return user;
  }
}