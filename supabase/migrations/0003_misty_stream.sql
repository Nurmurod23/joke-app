/*
  # Fix Database Relationships and Add Indexes

  1. Changes
    - Ensure profiles exist for all joke authors
    - Add foreign key from jokes to profiles
    - Add performance indexes
    
  2. Safety Measures
    - Check and create missing profiles before adding constraints
    - Use IF NOT EXISTS for idempotent operations
*/

-- First ensure profiles exist for all authors
DO $$ 
BEGIN
  INSERT INTO profiles (id, email)
  SELECT DISTINCT j.author_id, u.email
  FROM jokes j
  JOIN auth.users u ON u.id = j.author_id
  WHERE NOT EXISTS (
    SELECT 1 FROM profiles p WHERE p.id = j.author_id
  );
END $$;

-- Now safe to add the foreign key constraint
ALTER TABLE jokes
DROP CONSTRAINT IF EXISTS jokes_author_id_fkey;

ALTER TABLE jokes
ADD CONSTRAINT jokes_author_id_fkey 
  FOREIGN KEY (author_id) 
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS jokes_author_id_idx ON jokes(author_id);
CREATE INDEX IF NOT EXISTS jokes_category_idx ON jokes(category);
CREATE INDEX IF NOT EXISTS votes_joke_id_idx ON votes(joke_id);
CREATE INDEX IF NOT EXISTS votes_user_id_idx ON votes(user_id);