import { Field, ID, ObjectType } from 'type-graphql'
import { Enrollment } from '../EnrollmentResolver/model'
import { Student } from '../StudentResolver/model'
import { User } from '../UserResolver/model'

@ObjectType()
class Educator {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  userId: string

  @Field((_type) => User, { nullable: true })
  user: User

  @Field((_type) => [Student], { nullable: true })
  students: [Student]

  @Field((_type) => [Enrollment], { nullable: true })
  enrollments: [Enrollment]
}

export { Educator }
