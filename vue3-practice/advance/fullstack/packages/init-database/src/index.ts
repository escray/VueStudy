/* eslint-disable no-console */
import {
  database,
  querySQLByPool,
  queryDatabaseSQLByPool,
  queryDatabaseSQL,
  closePools
} from './util'
import sqlUserInfo from './sql/user_info.sql?raw'
import sqlPageInfo from './sql/page_info.sql?raw'
import sqlPageSnapshot from './sql/page_snapshot.sql?raw'
import sqlMaterialInfo from './sql/material_info.sql?raw'
import sqlMaterialSnapshot from './sql/material_snapshot.sql?raw'
import sqlInsertUserInfo from './sql/insert_user_info.sql?raw'
import sqlInsertMaterialInfo from './sql/insert_material_info.sql?raw'
import sqlInsertMaterialSnapshot from './sql/insert_material_snapshot.sql?raw'

async function initDatabase() {
  const sqlDB = `CREATE DATABASE IF NOT EXISTS ${database};`
  await querySQLByPool(sqlDB)
  console.log(`Operation Platform - Database ${database} create success!`)

  await queryDatabaseSQLByPool(sqlUserInfo)
  console.log('Operation Platform - user_info Table created sucdess')

  await queryDatabaseSQLByPool(sqlPageInfo)
  console.log('Operation Platform - page_info Table created sucdess')

  await queryDatabaseSQLByPool(sqlPageSnapshot)
  console.log('Operation Platform - page_snapshot Table created sucdess')

  await queryDatabaseSQLByPool(sqlMaterialInfo)
  console.log('Operation Platform - material_info Table created sucdess')

  await queryDatabaseSQLByPool(sqlMaterialSnapshot)
  console.log('Operation Platform - material_snapshot Table created sucdess')

  await closePools()

  const userInfoCount: { user_count: number }[] = (await queryDatabaseSQL(
    'SELECT COUNT(*) AS user_count FROM user_info;',
    []
  )) as { user_count: number }[]

  if (userInfoCount?.[0]?.user_count === 0) {
    console.log(
      `Operation Platform - database ${database}.user_info Table has not data`
    )
    await queryDatabaseSQL(sqlInsertUserInfo, [])
    console.log(
      `Operation Platform - database ${database}.user_info insert init data success`
    )
    console.log(`Opertioan Platform - ${database}.user_info init success`)
  }

  const materialInfoCount: { material_count: number }[] =
    (await queryDatabaseSQL(
      'SELECT COUNT(*) AS material_count FROM material_info;',
      []
    )) as { material_count: number }[]

  if (materialInfoCount?.[0]?.material_count === 0) {
    console.log(
      `Operation Platform - database ${database}.material_info Table has not data`
    )
    await queryDatabaseSQL(sqlInsertMaterialInfo, [])
    console.log(
      `Operation Platform - database ${database}.material_info insert init data success`
    )
    console.log(`Opertioan Platform - ${database}.material_info init success`)
  }

  const materialSnapshotCount: { snapshot_count: number }[] =
    (await queryDatabaseSQL(
      'SELECT COUNT(*) AS snapshot_count FROM material_snapshot;',
      []
    )) as { snapshot_count: number }[]

  if (materialSnapshotCount?.[0]?.snapshot_count === 0) {
    console.log(
      `Operation Platform - database ${database}.material_snapshot Table has not data`
    )
    await queryDatabaseSQL(sqlInsertMaterialSnapshot, [])
    console.log(
      `Operation Platform - database ${database}.material_snapshot insert init data success`
    )
    console.log(
      `Opertioan Platform - ${database}.material_snapshot init success`
    )
  }
}

async function init() {
  await initDatabase()
}

init()
