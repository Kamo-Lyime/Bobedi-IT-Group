# Supabase Integration Setup Guide

## 📋 Overview
This guide will help you set up Supabase to receive and manage contact form submissions from your Bobedi IT Group website.

## 🚀 Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email
4. Free tier includes:
   - 500MB database
   - 1GB file storage
   - 2GB bandwidth
   - 50,000 monthly active users

## 🗄️ Step 2: Create a New Project

1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `Bobedi IT Group`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to South Africa (e.g., Cape Town or nearby)
   - **Pricing Plan**: Free
3. Click **"Create new project"**
4. Wait 2-3 minutes for project setup

## 📊 Step 3: Create Database Table

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL code:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_status ON contact_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated reads" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users to update submissions
CREATE POLICY "Allow authenticated updates" ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true);
```

4. Click **"Run"** or press `Ctrl+Enter`
5. You should see "Success. No rows returned"

## 🔑 Step 4: Get Your API Credentials

1. In Supabase dashboard, click **"Settings"** (left sidebar)
2. Click **"API"**
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## ⚙️ Step 5: Configure Your Website

1. Open `js/supabase-config.js` in your project
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',  // Paste your Project URL
    anonKey: 'your-anon-key-here'                 // Paste your anon public key
};
```

3. Save the file

## ✅ Step 6: Test the Integration

1. Open your website locally: `npm run dev`
2. Navigate to the contact form
3. Fill in the form and submit
4. Check Supabase dashboard:
   - Click **"Table Editor"** (left sidebar)
   - Select **"contact_submissions"**
   - You should see your test submission!

## 📧 Step 7: Set Up Email Notifications (Optional)

To receive email notifications when someone submits the form:

1. In Supabase dashboard, click **"Database"** → **"Functions"**
2. Create a new function called `notify_on_submission`
3. Or use a third-party service like:
   - **SendGrid** - Email delivery service
   - **Mailgun** - Email automation
   - **Zapier** - Connect Supabase to Gmail/Outlook

### Example: Using Supabase Database Webhooks

1. Go to **"Database"** → **"Webhooks"**
2. Click **"Create a new hook"**
3. Configure:
   - **Name**: `Email Notification`
   - **Table**: `contact_submissions`
   - **Events**: `INSERT`
   - **Type**: HTTP Request
   - **HTTP Request URL**: Your email service webhook URL

## 📱 Step 8: View Submissions Dashboard

You can view all submissions in Supabase:

1. Go to **"Table Editor"**
2. Select **"contact_submissions"**
3. You'll see all form submissions with:
   - Name, email, phone
   - Service interest
   - Message
   - Submission timestamp
   - Status (new, contacted, resolved, etc.)

## 🔐 Security Features Included

✅ **Row Level Security (RLS)** - Protects your data
✅ **Public inserts only** - Anyone can submit forms
✅ **Authenticated reads** - Only you can view submissions
✅ **HTTPS encryption** - All data transmitted securely
✅ **No API key exposure** - anon key is safe for public use

## 🚀 Deploy to GitHub Pages

The Supabase integration works perfectly with GitHub Pages:

1. Commit your changes:
```bash
git add .
git commit -m "Add Supabase integration for contact forms"
git push origin main
```

2. Your live website will now store all form submissions in Supabase!

## 📊 Managing Submissions

### Update Submission Status

You can update the status of submissions:

```javascript
// In browser console or create an admin page
await updateSubmissionStatus('submission-id', 'contacted');
// Status options: 'new', 'contacted', 'in-progress', 'resolved', 'spam'
```

### Export Data

1. In Supabase Table Editor
2. Click **"..."** menu
3. Select **"Download as CSV"**

## 🔧 Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify Supabase credentials in `supabase-config.js`
- Check if Supabase project is active

### Not receiving data?
- Verify table name is `contact_submissions`
- Check RLS policies are enabled
- Test with SQL Editor: `SELECT * FROM contact_submissions;`

### CORS errors?
- Supabase automatically handles CORS
- If issues persist, check Supabase project settings

## 💰 Pricing (as of 2025)

**Free Tier** (Perfect for small business):
- 500MB database
- 1GB file storage  
- 50,000 monthly active users
- Unlimited API requests

**Pro Tier** ($25/month):
- 8GB database
- 100GB file storage
- 100,000 monthly active users
- Daily backups

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [JavaScript Client Reference](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🎉 Success!

Your website now stores all contact form submissions securely in Supabase. You can access them anytime through the Supabase dashboard!

---

**Need Help?**
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- Documentation: [supabase.com/docs](https://supabase.com/docs)
- GitHub Issues: [github.com/supabase/supabase](https://github.com/supabase/supabase)