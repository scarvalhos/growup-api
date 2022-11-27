import 'reflect-metadata'

import { PreEnrollmentResolver } from './resolvers/PreEnrollmentResolver'
import { testPrismaConnection } from './database/prismaClient'
import { EnrollmentResolver } from './resolvers/EnrollmentResolver'
import { EducatorResolver } from './resolvers/EducatorResolver'
import { StudentResolver } from './resolvers/StudentResolver'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from './resolvers/UserResolver'
import { AuthResolver } from './resolvers/AuthResolver'
import { buildSchema } from 'type-graphql'

import path from 'path'

testPrismaConnection()

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AuthResolver,
      EnrollmentResolver,
      StudentResolver,
      EducatorResolver,
      PreEnrollmentResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })

  const server = new ApolloServer({
    schema,
  })

  const { url } = await server.listen({ port: 3333 })

  console.log(`Server running on ${url}`)
}

main()
