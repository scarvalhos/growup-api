import { Field, ID, InputType } from 'type-graphql'
import { EnrollmentInput } from '../EnrollmentResolver/input'
import { StudentInput } from '../StudentResolver/input'

@InputType()
class linkEnrollmentToEducatorInput {
  @Field()
  educatorId: string

  @Field({ nullable: true })
  enrollemntId: string
}

@InputType()
class EducatorInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  userId: string

  @Field((_type) => [StudentInput], { nullable: true })
  students: [StudentInput]

  @Field((_type) => [EnrollmentInput], { nullable: true })
  enrollment: [EnrollmentInput]
}

export { EducatorInput, linkEnrollmentToEducatorInput }
