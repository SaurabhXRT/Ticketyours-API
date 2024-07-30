import bcrypt from "bcrypt"
class Hash {
  async passwordHash(password: string, saltRounds: number) {
    let hash = await bcrypt.hash(password, saltRounds)
    return hash
  }
  comparePasswordHash(plain: string, hash: string) {
    return bcrypt.compare(plain, hash)
  }
}
export { Hash }

