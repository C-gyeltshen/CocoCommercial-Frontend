import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vhlhoymotkhuaccwysuo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobGhveW1vdGtodWFjY3d5c3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjkyNjgsImV4cCI6MjA0ODcwNTI2OH0.QqExBarpYZVYUvtSBS9Qj9aQRHiAhc7T9TzRaMsmu5I')

async function uploadFile(event) {
    try {
        const avatarFile = event.target.files[0]
        const fileName = `public/avatar-${Date.now()}.png`
        const { data, error } = await supabase
            .storage
            .from('avatars')
            .upload(fileName, avatarFile, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Upload error:', error)
        } else {
            console.log('Upload success:', data)
        }
    } catch (error) {
        console.error('Unexpected error:', error)
    }
}
