import { ApprovePreEnrollmentInput, PreEnrollmentInput } from './input'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { PreEnrollment } from './model'
import { prismaClient } from '../../database/prismaClient'

@Resolver()
class PreEnrollmentResolver {
  // GET ENROLLMENTS LIST
  @Query(() => [PreEnrollment])
  async getPreEnrollments() {
    const enrollments = await prismaClient.preEnrollment.findMany({
      select: {
        id: true,
        status: true,
        createdAt: true,
        enrollment: { select: { id: true, title: true, description: true } },
        student: { include: { user: { include: { profile: true } } } },
      },
    })
    return enrollments
  }

  // GET ENROLLMENT BY ID
  @Query(() => PreEnrollment)
  async getPreEnrollment(@Arg('id') id: string) {
    const preEnrollment = await prismaClient.preEnrollment.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        createdAt: true,
        enrollment: { select: { id: true, title: true, description: true } },
        student: { include: { user: { include: { profile: true } } } },
      },
    })

    if (!preEnrollment) {
      throw new Error('Pré-matrícula não encontrada!')
    }

    return preEnrollment
  }

  // CREATE USER
  @Mutation(() => PreEnrollment)
  async createPreEnrollment(
    @Arg('preEnrollmentInput') preEnrollmentInput: PreEnrollmentInput
  ) {
    const preEnrollmentDb = await prismaClient.preEnrollment.findFirst({
      where: {
        AND: {
          studentId: preEnrollmentInput.studentId,
          enrollmentId: preEnrollmentInput.enrollmentId,
        },
      },
    })

    if (preEnrollmentDb) {
      throw new Error('Parece que você já está pré-matriculado nesse curso!')
    }

    const preEnrollment = await prismaClient.preEnrollment.create({
      data: {
        status: preEnrollmentInput.status,
        enrollment: { connect: { id: preEnrollmentInput.enrollmentId } },
        student: { connect: { id: preEnrollmentInput.studentId } },
      },
      select: {
        id: true,
        status: true,
        enrollmentId: true,
        studentId: true,
        enrollment: true,
        student: { include: { user: true } },
        createdAt: true,
      },
    })

    return preEnrollment
  }

  // APPROVE PRE_ENROLLMENT
  @Mutation(() => PreEnrollment)
  async approvePreEnrollment(
    @Arg('approvePreEnrollmentInput')
    approvePreEnrollmentInput: ApprovePreEnrollmentInput
  ) {
    const preEnrollmentDb = await prismaClient.preEnrollment.findFirst({
      where: {
        AND: {
          studentId: approvePreEnrollmentInput.studentId,
          enrollmentId: approvePreEnrollmentInput.enrollmentId,
        },
      },
    })

    if (!preEnrollmentDb) {
      throw new Error('Pré-matrícula não encontrada!')
    }

    const preEnrollment = await prismaClient.preEnrollment.update({
      where: {
        id: approvePreEnrollmentInput.id,
      },
      data: {
        status: approvePreEnrollmentInput.status,
      },
      select: {
        id: true,
        status: true,
        enrollmentId: true,
        studentId: true,
        enrollment: true,
        student: { include: { user: true } },
        createdAt: true,
      },
    })

    await prismaClient.enrollment.update({
      where: { id: preEnrollment.enrollmentId },
      data: {
        students: { connect: { id: preEnrollment.studentId } },
      },
    })

    return preEnrollment
  }
}

export { PreEnrollmentResolver }
