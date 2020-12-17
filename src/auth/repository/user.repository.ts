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

    await user.save();
  }
}
