import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { AuthInput, GetMeInput } from './input'
import { prismaClient } from '../../database/prismaClient'
import { hash, secret } from '../../config'
import { AuthUser } from './model'
import { User } from '../UserResolver/model'

import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

export function verifyToken(authToken?: string) {
  let data: { userId?: string } = {
    userId: undefined,
  }

  if (!authToken) throw new Error('Você não está autenticado!')
  if (!authToken?.startsWith('Bearer') || !authToken)
    throw new Error('Você não está autenticado!')

  const parts = authToken.split(' ')

  if (parts.length !== 2) throw new Error('Token error!')

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) throw new Error('Token mal formatado!')

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) throw new Error('Token inválido!')

    data = { userId: user?.id }
  })

  return data
}

@Resolver()
class AuthResolver {
  // AUTHENTICATION
  @Mutation(() => AuthUser)
  async signIn(@Arg('authInput') { email, password }: AuthInput) {
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: {
        profile: true,
        student: { include: { enrollments: true, preEnrollments: true } },
        educator: { include: { enrollments: true } },
      },
    })

    if (!user) {
      throw new Error('Usuário ou senha incorretos!')
    }

    const hashedPassword = CryptoJS.AES.decrypt(user?.password, hash).toString(
      CryptoJS.enc.Utf8
    )

    if (hashedPassword !== password) {
      throw new Error('Usuário ou senha incorretos!')
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: '2d' }
    )

    return { ...user, accessToken }
  }

  @Query(() => User)
  async getMe(@Arg('getMeInput') { token }: GetMeInput) {
    const { userId } = verifyToken(token)

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        isAdmin: true,
        profile: true,
        student: { include: { enrollments: true, preEnrollments: true } },
        educator: { include: { enrollments: true } },
      },
    })

    return user
  }
}

export { AuthResolver }
