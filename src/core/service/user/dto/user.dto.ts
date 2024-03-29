import { User } from "src/core/domain/entity/user";

export class UserDto {
  private id: number;
  private age: number;
  private name: string;
  private email: string;
  private dateOfBirth: Date;
  private gender: string;
  private phone: string;

  constructor(entity: User) {
    this.id = entity.id;
    this.age = entity.age;
    this.name = entity.name;
    this.email = entity.email;
    this.dateOfBirth = entity.dateOfBirth;
    this.gender = entity.gender;
    this.phone = entity.phone;
  }
}
