# Email Notifications Setup Guide

## 📧 Receive Email Notifications for Contact Form Submissions

This guide will help you set up automatic email notifications to **bobedi.it@gmail.com** whenever someone submits your contact form.

---

## 🚀 Quick Setup (15 minutes)

### **Step 1: Create Resend Account** (2 minutes)

1. Go to https://resend.com
2. Click **"Start Building"**
3. Sign up with your email
4. Verify your email address

**FREE TIER INCLUDES:**
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ No credit card required

---

### **Step 2: Get Resend API Key** (1 minute)

1. In Resend dashboard, click **"API Keys"**
2. Click **"Create API Key"**
3. Name it: `Bobedi IT Contact Form`
4. **Copy the API key** (you'll need it in Step 4)

---

### **Step 3: Deploy Supabase Edge Function** (5 minutes)

#### **Option A: Using Supabase CLI (Recommended)**

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link your project:**
   ```bash
   cd C:\Users\Kamono\desktop\Bobedi_IT_Group
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   (Find your project ref in Supabase Dashboard → Settings → General → Reference ID)

4. **Set the Resend API key as a secret:**
   ```bash
   supabase secrets set RESEND_API_KEY=your_resend_api_key_here
   ```

5. **Deploy the function:**
   ```bash
   supabase functions deploy send-contact-email
   ```

6. **Get your function URL:**
   ```
   https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-contact-email
   ```

#### **Option B: Manual Deployment (If CLI doesn't work)**

1. Go to Supabase Dashboard → **Edge Functions**
2. Click **"Create a new function"**
3. Name: `send-contact-email`
4. Copy the content from `supabase/functions/send-contact-email/index.ts`
5. Paste it into the function editor
6. Click **"Deploy"**
7. Go to **Settings** → **Secrets** → Add secret:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key

---

### **Step 4: Set Up Database Trigger** (3 minutes)

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Copy this SQL:

```sql
-- Enable the pg_net extension (for HTTP requests)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function that will be triggered on insert
CREATE OR REPLACE FUNCTION trigger_send_contact_email()
RETURNS TRIGGER AS $$
DECLARE
  function_url text := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-contact-email';
  service_role_key text := 'YOUR_SERVICE_ROLE_KEY';
BEGIN
  PERFORM
    net.http_post(
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

-- Create the trigger
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_send_contact_email();
```

4. **Replace these values:**
   - `YOUR_PROJECT_REF` → Your Supabase project reference ID
   - `YOUR_SERVICE_ROLE_KEY` → Found in Supabase → Settings → API → service_role key

5. Click **"Run"**

---

### **Step 5: Test the Setup** (2 minutes)

1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check **bobedi.it@gmail.com** inbox
5. You should receive a beautiful formatted email! ✅

---

## 📧 **What the Email Looks Like:**

The email will include:
- **Name** of the person
- **Email** (clickable mailto link)
- **Phone** (clickable tel link)
- **Service Interest**
- **Message**
- **Submission Date/Time** (South Africa timezone)
- Professional branded design

---

## 🔧 **Troubleshooting**

### **Not receiving emails?**

1. **Check Resend Dashboard:**
   - Go to Resend → Logs
   - See if emails are being sent

2. **Check Spam folder** in bobedi.it@gmail.com

3. **Test the Edge Function directly:**
   ```bash
   curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-contact-email \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "service": "web-development",
       "message": "Test message",
       "submitted_at": "2025-12-01T10:00:00Z"
     }'
   ```

4. **Check Supabase Logs:**
   - Supabase Dashboard → Edge Functions → send-contact-email → Logs

---

## 🎨 **Customization**

### **Change Email Recipient:**
Edit `supabase/functions/send-contact-email/index.ts`:
```typescript
to: ['bobedi.it@gmail.com'], // Add more emails: ['email1@example.com', 'email2@example.com']
```

### **Change Email Template:**
Edit the HTML section in `index.ts` to customize colors, layout, etc.

### **Use Custom Domain:**
After verifying your domain in Resend:
```typescript
from: 'Contact Form <noreply@bobediitgroup.co.za>',
```

---

## 💰 **Costs**

- **Resend Free Tier:** 3,000 emails/month (more than enough)
- **Supabase:** Edge Functions are free on all plans
- **Total Cost:** $0/month for typical usage

---

## 🔐 **Security Notes**

- ✅ Service role key is stored securely in database
- ✅ Resend API key is stored as Supabase secret
- ✅ No sensitive keys exposed in client code
- ✅ All emails sent server-side

---

## 📊 **Monitoring**

### **View Email Delivery:**
- Resend Dashboard → Emails → See all sent emails
- Check delivery status, open rates, etc.

### **View Form Submissions:**
- Supabase Dashboard → Table Editor → contact_submissions
- Or use your admin dashboard at `/admin.html`

---

## ✅ **Success Checklist**

- [ ] Resend account created
- [ ] Resend API key obtained
- [ ] Supabase Edge Function deployed
- [ ] RESEND_API_KEY secret set
- [ ] Database trigger created
- [ ] Test email received
- [ ] Production ready!

---

## 🚀 **Next Steps**

1. **Verify your domain** in Resend to use custom email addresses
2. **Set up email templates** for different services
3. **Add auto-reply** to customers thanking them for their inquiry
4. **Monitor** email delivery in Resend dashboard

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Contact: Check Resend and Supabase community forums