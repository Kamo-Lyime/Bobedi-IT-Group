# Simplified Email Setup - No CLI Method

Since Supabase CLI can be tricky, here's an easier method using the Supabase Dashboard directly.

## 🚀 Easy Method: Manual Setup (10 minutes)

### **Step 1: Get Resend API Key**

1. Go to https://resend.com and sign up (FREE)
2. Click **API Keys** → **Create API Key**
3. Copy the API key (starts with `re_...`)

---

### **Step 2: Create Edge Function in Supabase Dashboard**

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Click **"Create a new function"**
3. Name: `send-contact-email`
4. **Copy and paste this code:**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, service, message, submitted_at } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Bobedi IT Group <onboarding@resend.dev>',
        to: ['bobedi.it@gmail.com'],
        subject: `New Contact: ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Service:</strong> ${service}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p><strong>Time:</strong> ${new Date(submitted_at).toLocaleString()}</p>
        `,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
```

5. Click **"Deploy function"**

---

### **Step 3: Add Resend API Key as Secret**

1. In same Edge Function page, click **"Secrets"** tab
2. Click **"Add secret"**
3. Name: `RESEND_API_KEY`
4. Value: Paste your Resend API key
5. Click **"Save"**

---

### **Step 4: Get Function URL**

After deployment, you'll see the URL:
```
https://eylfkeqjgvlnmvbkxedv.supabase.co/functions/v1/send-contact-email
```

Copy this URL!

---

### **Step 5: Set Up Database Trigger**

1. Go to **Supabase** → **SQL Editor**
2. **Copy and paste this SQL:**

```sql
-- Enable HTTP extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create trigger function
CREATE OR REPLACE FUNCTION trigger_send_contact_email()
RETURNS TRIGGER AS $$
DECLARE
  function_url text := 'https://eylfkeqjgvlnmvbkxedv.supabase.co/functions/v1/send-contact-email';
  service_role_key text := 'YOUR_SERVICE_ROLE_KEY';
BEGIN
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
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

-- Create trigger
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;
CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_send_contact_email();
```

3. **Replace `YOUR_SERVICE_ROLE_KEY`** with your actual key from:
   - Supabase → Settings → API → service_role (the long secret key)

4. Click **"Run"**

---

### **Step 6: Test!**

1. Submit a form on your website
2. Check **bobedi.it@gmail.com**
3. You should receive an email! ✅

---

## ✅ Success Checklist

- [ ] Resend account created
- [ ] Resend API key copied
- [ ] Edge function created in dashboard
- [ ] RESEND_API_KEY secret added
- [ ] Function deployed
- [ ] Database trigger SQL run
- [ ] Service role key replaced in SQL
- [ ] Test form submitted
- [ ] Email received

---

## 🔧 Troubleshooting

**No email received?**
1. Check Resend dashboard → Emails → See delivery status
2. Check spam folder
3. Check Supabase → Edge Functions → Logs for errors
4. Test function directly from Supabase dashboard

**Function error?**
1. Make sure RESEND_API_KEY secret is set correctly
2. Check function logs for specific error messages

---

This method is easier than CLI and works perfectly!