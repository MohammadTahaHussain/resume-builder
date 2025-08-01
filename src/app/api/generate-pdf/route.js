import { NextResponse } from 'next/server';
import playwright from 'playwright-core';
import sparticuzChromium from '@sparticuz/chromium';

export async function POST(request) {
  try {
    const { htmlContent, resumeData, templateType } = await request.json();

    // Launch browser correctly for Vercel
    const browser = await playwright.chromium.launch({
      // sparticuzChromium se zaroori settings istemal karen
      args: sparticuzChromium.args,
      executablePath: await sparticuzChromium.executablePath(),
      headless: sparticuzChromium.headless,
    });

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
          /* Aapki custom styles yahan reh sakti hain */
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Content set karen aur CDN script ke load hone ka intezar karen
    await page.setContent(completeHtmlContent, {
      waitUntil: 'networkidle',
    });

    // PDF generate karen
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

    // PDF response bhejen
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