import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(authCredentials: AuthCredentialsDto): Promise<void> {

    const { password, username } = authCredentials;

    const user = new User();
    user.salt = await this.generateSalt();
    user.password = await this.generateHashPassword(password, user.salt);
    user.username = username;

    try {
      await user.save();
    } catch (error) {
      const { code } = error;
      if ('23505' === code) {
        throw new ConflictException('duplicate username');
      }
      throw new InternalServerErrorException();
    }
  }

  public async signIn(authCredentials: AuthCredentialsDto):Promise<string> {
    const { password, username } = authCredentials;

    const user = await this.findOne({username})

    if(user && await user?.validatePassword(password)){
      return user.username
    }
    throw new UnauthorizedException('Invalid credentials')
  }

  private async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
  private async generateHashPassword(password:string, salt:string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
