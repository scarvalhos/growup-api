import { Field, ID, ObjectType } from 'type-graphql'
import { Educator } from '../EducatorResolver/model'
import { Student } from '../StudentResolver/model'

@ObjectType()
class Profile {
  @Field()
  cpf: string

  @Field()
  completeName: string

  @Field()
  birthDate: string

  @Field()
  phone: string

  @Field({ nullable: true })
  avatar?: string
}

@ObjectType()
class User {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  isAdmin: boolean

  @Field((_type) => Profile, { nullable: true })
  profile?: Profile

  @Field((_type) => Educator, { nullable: true })
  educator?: Educator

  @Field((_type) => Student, { nullable: true })
  student?: Student
}

export { User }
