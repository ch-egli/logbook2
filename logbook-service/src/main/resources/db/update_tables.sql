
-- add new column Speed
ALTER TABLE workout ADD COLUMN speed integer;
UPDATE workout SET speed = 1 WHERE sonstiges like '%peed%';

-- alter datatype for column schlaf
ALTER TABLE workout ALTER COLUMN schlaf TYPE numeric USING schlaf::numeric;
ALTER TABLE status ALTER COLUMN schlaf TYPE numeric USING schlaf::numeric;

-- add new columns gefuehl_k and gefuehl_m and initialize them with gefuehl
ALTER TABLE status ADD COLUMN gefuehl_k NUMERIC(3,1);
UPDATE status SET gefuehl_k = gefuehl;
ALTER TABLE status ADD COLUMN gefuehl_m NUMERIC(3,1);
UPDATE status SET gefuehl_m = gefuehl;


ALTER TABLE workout ADD COLUMN gefuehl_k NUMERIC(3,1);
UPDATE workout SET gefuehl_k = gefuehl;
ALTER TABLE workout ADD COLUMN gefuehl_m NUMERIC(3,1);
UPDATE workout SET gefuehl_m = gefuehl;
