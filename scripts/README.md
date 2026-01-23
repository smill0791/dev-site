# Resume PDF Generation

This script converts `RESUME_DRAFT.md` to `public/resume.pdf` for download on your portfolio site.

## Usage

```bash
npm run generate-resume
```

## Requirements

- Node.js installed
- Chrome/Chromium browser (required by Puppeteer)

## Troubleshooting

If you encounter errors:

1. **Timeout errors**: Make sure Chrome/Chromium is installed on your system
2. **Permission errors**: The script uses Puppeteer which needs browser access
3. **Alternative method**: If the script doesn't work, you can manually convert:
   - Open `RESUME_DRAFT.md` in a markdown viewer
   - Copy the content
   - Paste into Google Docs or Word
   - Export as PDF
   - Save to `public/resume.pdf`

## How it works

The script:
1. Reads `RESUME_DRAFT.md` from the project root
2. Converts markdown to HTML with custom styling
3. Uses Puppeteer to render HTML to PDF
4. Saves the PDF to `public/resume.pdf`

## Updating the Resume

1. Edit `RESUME_DRAFT.md` with your resume content
2. Run `npm run generate-resume`
3. The PDF will be updated automatically
