import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  typeIdentification: number;

  @Column('text', { default: 0, unique: true })
  numberIdentification: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('date', { nullable: false })
  birthDate: string;

  @Column('int', { default: 0 })
  age: number;

  @Column('text', { nullable: true })
  nickName: string;

  @Column('int', { default: 0 })
  gender: number;

  @Column('int', { default: 0 })
  country: number;

  @Column('int', { default: 0 })
  city: number;

  @Column('text')
  addressResidence: string;

  @BeforeInsert()
  checkNickNameInsert() {
    if (!this.nickName) {
      this.nickName =
        this.firstName.toLowerCase().replaceAll(' ', '_') +
        '_' +
        this.lastName.toLowerCase().replaceAll(' ', '_');
    }
  }
  @BeforeUpdate()
  checkNickNameUpdate(){
    this.nickName =
    this.firstName.toLowerCase().replaceAll(' ', '_') +
    '_' +
    this.lastName.toLowerCase().replaceAll(' ', '_');
  }
}
