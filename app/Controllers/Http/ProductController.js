'use strict'

const Database = use('Database')
const table = 'products'
let res = []
let status = 200

class ProductController {
    async index({ response }) {
        let data = await Database.table(table)
        return response.status(status).json({
            status: 'success',
            message: 'Mengambil semua data product berhasil',
            data: data
        })
    }

    async show({ params, response }) {
        let data = await Database.table(table).where('id', params.id).first()
        if(data) {
            status = 200
            res = {
                status: 'success',
                message: `Mengambil data product dengan id ${params.id} berhasil`,
                data: data
            }
        } else {
            status = 400
            res = {
                status: 'failed',
                message: `Tidak ada data product dengan id ${params.id}`,
            }
        }
        return response.status(status).json(res)
    }

    async store({ request, response }) {
        const post = request.all()
        const save = await Database.table(table).insert(post)
        if(save) {
            status = 200
            res = {
                status: 'success',
                message: 'Menambahkan data product baru berhasil',
            }
        } else {
            status = 400
            res = {
                status: 'failed',
                message: 'Menambahkan data product baru gagal',
            }
        }
        return response.status(status).json(res)
    }

    async update({ params, request, response }) {
        const post = request.all()
        const upd = await Database.table(table).where('id', params.id).update(post)
        if(upd) {
            status = 200
            res = {
                status: 'success',
                message: `Mengubah data product dengan id ${params.id} berhasil`,
            }
        } else {
            status = 400
            res = {
                status: 'failed',
                message: `Mengubah data product dengan id ${params.id} gagal`,
            }
        }
        return response.status(status).json(res)
    }

    async delete({ params, response }) {
        const del = await Database.table(table).where('id', params.id).delete()
        if(del) {
            status = 200
            res = {
                status: 'success',
                message: `Menghapus data product dengan id ${params.id} berhasil`,
            }
        } else {
            status = 400
            res = {
                status: 'failed',
                message: `Menghapus data product dengan id ${params.id} gagal`,
            }
        }
        return response.status(status).json(res)
    }
}

module.exports = ProductController
