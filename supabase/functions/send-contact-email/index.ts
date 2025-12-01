import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  service: string
  message?: string
  submitted_at: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const contactData: ContactFormData = await req.json()

    // Validate API key
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    console.log('Sending email for:', contactData.name, contactData.email)

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Bobedi IT Group <onboarding@resend.dev>',
        to: ['kamohelo.mokoteli@yahoo.com'],  // Changed to your verified email
        subject: `New Contact Form: ${contactData.service} - ${contactData.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0066cc; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #0066cc; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🔔 New Contact Form Submission</h2>
                <p>Someone has submitted the contact form on your website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${contactData.name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
                </div>
                ${contactData.phone ? `
                <div class="field">
                  <div class="label">📱 Phone:</div>
                  <div class="value"><a href="tel:${contactData.phone}">${contactData.phone}</a></div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">💼 Service Interest:</div>
                  <div class="value">${contactData.service}</div>
                </div>
                ${contactData.message ? `
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${contactData.message}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">🕐 Submitted:</div>
                  <div class="value">${new Date(contactData.submitted_at).toLocaleString('en-ZA', { 
                    dateStyle: 'full', 
                    timeStyle: 'short',
                    timeZone: 'Africa/Johannesburg'
                  })}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from Bobedi IT Group contact form</p>
                <p>Visit your <a href="https://supabase.com">Supabase Dashboard</a> to view all submissions</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    })

    const data = await res.json()

    console.log('Resend API response:', data)

    if (res.ok) {
      console.log('Email sent successfully!')
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      console.error('Resend API error:', data)
      throw new Error(data.message || 'Failed to send email')
    }

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check Edge Function logs for more information' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})