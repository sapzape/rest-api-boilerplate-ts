import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

@Entity()
@Unique(["regionCode"])
export class Donate {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @Length(1, 10)
  regionCode: number

  @Column()
  @IsNotEmpty()
  @Length(2, 20)
  organizationName: string

  @Column()
  @IsNotEmpty()
  account: string

  @Column()
  @Length(8, 15)
  phone: string

  @Column()
  @IsNotEmpty()
  address: string

  @Column()
  @IsNotEmpty()
  homepage: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
