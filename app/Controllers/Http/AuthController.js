'use strict'

const Database = use('Database')
const Hash = use('Hash')
const table = 'users'
let res = []
let status = 200

class AuthController {
    async login({ request, auth, response }) {
        const { email, password } = request.all()
        const check = await Database.table(table).where('email', email).first()
        if(check) {
            const passwordSame = await Hash.verify(password, check.password)
            if(passwordSame) {
                await auth.attempt(email, password)
                let accessToken = await auth.generate(check)
                status = 200
                res = {
                    status: 'success',
                    message: 'Login berhasil !',
                    token: accessToken
                }
            } else {
                status = 400
                res = {
                    status: 'failed',
                    message: 'Login tidak berhasil, password yang anda masukkan salah !'
                }   
            }
        } else {
            status = 400
            res = {
                status: 'failed',
                message: 'Login tidak berhasil, email yang anda masukkan belum terdaftar !'
            }
        }
        return response.status(status).json(res)
    }

    async register({ request, response }) {
        const { name, email, password } = request.all()
        const check = await Database.table(table).where('email', email).first()
        if(check) {
            status = 400
            res = {
                status: 'failed',
                message: 'Register tidak berhasil, email yang anda masukkan sudah terdaftar !',
            }
        } else {
            const reg = await Database.table(table).insert({
                name: name,
                email: email,
                password: await Hash.make(password)
            })
            if(reg) {
                status = 200
                res = {
                    status: 'success',
                    message: 'Register berhasil !',
                    data: request.all()
                }
            } else {
                status = 400
                res = {
                    status: 'failed',
                    message: 'Register tidak berhasil, terjadi suatu kesalahan, silahkan coba lagi !'
                }
            }
        }
        return response.status(status).json(res)
    }
}

module.exports = AuthController
