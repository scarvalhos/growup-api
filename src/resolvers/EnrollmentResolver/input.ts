import { Field, ID, InputType } from 'type-graphql'
import { ModuleInput } from '../ModuleResolver/input'

@InputType()
class linkEducatorToEnrollmentInput {
  @Field()
  enrollmentId: string

  @Field()
  educatorId: string
}

@InputType()
class EnrollmentInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  title: string

  @Field()
  description: string

  @Field((_type) => [ModuleInput], { nullable: true })
  modules: ModuleInput[]
}

export { EnrollmentInput, linkEducatorToEnrollmentInput }
