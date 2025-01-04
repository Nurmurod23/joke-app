/*
  # Initial Jokes Application Schema

  1. New Tables
    - `jokes`
      - `id` (uuid, primary key)
      - `content` (text, the joke text)
      - `category` (text, joke category)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `votes`
      - `id` (uuid, primary key)
      - `joke_id` (uuid, references jokes)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Policies for jokes:
      - Anyone can read jokes
      - Authenticated users can create jokes
      - Authors can update/delete their own jokes
    - Policies for votes:
      - Authenticated users can create/read votes
      - Users can only vote once per joke
*/

-- Create jokes table
CREATE TABLE IF NOT EXISTS jokes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  category text NOT NULL,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  joke_id uuid REFERENCES jokes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(joke_id, user_id)
);

-- Enable RLS
ALTER TABLE jokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Jokes policies
CREATE POLICY "Anyone can read jokes"
  ON jokes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create jokes"
  ON jokes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their jokes"
  ON jokes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their jokes"
  ON jokes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Votes policies
CREATE POLICY "Users can read votes"
  ON votes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create votes"
  ON votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for jokes
CREATE TRIGGER update_jokes_updated_at
  BEFORE UPDATE ON jokes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();