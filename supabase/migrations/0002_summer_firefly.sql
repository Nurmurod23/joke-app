/*
  # Fix Schema and Add Profiles Table

  1. Changes
    - Add profiles table for user information
    - Update jokes table to reference profiles
    - Fix RLS policies
    - Add function for vote counting
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for creating profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

-- Update jokes policies
DROP POLICY IF EXISTS "Authenticated users can create jokes" ON jokes;
CREATE POLICY "Authenticated users can create jokes"
  ON jokes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Create function to count votes
CREATE OR REPLACE FUNCTION get_vote_count(joke_id uuid)
RETURNS bigint AS $$
  SELECT COUNT(*)
  FROM votes
  WHERE votes.joke_id = $1;
$$ LANGUAGE sql;