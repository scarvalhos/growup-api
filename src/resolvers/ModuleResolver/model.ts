import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Module {
  @Field()
  title: string

  @Field()
  description: string

  @Field((_type) => [String], { nullable: true })
  classes: string[]
}

export { Module }
