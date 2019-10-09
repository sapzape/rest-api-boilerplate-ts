import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator"

@Entity()
@Index(["userId", "sponsorId", "createdAt"], { unique: true })
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  userId: string

  @Column()
  @IsNotEmpty()
  sponsorId: number

  @Column()
  @IsNotEmpty()
  amount: number

  @Column()
  @CreateDateColumn()
  createdAt: Date
}
