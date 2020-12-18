import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { password, username } = authCredentials;

    const user = new User();
    user.password = password;
    user.username = username;

    try {
      await user.save()
    } catch (error) {
      const {code} =error
      if('23505' === code ){
        throw new ConflictException('duplicate username')
      }      
      throw new InternalServerErrorException()
    }
  }
}
