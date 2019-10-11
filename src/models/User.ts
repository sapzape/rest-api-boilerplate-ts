import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Length, IsNotEmpty, IsNumber } from "class-validator"
import bcrypt from "bcryptjs"

@Entity()
@Unique(["username"])
export class User {
  // fixme(sapzape) when value is 'undefined', it is treated as 1
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @Length(4, 20)
  username: string

  @Column()
  @IsNotEmpty()
  password: string

  // fixme(sapzape) default value don't work
  @Column({ default: "USER" })
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
