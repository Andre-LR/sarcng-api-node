import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GetUserUsecase } from "../../domain/usecase/user/get-user.usecase";
import { UserRepositoryPortDI } from "src/application/di/user/user.token";
import { UserDto } from "./dto/user.dto";
import { UserRepositoryPort } from "src/core/domain/repository/user-repository.port";

@Injectable()
export class GetUserService implements GetUserUsecase {
  constructor(
    @Inject(UserRepositoryPortDI)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async getUserById(id: number): Promise<UserDto> {
    return await this.userRepository
      .getUser(id)
      .then((user) => {
        return new UserDto(user);
      })
      .catch((error) => {
        if (error.options.cause.message !== undefined) {
          throw new HttpException(
            error.options.cause.message,
            HttpStatus.BAD_REQUEST,
          );
        } else
          throw new HttpException(
            "Usuario nao encontrado com o id fornecido.",
            HttpStatus.BAD_REQUEST,
          );
      });
  }
}
