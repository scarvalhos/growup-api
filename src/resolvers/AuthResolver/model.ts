import { Field, ObjectType } from 'type-graphql'
import { User } from '../UserResolver/model'

@ObjectType()
class AuthUser extends User {
  @Field({ nullable: true })
  accessToken?: string
}

export { AuthUser }
