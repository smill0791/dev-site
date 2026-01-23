# Archived Scripts

This folder contains archived scripts that are no longer in active use.

## generate-resume-pdf.js

**Status:** Archived - Not in use

**Reason:** Manual PDF workflow is preferred. This script was used to automatically generate PDF from markdown, but the workflow has been changed to manual PDF updates.

**To use (if needed):**
1. Move script back to `scripts/` folder
2. Install dependency: `npm install --save-dev md-to-pdf`
3. Add script to package.json: `"generate-resume": "node scripts/generate-resume-pdf.js"`
4. Run: `npm run generate-resume`

**Current Workflow:**
- Edit `RESUME_DRAFT.md` for easy reading and copy-pasting
- Manually create PDF using Google Docs/Word when needed
- Save PDF to `public/resume.pdf`
