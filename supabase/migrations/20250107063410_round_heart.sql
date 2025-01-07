/*
  # Add categories management
  
  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Only admin can manage categories
CREATE POLICY "Admin can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (auth.email() = 'admin3180@gmail.com')
  WITH CHECK (auth.email() = 'admin3180@gmail.com');

-- Everyone can read categories
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- Insert default categories
INSERT INTO categories (name) VALUES
  ('Dad Jokes'),
  ('Puns'),
  ('One-liners'),
  ('Knock-knock'),
  ('Programming')
ON CONFLICT (name) DO NOTHING;