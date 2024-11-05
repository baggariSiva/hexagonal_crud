export interface DBConfigOptions {
  type:
    | 'mysql'
    | 'postgres'
    | 'mariadb'
    | 'sqlite'
    | 'aurora-mysql'
    | 'oracle'
    | 'mssql'
    | 'aurora-postgres';
  host: string;
  username: string;
  password: string;
  database: string;
  port?: number;
  synchronize?: boolean;
  logging?: boolean;
  migrationsRun?: boolean;
  migrationsTableName?: string;
  migrations?: string[];
}
