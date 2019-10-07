import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"
import bcrypt from "bcryptjs"
import { Exclude } from "class-transformer"

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(4, 20)
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  @IsNotEmpty()
  role: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkCryptPasswordIsValid(cryptPassword: string) {
    return bcrypt.compareSync(cryptPassword, this.password)
  }
}
