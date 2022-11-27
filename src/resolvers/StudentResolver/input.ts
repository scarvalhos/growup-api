import { Field, ID, InputType } from 'type-graphql'
import { EnrollmentInput } from '../EnrollmentResolver/input'
import { EducatorInput } from '../EducatorResolver/input'
import { UserInput } from '../UserResolver/input'

@InputType()
class linkEducatorToStudentInput {
  @Field()
  studentId: string

  @Field({ nullable: true })
  educatorId: string
}

@InputType()
class linkEnrollemntToStudentInput {
  @Field()
  studentId: string

  @Field({ nullable: true })
  enrollemntId: string
}

@InputType()
class linkPreEnrollemntToStudentInput {
  @Field()
  studentId: string

  @Field({ nullable: true })
  preEnrollemntId: string
}

@InputType()
class StudentInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  userId: string

  @Field((_type) => UserInput, { nullable: true })
  user?: UserInput

  @Field((_type) => [EducatorInput], { nullable: true })
  educators?: [EducatorInput]

  @Field((_type) => [EnrollmentInput], { nullable: true })
  enrollments?: [EnrollmentInput]

  @Field((_type) => [String], { nullable: true })
  preEnrollments?: [string]
}

export {
  StudentInput,
  linkEnrollemntToStudentInput,
  linkEducatorToStudentInput,
  linkPreEnrollemntToStudentInput,
}
