# Migration `20201127231112-init`

This migration has been generated by Gabriel-Paulucci at 11/27/2020, 8:11:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201127231112-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,11 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+    provider = "mysql"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
```


