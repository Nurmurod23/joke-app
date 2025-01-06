/*
  # Add settings column to profiles table
  
  1. Changes
    - Add JSONB settings column to profiles table
    - Set default empty JSON object
    - Add validation check for settings structure
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}'::jsonb;

-- Add check constraint to ensure settings has valid structure
ALTER TABLE profiles
ADD CONSTRAINT valid_settings_structure
CHECK (
  (settings IS NULL) OR (
    jsonb_typeof(settings) = 'object' AND
    (settings->>'preferredCategories' IS NULL OR jsonb_typeof(settings->'preferredCategories') = 'array') AND
    (settings->>'emailNotifications' IS NULL OR jsonb_typeof(settings->'emailNotifications') = 'boolean') AND
    (settings->>'theme' IS NULL OR settings->>'theme' IN ('light', 'dark', 'system')) AND
    (settings->>'displayName' IS NULL OR jsonb_typeof(settings->'displayName') = 'string')
  )
);