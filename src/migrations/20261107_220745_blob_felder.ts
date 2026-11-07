import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dokumente" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "_dokumente_v" ADD COLUMN "version__objectkey" varchar;
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dokumente" DROP COLUMN "_objectkey";
  ALTER TABLE "_dokumente_v" DROP COLUMN "version__objectkey";
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}
