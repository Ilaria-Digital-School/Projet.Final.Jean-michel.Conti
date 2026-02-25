import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private prisma: PrismaService,
) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.usersService.create({
      email,
      password: hashedPassword
    });
  }

  // Validation utilisateur (Admin ou Normal)
  async validateUser(email: string, pass: string): Promise<any>{
    // 1. Chercher dans la table Admin
    let user = await this.prisma.admin.findUnique({ where: { email } }) as any;
    
    // 2. Si pas trouvé, chercher dans la table User
    if (!user) {
      user = await this.usersService.findByEmail(email);
    }


    if(!user){
      throw new Error('Aucun utilisateur avec ce mail a été trouvé');
    }


    const passwordOk = await bcrypt.compare(pass, user.password);

    if(!passwordOk){
      throw new Error('Mot de passe incorrect');
    }

    console.log('EMAIL', email);
    console.log('USER', user);
  
  return user;   
}

  // Génération JWT
  async login(user){
    
    return {
      token: this.jwtService.sign({
        userId: user.id,
        role: user.role
      }),
    };
}
}
