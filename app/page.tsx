"use client";

import { toast } from "sonner";
import { useState } from "react";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please enter your name and email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, attempt to send the email
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        });

        if (!mailResponse.ok) {
          if (mailResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Email sending failed");
          }
          return; // Exit the promise early if mail sending fails
        }

        // If email sending is successful, proceed to insert into Notion
        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) {
            reject("Rate limited");
          } else if (notionResponse.status === 409) {
            reject("Duplicate email");
          } else {
            const errorData = await notionResponse.json();
            reject(errorData.error || "Database error");
          }
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Adding you to the waitlist...",
      success: (data) => {
        setName("");
        setEmail("");
        return "You're on the list! Check your email for confirmation.";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "Too many requests. Please try again in a minute.";
        } else if (error === "Email sending failed") {
          return "Couldn't send confirmation email. Please try again.";
        } else if (error === "Duplicate email") {
          return "This email is already on the waitlist!";
        } else if (error === "Database error" || error.includes("Failed to add email")) {
          return "Couldn't save your information. Please try again.";
        }
        return "Something went wrong. Please try again.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.015) 0%, transparent 70%)' }}></div>
        <div className="absolute top-10 right-1/4 h-[600px] w-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.012) 0%, transparent 70%)' }}></div>
        <div className="absolute top-1/2 right-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.018) 0%, transparent 70%)' }}></div>
        <div className="absolute top-2/3 left-1/4 h-[550px] w-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.015) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-20 right-1/2 h-[650px] w-[650px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.015) 0%, transparent 70%)' }}></div>
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.012) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-40 left-10 h-[520px] w-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0, 255, 14, 0.018) 0%, transparent 70%)' }}></div>
      </div>
      
      <section className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <Header />

        <CTA />

        <Form
          name={name}
          email={email}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </section>


      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#C7F5CB"}
        refresh
      />

    </main>
  );
}
