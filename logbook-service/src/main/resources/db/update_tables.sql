
-- add new column Speed
ALTER TABLE workout ADD COLUMN speed integer;
UPDATE workout SET speed = 1 WHERE sonstiges like '%peed%';

-- alter datatype for column schlaf
ALTER TABLE workout ALTER COLUMN schlaf TYPE numeric USING schlaf::numeric;
ALTER TABLE status ALTER COLUMN schlaf TYPE numeric USING schlaf::numeric;
