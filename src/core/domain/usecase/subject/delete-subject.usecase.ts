/* eslint-disable prettier/prettier */
import { SubjectDto } from "src/core/service/subject/dto/subject.dto";

export interface DeleteSubjectUseCase {
  deleteSubjectById(idSubject: number): Promise<SubjectDto>;
}
