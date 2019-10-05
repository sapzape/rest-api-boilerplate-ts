import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator"

@Entity()
@Index(["userId", "organizationId", "createdAt"], { unique: true })
export class SponsorOrganization {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  userId: string

  @Column()
  @IsNotEmpty()
  organizationId: number

  @Column()
  @IsNotEmpty()
  amount: number

  @Column()
  @CreateDateColumn()
  createdAt: Date
}
