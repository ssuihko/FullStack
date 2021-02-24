
require('dotenv').config()

const PORT = process.env.PORT
const MONGOPASS = process.env.MONGOPASS

module.exports = {
  MONGOPASS,
  PORT
}