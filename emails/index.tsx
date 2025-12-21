import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export const NotionWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Optify, {userFirstname}! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://optifyai.app/optify-logo-with-text.png`}
          width="200"
          height="67"
          alt="Optify Logo"
          style={{ display: "block", margin: "0 auto 20px 60px" }}
        />
        <Text style={greeting}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thanks for joining the Optify waitlist! We're excited to have you on board.
        </Text>
        <Text style={paragraph}>
          Optify is revolutionizing website optimization with smarter, AI-powered solutions.
          You'll be among the first to know when we launch and get exclusive early access.
        </Text>
        <Text style={paragraph}>
          We'll keep you updated on our progress. In the meantime, follow us on X/Twitter:{" "}
          <a href="https://x.com/optifyai" style={link}>
            @optifyai
          </a>
        </Text>
        <Text style={signOff}>
          Best regards,
          <br />
          The Optify Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          You received this email because you signed up for the Optify waitlist.
          If you believe this is a mistake, feel free to ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "Tyler",
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  background: "linear-gradient(-225deg, #0a0a0a 0%, #10B519 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#cccccc",
};

const container = {
  margin: "0 auto",
  padding: "24px 0 48px",
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#00FF0E",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
};
