import { customAlphabet } from "nanoid"

/**
 * @description - Returns a random 6 digits OTP
 * @returns {string}
 */
export async function generateOTP() {
    return String(Math.floor(Math.random() * 1000000)).padEnd(6, "0")
}

export async function generateSecureRandomText(length: number) {
    return customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", length)()
}

export function convertJsDatetoSQLDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
