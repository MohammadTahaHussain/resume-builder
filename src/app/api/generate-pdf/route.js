import { NextResponse } from "next/server";
import playwright from "playwright-core";
import sparticuzChromium from "@sparticuz/chromium";

export async function POST(request) {
  try {
    const { htmlContent, resumeData, templateType, watermarkOptions } =
      await request.json();

    let browser;
    console.log("resumeData", resumeData);
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      // ✅ PRODUCTION (VERCEL) LOGIC
      // Vercel par sparticuzChromium istemal hoga
      browser = await playwright.chromium.launch({
        args: sparticuzChromium.args,
        executablePath: await sparticuzChromium.executablePath(),
        headless: sparticuzChromium.headless,
      });
    } else {
      // ✅ DEVELOPMENT (LOCAL) LOGIC
      // Local machine par playwright ka default browser istemal hoga
      // Iske liye `npx playwright install` command pehle se chali honi chahiye
      browser = await playwright.chromium.launch({
        headless: true, // Aap isse `false` karke browser dekh bhi sakte hain
      });
    }

    const page = await browser.newPage();

    // Watermark configuration from client
    const showWatermark = false;
    const watermarkText = "Resume Builder by Taha";
    const watermarkOpacity = "0.2"; // Very light watermark
    const watermarkColor = "#000000"; // Black color

    // CDN ke saath aapka HTML content with watermark
    const completeHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume - ${
          (resumeData?.personal?.name || resumeData?.name || 'Resume') + 
          (resumeData?.personal?.title ? ` - ${resumeData.personal.title}` : '')
        }</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            position: relative;
            min-height: 100vh;
          }
          
          /* Watermark Styles */
          .watermark {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            color: ${watermarkColor};
            opacity: ${watermarkOpacity};
            // transform: rotate(-45deg);
            pointer-events: none;
            z-index: 1000;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          
          /* Alternative: Diagonal watermark across the page */
          .watermark-diagonal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            color: ${watermarkColor};
            opacity: ${watermarkOpacity};
            pointer-events: none;
            z-index: 1000;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            white-space: nowrap;
          }
          
          /* Print styles for watermark */
          @media print {
            .watermark, .watermark-diagonal {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
        
        ${
          showWatermark
            ? `<!-- Bottom Right Watermark -->
        <div class="watermark">${watermarkText}</div>`
            : ""
        }
        
        <!-- Optional: Diagonal Watermark (uncomment to use) -->
        <!-- <div class="watermark-diagonal">${watermarkText}</div> -->
      </body>
      </html>
    `;

    await page.setContent(completeHtmlContent, {
      waitUntil: "networkidle",
    });

    // Set viewport for better PDF generation
    await page.setViewportSize({ width: 794, height: 1123 }); // A4 dimensions

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.25in",
        right: "0.25in",
        bottom: "0.25in",
        left: "0.25in",
      },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          (resumeData?.personal?.name || resumeData?.name || 'Resume') + 
          (resumeData?.personal?.title ? ` - ${resumeData.personal.title}` : '') + 
          '.pdf'
        }"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: `PDF generation failed: ${error.message}` },
      { status: 500 }
    );
  }
}
