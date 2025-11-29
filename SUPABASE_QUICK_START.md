# Supabase Integration - Quick Reference

## 🎯 What's Been Added

### Files Created/Modified:
- ✅ `js/supabase-config.js` - Supabase configuration
- ✅ `js/script.js` - Updated form handler with Supabase
- ✅ `index.html` - Added Supabase library
- ✅ `admin.html` - Admin dashboard to view submissions
- ✅ `SUPABASE_SETUP.md` - Complete setup guide

## ⚡ Quick Setup (5 Minutes)

### 1. Create Supabase Account
```
https://supabase.com → Sign Up → Create New Project
```

### 2. Run SQL in Supabase SQL Editor
```sql
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);
```

### 3. Update Configuration
Edit `js/supabase-config.js`:
```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_PROJECT_URL_HERE',
    anonKey: 'YOUR_ANON_KEY_HERE'
};
```

### 4. Deploy
```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

## 🔍 How to View Submissions

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. Select "contact_submissions"

### Option 2: Admin Dashboard
1. Open `admin.html` in your browser
2. Login with Supabase credentials
3. View, filter, and manage submissions

### Option 3: SQL Query
In Supabase SQL Editor:
```sql
SELECT * FROM contact_submissions 
ORDER BY submitted_at DESC;
```

## 📊 Features Included

✅ **Automatic Form Submission Storage**
- All contact form submissions saved to Supabase
- Real-time data storage
- Secure and encrypted

✅ **Status Management**
- Track submission status (new, contacted, resolved, etc.)
- Update from admin dashboard
- Filter by status

✅ **Admin Dashboard** (`admin.html`)
- View all submissions
- Update status
- Export to CSV
- Real-time statistics

✅ **Security**
- Row Level Security enabled
- Public can only insert (submit forms)
- Only authenticated users can read/update
- No sensitive data exposure

## 🚀 Testing

1. **Test Form Submission**
   ```
   Open index.html → Fill contact form → Submit
   ```

2. **Check Supabase**
   ```
   Supabase Dashboard → Table Editor → contact_submissions
   ```

3. **View in Admin Panel**
   ```
   Open admin.html → Login → See submissions
   ```

## 📧 Email Notifications (Optional)

To receive emails when forms are submitted:

1. **Use Supabase Database Webhooks**
   - Database → Webhooks → Create webhook
   - Trigger on INSERT to contact_submissions
   - Send to email service (SendGrid, Mailgun, etc.)

2. **Use Zapier**
   - Connect Supabase to Gmail/Outlook
   - Trigger: New row in contact_submissions
   - Action: Send email

3. **Use Make (formerly Integromat)**
   - Similar to Zapier
   - More affordable for high volume

## 🔧 Common Tasks

### View Recent Submissions
```sql
SELECT name, email, service, submitted_at 
FROM contact_submissions 
ORDER BY submitted_at DESC 
LIMIT 10;
```

### Count by Status
```sql
SELECT status, COUNT(*) 
FROM contact_submissions 
GROUP BY status;
```

### Mark as Contacted
```sql
UPDATE contact_submissions 
SET status = 'contacted' 
WHERE id = 'submission-id-here';
```

### Delete Test Submissions
```sql
DELETE FROM contact_submissions 
WHERE email LIKE '%test%';
```

## 💰 Free Tier Limits

- ✅ 500MB Database (thousands of submissions)
- ✅ Unlimited API requests
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth per month

**You won't hit limits with a small business website!**

## 🆘 Troubleshooting

### Form not saving?
1. Check browser console for errors
2. Verify Supabase URL and key in `supabase-config.js`
3. Check RLS policies are set correctly

### Can't login to admin panel?
1. Create user in Supabase: Authentication → Users → Add User
2. Or use SQL:
```sql
-- In Supabase SQL Editor (Dashboard requires auth)
SELECT * FROM contact_submissions; -- This will work
```

### CORS errors?
- Supabase handles CORS automatically
- Check if project is active
- Verify URL is correct

## 📚 Resources

- **Setup Guide**: See `SUPABASE_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs
- **Support**: https://discord.supabase.com

---

**Quick Start Checklist:**
- [ ] Create Supabase account
- [ ] Create project
- [ ] Run SQL to create table
- [ ] Copy URL and anon key
- [ ] Update `supabase-config.js`
- [ ] Test form submission
- [ ] Check data in Supabase
- [ ] Deploy to GitHub Pages

**Time to complete: ~5-10 minutes**