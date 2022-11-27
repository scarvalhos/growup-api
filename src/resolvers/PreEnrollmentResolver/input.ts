import { Field, ID, InputType } from 'type-graphql'
import { PreEnrollmentStatus } from './model'
import { EnrollmentInput } from '../EnrollmentResolver/input'
import { StudentInput } from '../StudentResolver/input'

@InputType()
class ApprovePreEnrollmentInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field((_type) => String)
  enrollmentId: string

  @Field((_type) => String)
  studentId: string

  @Field((_type) => PreEnrollmentStatus)
  status: PreEnrollmentStatus
}

@InputType()
class PreEnrollmentInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field((_type) => EnrollmentInput, { nullable: true })
  enrollment?: EnrollmentInput

  @Field((_type) => StudentInput, { nullable: true })
  student?: StudentInput

  @Field((_type) => String)
  enrollmentId: string

  @Field((_type) => String)
  studentId: string

  @Field((_type) => PreEnrollmentStatus)
  status: PreEnrollmentStatus
}

export { PreEnrollmentInput, ApprovePreEnrollmentInput }
