-- ========================================
-- Database Trigger to Send Email on Form Submission
-- Run this in Supabase SQL Editor
-- ========================================

-- Create a function that will be triggered on insert
CREATE OR REPLACE FUNCTION trigger_send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function using pg_net extension
  PERFORM
    net.http_post(
      url := 'YOUR_EDGE_FUNCTION_URL/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || 'YOUR_SUPABASE_ANON_KEY'
      ),
      body := jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'phone', NEW.phone,
        'service', NEW.service,
        'message', NEW.message,
        'submitted_at', NEW.submitted_at
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_send_contact_email();

-- Verify trigger was created
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE event_object_table = 'contact_submissions';

SELECT 'Trigger created successfully!' as message;