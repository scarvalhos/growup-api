import 'dotenv/config'

const hash = process.env.SECRET_HASH as string
const secret = process.env.AUTH_SECRET as string

export { hash, secret }
