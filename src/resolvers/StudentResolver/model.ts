import { Field, ID, ObjectType } from 'type-graphql'
import { PreEnrollment } from '../PreEnrollmentResolver/model'
import { Enrollment } from '../EnrollmentResolver/model'
import { Educator } from '../EducatorResolver/model'
import { User } from '../UserResolver/model'

@ObjectType()
class Student {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field({ nullable: true })
  userId?: string

  @Field((_type) => User, { nullable: true })
  user?: User

  @Field((_type) => [Educator], { nullable: true })
  educators?: [Educator]

  @Field((_type) => [Enrollment], { nullable: true })
  enrollments?: [Enrollment]

  @Field((_type) => [PreEnrollment], { nullable: true })
  preEnrollments?: [PreEnrollment]
}

export { Student }
