# Supabase Setup Instructions

## 1. Create a Supabase Account
Go to [supabase.com](https://supabase.com) and sign up for a free account.

## 2. Create a New Project
- Click "New Project"
- Choose a name (e.g., "optify-waitlist")
- Set a database password (save this!)
- Select a region close to your users

## 3. Create the Waitlist Table

Go to the SQL Editor in your Supabase dashboard and run this SQL:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows INSERT from service role
CREATE POLICY "Allow service role to insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows service role to read
CREATE POLICY "Allow service role to read" ON waitlist
  FOR SELECT
  USING (true);
```

## 4. Get Your API Keys

In your Supabase project dashboard:
1. Go to **Settings** → **API**
2. Copy the **Project URL** (starts with https://...)
3. Copy the **service_role** key (NOT the anon key - this has full access)

## 5. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL="your-project-url-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

RESEND_API_KEY="your-resend-key"

UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
```

## 6. View Your Waitlist

To see everyone who signed up:
1. Go to your Supabase dashboard
2. Click **Table Editor** in the sidebar
3. Select the **waitlist** table
4. You'll see all names and emails with timestamps

You can also query the data:
```sql
SELECT name, email, created_at 
FROM waitlist 
ORDER BY created_at DESC;
```

## 7. Export Your Waitlist

To export as CSV:
1. In Table Editor, click the **waitlist** table
2. Click the "..." menu in the top right
3. Select "Download as CSV"

## Notes

- The **service_role** key bypasses Row Level Security - keep it secret!
- Never commit your `.env.local` file to git
- Each email can only sign up once (enforced by UNIQUE constraint)
- All timestamps are in UTC

## Testing

After setup, test the form on your website. Check the Supabase Table Editor to confirm entries appear.
