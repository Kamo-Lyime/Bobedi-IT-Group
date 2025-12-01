// Supabase Configuration for Bobedi IT Group
// Replace these with your actual Supabase credentials

const SUPABASE_CONFIG = {
    url: 'https://eylfkeqjgvlnmvbkxedv.supabase.co', // e.g., 'https://xxxxx.supabase.co'
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bGZrZXFqZ3Zsbm12Ymt4ZWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODkwNjIsImV4cCI6MjA3OTk2NTA2Mn0.lEETpmNY7YPQF3KxChtZsTPBDyHyZMPBL2v9wbvy6gc' // Your public anon key
};

// Initialize Supabase client (using CDN version)
let supabaseClient = null;

// Initialize Supabase when the library is loaded
function initializeSupabase() {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('Supabase initialized successfully');
        return true;
    } else {
        console.warn('Supabase library not loaded. Form submissions will use fallback method.');
        return false;
    }
}

// Submit contact form to Supabase
async function submitToSupabase(formData) {
    if (!supabaseClient) {
        throw new Error('Supabase client not initialized');
    }

    try {
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    submitted_at: new Date().toISOString(),
                    status: 'new'
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error submitting to Supabase:', error);
        throw error;
    }
}

// Get all contact submissions (for admin dashboard)
async function getContactSubmissions(limit = 50) {
    if (!supabaseClient) {
        throw new Error('Supabase client not initialized');
    }

    try {
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .select('*')
            .order('submitted_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching submissions:', error);
        throw error;
    }
}

// Update submission status
async function updateSubmissionStatus(id, status) {
    if (!supabaseClient) {
        throw new Error('Supabase client not initialized');
    }

    try {
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error updating submission status:', error);
        throw error;
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSupabase,
        submitToSupabase,
        getContactSubmissions,
        updateSubmissionStatus,
        SUPABASE_CONFIG
    };
}