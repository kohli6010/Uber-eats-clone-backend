import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query((returns) => Boolean)
  me(@Context() context): boolean {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args("input") createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput>{
    try {
      const user = await this.userService.createAccount(createAccountInput);
      return user;
    }catch(e){
      return e;
    }
  }

  @Mutation(returns => LoginOutput)
  async login(
    @Args("input") loginInput: LoginInput,
  ): Promise<LoginOutput> {
    try{
      const output = await this.userService.login(loginInput);
      return output;
    }catch(e){
      return e;
    }
  }
}
