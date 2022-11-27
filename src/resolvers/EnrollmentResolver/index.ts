import { EnrollmentInput, linkEducatorToEnrollmentInput } from './input'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prismaClient } from '../../database/prismaClient'
import { Enrollment } from './model'

@Resolver()
class EnrollmentResolver {
  // GET ENROLLMENTS LIST
  @Query(() => [Enrollment])
  async getEnrollments() {
    const enrollments = await prismaClient.enrollment.findMany({
      include: {
        students: true,
        educators: true,
        modules: true,
        preEnrollments: true,
      },
    })
    return enrollments
  }

  // GET ENROLLMENT BY ID
  @Query(() => Enrollment)
  async getEnrollment(@Arg('id') id: string) {
    const enrollment = await prismaClient.enrollment.findUnique({
      where: { id },
      include: {
        students: true,
        educators: { include: { user: { include: { profile: true } } } },
        modules: {
          include: {
            classes: { include: { comments: { include: { user: true } } } },
          },
        },
        preEnrollments: true,
      },
    })

    if (!enrollment) {
      throw new Error('Curso não encontrado!')
    }

    return enrollment
  }

  // CREATE USER
  @Mutation(() => Enrollment)
  async createEnrollment(
    @Arg('enrollmentInput') enrollmentInput: EnrollmentInput
  ) {
    const enrollment = await prismaClient.enrollment.create({
      data: {
        title: enrollmentInput.title,
        description: enrollmentInput.description,
        modules: {
          createMany: { data: enrollmentInput.modules },
        },
      },
      include: {
        students: true,
        educators: { include: { user: { include: { profile: true } } } },
        modules: {
          include: {
            classes: { include: { comments: { include: { user: true } } } },
          },
        },
        preEnrollments: true,
      },
    })

    return enrollment
  }

  @Mutation(() => Enrollment)
  async linkEducatorToEnrollment(
    @Arg('linkInput') linkInput: linkEducatorToEnrollmentInput
  ) {
    const enrollment = await prismaClient.enrollment.update({
      where: {
        id: linkInput.enrollmentId,
      },
      data: {
        educators: { connect: { id: linkInput.educatorId } },
      },
      include: {
        students: true,
        educators: { include: { user: { include: { profile: true } } } },
        modules: {
          include: {
            classes: { include: { comments: { include: { user: true } } } },
          },
        },
        preEnrollments: true,
      },
    })

    return enrollment
  }
}

export { EnrollmentResolver }
