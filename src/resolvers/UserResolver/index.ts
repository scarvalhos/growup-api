import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserInput, UserUpdateInput } from './input'
import { prismaClient } from '../../database/prismaClient'
import { User } from './model'
import { hash } from '../../config'

import CryptoJS from 'crypto-js'

@Resolver()
class UserResolver {
  // GET USERS LIST
  @Query(() => [User])
  async getUsers() {
    const users = await prismaClient.user.findMany({
      include: {
        profile: true,
        student: { include: { enrollments: true, preEnrollments: true } },
        educator: { include: { enrollments: true } },
      },
    })
    return users
  }

  // GET USER BY ID
  @Query(() => User)
  async getUser(@Arg('id') id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
      include: {
        profile: true,
        student: { include: { enrollments: true, preEnrollments: true } },
        educator: { include: { enrollments: true } },
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    return user
  }

  // CREATE USER
  @Mutation(() => User)
  async createUser(@Arg('userInput') userInput: UserInput) {
    const user = await prismaClient.user.findUnique({
      where: { email: userInput.email },
      include: {
        profile: true,
      },
    })

    if (user) {
      throw new Error('Usuário já existe!')
    }

    return prismaClient.user.create({
      data: {
        email: userInput.email,
        password: CryptoJS.AES.encrypt(userInput.password, hash).toString(),
        isAdmin: userInput.isAdmin,
        profile: {
          create: {
            birthDate: userInput.profile?.birthDate || '',
            completeName: userInput.profile?.completeName || '',
            phone: userInput.profile?.phone || '',
            avatar: userInput.profile?.avatar,
            cpf: userInput.profile?.cpf || '',
          },
        },
      },
    })
  }

  // DELETE USER BY ID
  @Mutation(() => String)
  async deleteUser(@Arg('id') id: string) {
    const user = await prismaClient.user.findUnique({ where: { id } })

    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    await prismaClient.user.delete({
      where: { id },
    })

    return 'Usuário excluido com sucesso!'
  }

  // UPDATE USER
  @Mutation(() => User)
  async updateUser(
    @Arg('userInput')
    userInput: UserUpdateInput
  ) {
    const user = await prismaClient.user.findUnique({
      where: { id: userInput.id || '' },
    })

    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    return prismaClient.user.update({
      where: { id: userInput.id },
      include: {
        profile: true,
        student: { include: { enrollments: true, preEnrollments: true } },
        educator: { include: { enrollments: true } },
      },
      data: {
        email: userInput.email,
        isAdmin: userInput.isAdmin || false,
        profile: {
          upsert: {
            create: {
              birthDate: userInput.profile?.birthDate || '',
              completeName: userInput.profile?.completeName || '',
              phone: userInput.profile?.phone || '',
              avatar: userInput.profile?.avatar,
              cpf: userInput.profile?.cpf || '',
            },
            update: {
              birthDate: userInput.profile?.birthDate || '',
              completeName: userInput.profile?.completeName || '',
              phone: userInput.profile?.phone || '',
              avatar: userInput.profile?.avatar,
              cpf: userInput.profile?.cpf || '',
            },
          },
        },
      },
    })
  }
}

export { UserResolver }
