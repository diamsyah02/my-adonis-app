'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authentication {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    try {
      await auth.check()
      await next()
    } catch (error) {
      return response.status(401).json({
        status: 'failed',
        message: 'Tidak ada atau token tidak cocok !',
      })
    }
  }
}

module.exports = Authentication
