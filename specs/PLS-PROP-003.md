# PLS-PROP-003: Track photo count per property

**Status:** Done
Add a `photo_count` column to properties (integer, default 0) so later screens can show how many photos a building has. No screen change in this spec.

## Acceptance tests
1. Migration adds `properties.photo_count`, not null, default 0.
2. Existing rows read as 0 after the migration.
