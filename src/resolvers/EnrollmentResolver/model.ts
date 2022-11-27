import { Field, ID, ObjectType } from 'type-graphql'
import { Educator } from '../EducatorResolver/model'
import { Student } from '../StudentResolver/model'
import { Module } from '../ModuleResolver/model'

@ObjectType()
class Enrollment {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  title: string

  @Field()
  description: string

  @Field((_type) => [Module], { nullable: true })
  modules: Module[]

  @Field((_type) => [Educator], { nullable: true })
  educators?: Educator[]

  @Field((_type) => [Student], { nullable: true })
  students?: Student[]
}

export { Enrollment }
