# Quick Email Setup Commands

## Prerequisites
1. Install Node.js if not already installed
2. Install Supabase CLI globally

## Step-by-Step Commands

### 1. Install Supabase CLI
```powershell
npm install -g supabase
```

### 2. Login to Supabase
```powershell
supabase login
```

### 3. Link Your Project
```powershell
cd C:\Users\Kamono\desktop\Bobedi_IT_Group
supabase link --project-ref eylfkeqjgvlnmvbkxedv
```

### 4. Set Resend API Key as Secret
```powershell
# Replace YOUR_RESEND_API_KEY with your actual key from resend.com
supabase secrets set RESEND_API_KEY=YOUR_RESEND_API_KEY
```

### 5. Deploy the Edge Function
```powershell
supabase functions deploy send-contact-email
```

### 6. Your Function URL Will Be:
```
https://eylfkeqjgvlnmvbkxedv.supabase.co/functions/v1/send-contact-email
```

## Next: Set Up Database Trigger

After deploying the function, run the SQL from `setup-email-trigger.sql` in Supabase SQL Editor.

Remember to replace:
- `YOUR_EDGE_FUNCTION_URL` with the function URL above
- `YOUR_SERVICE_ROLE_KEY` with your service role key from Supabase Settings → API

## Test the Function

```powershell
# PowerShell test command
$headers = @{
    "Authorization" = "Bearer YOUR_ANON_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    name = "Test User"
    email = "test@example.com"
    service = "web-development"
    message = "Test message"
    submitted_at = (Get-Date).ToString("o")
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://eylfkeqjgvlnmvbkxedv.supabase.co/functions/v1/send-contact-email" -Method Post -Headers $headers -Body $body
```

## Common Issues

### If CLI installation fails:
Try running PowerShell as Administrator

### If login doesn't work:
Go to https://app.supabase.com/account/tokens and create a new access token

### If deployment fails:
Check that you're in the correct directory and the function file exists at:
`supabase/functions/send-contact-email/index.ts`