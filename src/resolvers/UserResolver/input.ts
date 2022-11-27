import { Field, ID, InputType } from 'type-graphql'

@InputType()
class ProfileInput {
  @Field()
  cpf: string

  @Field()
  completeName: string

  @Field()
  birthDate: string

  @Field()
  phone: string

  @Field()
  avatar: string
}

@InputType()
class UserInput {
  @Field((_type) => ID, { nullable: true })
  id?: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  isAdmin: boolean

  @Field((_type) => ProfileInput, { nullable: true })
  profile?: ProfileInput
}

@InputType()
class ProfileUpdateInput {
  @Field({ nullable: true })
  cpf?: string

  @Field({ nullable: true })
  completeName?: string

  @Field({ nullable: true })
  birthDate?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  avatar?: string
}

@InputType()
class UserUpdateInput {
  @Field((_type) => String)
  id: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  isAdmin?: boolean

  @Field((_type) => ProfileUpdateInput, { nullable: true })
  profile?: ProfileUpdateInput
}

export { UserInput, UserUpdateInput }
