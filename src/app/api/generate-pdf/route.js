import { chromium } from 'playwright-core';

export async function POST(request) {
  try {
    const { htmlContent, resumeData, templateType } = await request.json();

    // Launch browser with fallback options
    let browser;
    try {
      // Try to use @sparticuz/chromium
      const chromiumExecutablePath = await import('@sparticuz/chromium').then(
        (chromiumPackage) => chromiumPackage.executablePath
      );
      browser = await chromium.launch({
        executablePath: chromiumExecutablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } catch (error) {
      // Fallback to system Chrome or default
      console.log('Using system Chrome as fallback');
      browser = await chromium.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();

    // Set viewport for A4 size with optimized dimensions
    await page.setViewportSize({ width: 794, height: 1123 }); // A4 dimensions

    // Create complete HTML document with the rendered template
    const completeHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume - ${resumeData.name || 'Your Name'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { 
              margin: 0; 
              padding: 0;
            }
            .resume-container { 
              width: 100%; 
              height: 100vh; 
              padding: 16px;
              box-sizing: border-box;
            }
          }
          /* Ensure proper styling for PDF */
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .resume-container {
            max-width: 100%;
            margin: 0 auto;
            background-color: white;
          }
        </style>
      </head>
      <body>
        <div class="resume-container" style="
          background-color: white;
          padding: 0px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.4;
          color: #374151;
          max-width: 100%;
          margin: 0 auto;
        ">
          ${htmlContent}
        </div>
      </body>
      </html>
    `;

    // Set content and wait for it to load
    await page.setContent(completeHtmlContent);
    await page.waitForLoadState('networkidle');

    // Generate PDF with reduced margins
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.25in',
        right: '0.25in',
        bottom: '0.25in',
        left: '0.25in'
      }
    });

    await browser.close();

    // Return PDF buffer
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.name || 'resume'}_${templateType}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation failed:', error);
    return new Response(JSON.stringify({ error: 'PDF generation failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 