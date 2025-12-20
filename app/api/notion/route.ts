import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    // Initialize Supabase client at runtime, not build time
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          name: body?.name,
          email: body?.email,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505' && error.message.includes('duplicate key')) {
        return NextResponse.json(
          { success: false, error: "Email already registered" },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: "Failed to add email to database" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
