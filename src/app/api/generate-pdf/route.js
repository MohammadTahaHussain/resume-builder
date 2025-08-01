import { NextResponse } from 'next/server';
import playwright from 'playwright-core';
import sparticuzChromium from '@sparticuz/chromium';

export async function POST(request) {
  try {
    const { htmlContent, resumeData, templateType } = await request.json();

    let browser;
    const isProduction = process.env.NODE_ENV === 'production';

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

    // CDN ke saath aapka HTML content
    const completeHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume - ${resumeData?.name || 'Your Name'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    await page.setContent(completeHtmlContent, {
      waitUntil: 'networkidle',
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData?.name || 'resume'}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation failed:', error);
    return NextResponse.json(
      { error: `PDF generation failed: ${error.message}` },
      { status: 500 }
    );
  }
}