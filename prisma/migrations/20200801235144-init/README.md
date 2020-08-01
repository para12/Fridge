# Migration `20200801235144-init`

This migration has been generated at 8/1/2020, 11:51:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."foods" DROP COLUMN "kind";

ALTER INDEX "public"."foods_id_idx" RENAME TO "foods.id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200801235144-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model foods {
+  date     Int
+  id       String @unique
+  name     String
+  quantity String
+  shelf    String
+}
+
+// enum 사용에 대해 더 알아봐야 함
```


