import { Field, InputType } from 'type-graphql'

@InputType()
class AuthInput {
  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
class GetMeInput {
  @Field()
  token: string
}

export { AuthInput, GetMeInput }
