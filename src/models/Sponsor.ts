import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

@Entity()
@Index(["regionCode", "organizationName", "address"], { unique: true })
export class Sponsor {
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
