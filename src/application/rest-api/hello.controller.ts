import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GetHelloUsecase } from "src/core/domain/hello/usecase/get-hello.usecase";
import { HelloDto } from "src/core/service/dto/helle.dto";
import { HelloRepositoryPortDI } from "../di/hello.token";
@Controller()
export class HelloController {
  constructor(
    @Inject(HelloRepositoryPortDI)
    private readonly getHelloUsecase: GetHelloUsecase,
  ) {}

  @Get()
  getHello(@Query("id") id: number): HelloDto {
    return this.getHelloUsecase.execute(id);
  }
}
