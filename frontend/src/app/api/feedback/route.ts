// pages/api/feedback.ts or app/api/feedback/route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import axios from "axios";

// // Initialize Brevo with your API key
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_V3_KEY || ""
// ); // Ensure this environment variable is set

// Define expected request body type
interface CampaignRequest {
  name: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  listIds: number[];
  message: string;
}

// For App Router (Next.js 13+)
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, subject, senderName, senderEmail, message } =
      (await request.json()) as CampaignRequest;

    // Validate required fields
    if (!name || !subject || !senderName || !senderEmail) {
      return NextResponse.json(
        {
          error:
            "Name, subject, senderName, senderEmail, and listIds are required",
        },
        { status: 400 }
      );
    }

    const body = {
      sender: { name: "Joen Tan", email: "joentze01@gmail.com" },
      to: [{ email: "smuprojectubinkakis@gmail.com" }],
      subject,
      htmlContent: message,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_V3_KEY || "",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: JSON.stringify(response.data),
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// For App Router, also handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
