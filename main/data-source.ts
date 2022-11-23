import { DataSource } from 'typeorm'

import User from './models/User'
import { getDBPath } from './helpers/getDBPath'

export const AppDataSource = new DataSource({
  logging: true,
  synchronize: true,
  type: 'sqlite',
  entities: [User],
  database: getDBPath('db.sqlite3')
})
