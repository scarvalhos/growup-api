import { EducatorInput, linkEnrollmentToEducatorInput } from './input'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { prismaClient } from '../../database/prismaClient'
import { Educator } from './model'

@Resolver()
class EducatorResolver {
  // CREATE EDUCATOR
  @Mutation(() => Educator)
  async createEducator(@Arg('educatorInput') educatorInput: EducatorInput) {
    const educator = await prismaClient.educator.create({
      data: {
        user: { connect: { id: educatorInput.userId } },
      },
    })

    return educator
  }

  @Mutation(() => Educator)
  async linkEnrollmentToEducator(
    @Arg('linkInput') linkInput: linkEnrollmentToEducatorInput
  ) {
    const educator = await prismaClient.educator.update({
      where: {
        id: linkInput.educatorId,
      },
      data: {
        enrollments: { connect: { id: linkInput.enrollemntId } },
      },
      include: {
        user: true,
        enrollments: true,
        students: true,
      },
    })

    return educator
  }
}

export { EducatorResolver }
