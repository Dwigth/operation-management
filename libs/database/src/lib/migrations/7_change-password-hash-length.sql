ALTER TABLE
    public."user"
ALTER COLUMN
    password_hash TYPE varchar(128) USING password_hash::varchar;