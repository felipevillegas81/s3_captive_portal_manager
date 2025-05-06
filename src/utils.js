import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

//Path
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

//Hash Password
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Compare Password
export const comparePassword = (user, password) => bcrypt.compareSync(password, user.password)