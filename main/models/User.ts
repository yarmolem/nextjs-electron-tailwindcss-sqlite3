import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date = new Date()

  @UpdateDateColumn()
  updatedAt: Date = new Date()
}
