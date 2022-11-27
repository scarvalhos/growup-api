import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prismaClient } from '../../database/prismaClient'
import { User } from '../UserResolver/model'
import { hash } from '../../config'

import CryptoJS from 'crypto-js'
import { ModuleInput } from './input'
import { Module } from './model'

@Resolver()
class ModuleResolver {
  // GET USERS LIST
  // @Query(() => [User])
  // async getUsers() {
  //   const users = await prismaClient.user.findMany({
  //     include: { profile: true },
  //   })
  //   return users
  // }
  // // GET USER BY ID
  // @Query(() => User)
  // async getUser(@Arg('id') id: string) {
  //   const user = await prismaClient.user.findUnique({
  //     where: { id },
  //     include: { profile: true },
  //   })
  //   if (!user) {
  //     throw new Error('Usuário não encontrado!')
  //   }
  //   return user
  // }
  // CREATE USER
  // @Mutation(() => Module)
  // async createModule(
  //   @Arg('enrollmentInput') ModuleInput: ModuleInput
  // ) {
  //   const enrollment = await prismaClient.enrollment.create({
  //     data: {
  //       title: enrollmentInput.title,
  //       description: enrollmentInput.description,
  //       ...enrollmentInput.students?.map((i) => {
  //         return {
  //           students: {
  //             connect: {
  //               id: i,
  //             },
  //           },
  //         }
  //       }),
  //       ...enrollmentInput.educators?.map((i) => {
  //         return {
  //           educators: {
  //             connect: {
  //               id: i,
  //             },
  //           },
  //         }
  //       }),
  //     },
  //     include: { educators: true, students: true },
  //   })
  //   console.log(enrollment)
  //   return enrollment
  // }
  // GET USER BY ID
  // @Mutation(() => String)
  // async deleteUser(@Arg('id') id: string) {
  //   const user = await prismaClient.user.findUnique({ where: { id } })
  //   if (!user) {
  //     throw new Error('Usuário não encontrado!')
  //   }
  //   await prismaClient.user.delete({
  //     where: { id },
  //   })
  //   return 'Usuário excluido com sucesso!'
  // }
  // @Mutation(() => User)
  // async updateUser(
  //   @Arg('userInput')
  //   userInput: UserUpdateInput
  // ) {
  //   const user = await prismaClient.user.findUnique({
  //     where: { id: userInput.id || '' },
  //   })
  //   if (!user) {
  //     throw new Error('Usuário não encontrado!')
  //   }
  //   return prismaClient.user.update({
  //     where: { id: userInput.id },
  //     include: { profile: true },
  //     data: {
  //       email: userInput.email,
  //       isAdmin: userInput.isAdmin || false,
  //       profile: {
  //         upsert: {
  //           create: {
  //             birthDate: userInput.profile?.birthDate || '',
  //             completeName: userInput.profile?.completeName || '',
  //             phone: userInput.profile?.phone || '',
  //             avatar: userInput.profile?.avatar,
  //             cpf: userInput.profile?.cpf || '',
  //           },
  //           update: {
  //             birthDate: userInput.profile?.birthDate || '',
  //             completeName: userInput.profile?.completeName || '',
  //             phone: userInput.profile?.phone || '',
  //             avatar: userInput.profile?.avatar,
  //             cpf: userInput.profile?.cpf || '',
  //           },
  //         },
  //       },
  //     },
  //   })
  // }
}

export { ModuleResolver }
