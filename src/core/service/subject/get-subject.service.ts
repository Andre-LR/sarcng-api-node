import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GetSubjectUseCase } from "src/core/domain/usecase/subject/get-subject.usecase";
import { SubjectRepositoryPortDI } from "src/application/di/subject/subject.token";
import { SubjectDto } from "./dto/subject.dto";
import { SubjectRepositoryPort } from "src/core/domain/repository/subject-repository.port";

@Injectable()
export class GetSubjectService implements GetSubjectUseCase {
  constructor(
    @Inject(SubjectRepositoryPortDI)
    private readonly subjectRepository: SubjectRepositoryPort,
  ) {}

  public async getSubjectById(id: number): Promise<SubjectDto> {
    return await this.subjectRepository
      .getSubject(id)
      .then((subject) => {
        return new SubjectDto(subject);
      })
      .catch((error) => {
        if (error.options.cause.message !== undefined) {
          throw new HttpException(
            error.options.cause.message,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            `Subject not found with the id ${id}`,
            HttpStatus.NOT_FOUND,
          );
        }
      });
  }
}
