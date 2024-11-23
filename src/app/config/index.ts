import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    database_uri: process.env.DATABASE_URI,
    running_port: process.env.PORT
}