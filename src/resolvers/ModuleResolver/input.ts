import { Field, InputType } from 'type-graphql'

@InputType()
class ModuleInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field((_type) => [String], { nullable: true })
  classes: string[]
}

export { ModuleInput }
