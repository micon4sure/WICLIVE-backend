import fs from 'fs'

const sslDir = process.env.SSL_DIR || '/home/micon/tt-ssh'

export default () => {
  return {
    key: fs.readFileSync(`${sslDir}/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${sslDir}/cert.pem`, 'utf8')
  }
}