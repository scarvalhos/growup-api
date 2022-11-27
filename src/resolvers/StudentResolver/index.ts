import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prismaClient } from '../../database/prismaClient'
import { Student } from './model'

import {
  linkEducatorToStudentInput,
  linkEnrollemntToStudentInput,
  linkPreEnrollemntToStudentInput,
  StudentInput,
} from './input'

@Resolver()
class StudentResolver {
  // GET STUDENTs LIST
  @Query(() => [Student])
  async getStudents() {
    const students = await prismaClient.student.findMany({
      include: {
        enrollments: true,
        preEnrollments: true,
      },
    })
    return students
  }

  // CREATE STUDENT
  @Mutation(() => Student)
  async createStudent(@Arg('studentInput') studentInput: StudentInput) {
    const studentDb = await prismaClient.student.findFirst({
      where: { userId: studentInput.userId },
    })

    if (studentDb) {
      throw new Error('Estudante já cadastrado!')
    }

    const student = await prismaClient.student.create({
      data: {
        user: { connect: { id: studentInput.userId } },
      },
    })

    return student
  }

  @Mutation(() => Student)
  async linkEnrollmentToStudent(
    @Arg('linkInput') linkInput: linkEnrollemntToStudentInput
  ) {
    const student = await prismaClient.student.update({
      where: {
        id: linkInput.studentId,
      },
      data: {
        enrollments: { connect: { id: linkInput.enrollemntId } },
      },
      include: {
        // user: true,
        enrollments: true,
        educators: true,
        preEnrollments: true,
      },
    })

    return student
  }

  @Mutation(() => Student)
  async linkEducatorToStudent(
    @Arg('linkInput') linkInput: linkEducatorToStudentInput
  ) {
    const student = await prismaClient.student.update({
      where: {
        id: linkInput.studentId,
      },
      data: {
        educators: { connect: { id: linkInput.educatorId } },
      },
      include: {
        enrollments: true,
        educators: true,
        preEnrollments: true,
      },
    })

    return student
  }

  @Mutation(() => Student)
  async linkPreEnrollemntToStudent(
    @Arg('linkInput') linkInput: linkPreEnrollemntToStudentInput
  ) {
    const student = await prismaClient.student.update({
      where: {
        id: linkInput.studentId,
      },
      data: {
        preEnrollments: { connect: { id: linkInput.preEnrollemntId } },
      },
      include: {
        enrollments: true,
        educators: true,
        preEnrollments: true,
      },
    })

    return student
  }
}

export { StudentResolver }
