import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { Enrollment } from '../EnrollmentResolver/model'
import { Student } from '../StudentResolver/model'

export enum PreEnrollmentStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'approved',
  cancelled = 'approved',
}

registerEnumType(PreEnrollmentStatus, {
  name: 'PreEnrollmentStatus',
})

@ObjectType()
class PreEnrollment {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field((_type) => Enrollment, { nullable: true })
  enrollment: Enrollment

  @Field((_type) => Student, { nullable: true })
  student: Student

  @Field((_type) => String)
  enrollmentId: string

  @Field((_type) => String)
  studentId: string

  @Field((_type) => String, { nullable: true })
  createdAt: string

  @Field((_type) => PreEnrollmentStatus, { nullable: true })
  status: PreEnrollmentStatus
}

export { PreEnrollment }
