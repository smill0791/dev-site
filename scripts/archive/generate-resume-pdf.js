import { mdToPdf } from 'md-to-pdf'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

async function generateResumePDF() {
  try {
    console.log('📄 Generating resume PDF...')
    
    const markdownPath = join(rootDir, 'RESUME_DRAFT.md')
    const outputPath = join(rootDir, 'public', 'resume.pdf')
    
    // Read the markdown file
    const markdown = readFileSync(markdownPath, 'utf-8')
    
    // Configure PDF options with better Puppeteer settings
    const pdf = await mdToPdf(
      { content: markdown },
      {
        pdf_options: {
          format: 'Letter',
          margin: {
            top: '0.75in',
            right: '0.75in',
            bottom: '0.75in',
            left: '0.75in',
          },
          printBackground: true,
        },
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
          headless: true,
          timeout: 60000,
        },
        stylesheet: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
          }
          h1 {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 8pt;
            color: #1a1a1a;
          }
          h2 {
            font-size: 16pt;
            font-weight: bold;
            margin-top: 16pt;
            margin-bottom: 8pt;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 4pt;
          }
          h3 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 12pt;
            margin-bottom: 6pt;
            color: #34495e;
          }
          p {
            margin-bottom: 8pt;
          }
          ul, ol {
            margin-bottom: 8pt;
            padding-left: 20pt;
          }
          li {
            margin-bottom: 4pt;
          }
          strong {
            font-weight: 600;
          }
          hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 16pt 0;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
        `,
      }
    )
    
    if (pdf) {
      writeFileSync(outputPath, pdf.content)
      console.log('✅ Resume PDF generated successfully at:', outputPath)
    } else {
      throw new Error('PDF generation returned null')
    }
  } catch (error) {
    console.error('❌ Error generating PDF:', error.message)
    console.error('\n💡 Tip: If you see timeout errors, try:')
    console.error('   1. Make sure Chrome/Chromium is installed')
    console.error('   2. Run: npm run generate-resume')
    console.error('   3. Or manually convert RESUME_DRAFT.md to PDF using a markdown viewer')
    process.exit(1)
  }
}

generateResumePDF()
