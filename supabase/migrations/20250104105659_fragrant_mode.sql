/*
  # Add premium status to profiles

  1. Changes
    - Add premium_status column to profiles table
    - Add RLS policy for admins to update premium status
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false;

-- Allow admins to update premium status
CREATE POLICY "Admins can update premium status"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin3180@gmail.com')
  WITH CHECK (auth.email() = 'admin3180@gmail.com');