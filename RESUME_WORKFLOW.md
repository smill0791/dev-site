# Resume Workflow Guide

This document explains how to maintain your resume using the markdown + manual PDF workflow.

## Overview

**Workflow Philosophy:**
- `RESUME_DRAFT.md` serves as the **readable reference** - easy to read, edit, and copy-paste
- `public/resume.pdf` is the **downloadable file** - manually updated when you make changes
- No automation - full control over PDF formatting

## File Locations

- **Markdown Resume:** `RESUME_DRAFT.md` (project root)
- **PDF Resume:** `public/resume.pdf` (served on your website)
- **Git Status:** Markdown is in `.gitignore`, PDF is tracked in git

## Editing Your Resume

### Step 1: Edit the Markdown File

1. Open `RESUME_DRAFT.md` in your editor
2. Make your changes (it's easy to read and edit in markdown)
3. Save the file

**That's it for editing!** The markdown file is your source of truth.

### Step 2: Update the PDF (When Ready)

When you want to update the downloadable PDF on your website:

1. Open `RESUME_DRAFT.md`
2. Copy all the content
3. Use one of the methods below to create a PDF
4. Save the PDF as `public/resume.pdf` (replace the existing file)

---

## Methods for Creating PDF from Markdown

### Method 1: Google Docs (Recommended)

**Best for:** Easy formatting, professional output, cloud access

**Steps:**
1. Open [Google Docs](https://docs.google.com)
2. Create a new document
3. Paste the content from `RESUME_DRAFT.md`
4. Format the document:
   - Adjust headings (H1, H2, H3)
   - Format bullet points
   - Adjust spacing and margins
   - Set professional fonts (e.g., Arial, Calibri, or Times New Roman)
5. Go to **File → Download → PDF Document (.pdf)**
6. Save the file as `resume.pdf`
7. Move it to `public/resume.pdf` (replace existing file)

**Tips:**
- Use consistent formatting throughout
- Keep it to 1-2 pages if possible
- Use professional fonts and spacing
- Ensure good contrast for printing

---

### Method 2: Microsoft Word

**Best for:** Advanced formatting, templates, offline editing

**Steps:**
1. Open Microsoft Word
2. Create a new document
3. Paste the content from `RESUME_DRAFT.md`
4. Format the document:
   - Apply heading styles
   - Format bullet points
   - Adjust margins (0.5-0.75 inches recommended)
   - Choose professional fonts
5. Go to **File → Save As**
6. Choose **PDF** as the file type
7. Save as `resume.pdf`
8. Move it to `public/resume.pdf` (replace existing file)

**Tips:**
- Use Word's built-in resume templates for inspiration
- Ensure consistent spacing between sections
- Use page breaks if needed to control page layout

---

### Method 3: Online Markdown to PDF Converters

**Best for:** Quick conversion, minimal formatting needed

**Steps:**
1. Open `RESUME_DRAFT.md`
2. Copy all content
3. Go to an online converter:
   - [Markdown to PDF](https://www.markdowntopdf.com/)
   - [Dillinger](https://dillinger.io/) (export as PDF)
   - [StackEdit](https://stackedit.io/) (export as PDF)
4. Paste markdown content
5. Export/download as PDF
6. Move to `public/resume.pdf` (replace existing file)

**Note:** These tools provide basic formatting. You may want to do additional formatting in Word/Google Docs.

---

### Method 4: VS Code with Markdown PDF Extension

**Best for:** Developers who want to stay in their editor

**Steps:**
1. Install the "Markdown PDF" extension in VS Code
2. Open `RESUME_DRAFT.md` in VS Code
3. Right-click in the editor
4. Select **Markdown PDF: Export (pdf)**
5. The PDF will be generated in the same directory
6. Move it to `public/resume.pdf` (replace existing file)

**Note:** You may need to customize CSS for better formatting.

---

### Method 5: Print to PDF from Markdown Viewer

**Best for:** Quick preview and print

**Steps:**
1. Open `RESUME_DRAFT.md` in a markdown viewer:
   - VS Code with Markdown Preview
   - MacDown (macOS)
   - Marked 2 (macOS)
   - Any markdown preview tool
2. Preview the rendered markdown
3. Use **Print → Save as PDF** (or Cmd+P → Save as PDF on Mac)
4. Save as `resume.pdf`
5. Move to `public/resume.pdf` (replace existing file)

**Note:** Formatting may be basic, but it's quick.

---

## When to Update the PDF

Update the PDF when:
- ✅ You make significant changes to your resume content
- ✅ You're preparing for job applications
- ✅ You want to ensure the downloadable version is current
- ✅ Before deploying your site

**You don't need to update the PDF:**
- ❌ For minor typos (unless you're actively job searching)
- ❌ For every small edit to the markdown
- ❌ If you're just experimenting with content

**Best Practice:** Update the PDF when you're ready to share your resume or before important updates to your site.

---

## Workflow Summary

```
Edit RESUME_DRAFT.md
    ↓
Make changes (easy to read/edit)
    ↓
When ready to update PDF:
    ↓
Copy markdown content
    ↓
Paste into Google Docs/Word
    ↓
Format professionally
    ↓
Export as PDF
    ↓
Save to public/resume.pdf
    ↓
Done! PDF is now updated on your site
```

---

## Tips for Professional PDF Formatting

### Layout
- **Margins:** 0.5-0.75 inches on all sides
- **Length:** 1-2 pages (2 pages max for experienced professionals)
- **Font Size:** 10-12pt for body, 14-16pt for headings
- **Line Spacing:** 1.0-1.15 for readability

### Content Organization
- **Header:** Name, title, contact info at top
- **Sections:** Clear section breaks with headings
- **Bullet Points:** Use consistent bullet style (• or -)
- **Dates:** Right-align dates for experience entries
- **Skills:** Group related skills together

### Visual Design
- **Fonts:** Use professional fonts (Arial, Calibri, Times New Roman, Georgia)
- **Colors:** Black text on white (unless applying to creative roles)
- **Consistency:** Same formatting throughout
- **Whitespace:** Adequate spacing between sections

### ATS (Applicant Tracking System) Friendly
- Use standard section headings (Experience, Education, Skills)
- Avoid images, graphics, or complex layouts
- Use standard fonts
- Save as PDF (not Word) for consistency
- Include keywords relevant to your field

---

## Troubleshooting

### PDF looks different than markdown
- **Normal:** Markdown is for reading, PDF is for professional presentation
- **Solution:** Format the PDF in Word/Google Docs for best results

### PDF file is too large
- **Solution:** Use "Reduce File Size" option in Word/Google Docs before saving

### Formatting gets messed up when copying
- **Solution:** Copy section by section, or use "Paste Special → Plain Text" then format manually

### PDF doesn't update on website
- **Check:** Make sure you saved to `public/resume.pdf` (not root directory)
- **Check:** Clear browser cache or do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- **Check:** If using Vercel, the deployment should pick up the new file automatically

---

## Quick Reference

| Task | File | Action |
|------|------|--------|
| Edit resume | `RESUME_DRAFT.md` | Edit in any text editor |
| Update PDF | `public/resume.pdf` | Replace with new PDF |
| View on site | `/resume.pdf` | Access via download button |

---

## Benefits of This Workflow

✅ **Easy Editing:** Markdown is simple to read and edit  
✅ **Full Control:** You control PDF formatting exactly  
✅ **No Dependencies:** No scripts or automation to maintain  
✅ **Professional Output:** Can use Word/Google Docs templates  
✅ **Version Control:** Markdown changes are easy to track (if not in .gitignore)  
✅ **Flexibility:** Can format PDF differently for different purposes  

---

## Need Help?

If you need to update the PDF:
1. Follow one of the methods above
2. The most reliable method is Google Docs or Word
3. Take your time with formatting - it's worth it for a professional resume

Remember: The markdown file is your source of truth. The PDF is just the formatted version for download.
