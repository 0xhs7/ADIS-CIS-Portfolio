# ADIS CIS Portfolio — shareable preview

A static preview for Adani International School, Ahmedabad. It includes the workbook's two main portfolio sections, folder explorer, document tracker, admin and assignee preview modes, reminders, Drive link panels, and activity log.

## Deploy on Vercel

1. Extract this ZIP.
2. Create a GitHub repository. Upload the **contents** of this folder so `index.html`, `data.json`, `styles.css` and `vercel.json` are at the repository root. Do not upload the ZIP itself as the website source.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Choose **Other** as the framework. Use the repository root as the Root Directory. Leave the Build Command empty and set Output Directory to `.`. The included `vercel.json` sets these values.
5. Deploy and share the URL returned by Vercel.

There is no dependency installation or compilation step. Official reference: https://vercel.com/docs/builds/configure-a-build

## Deploy on GitHub Pages instead

After uploading the contents to the root of a GitHub repository, open **Settings → Pages**. Select **Deploy from a branch**, choose `main` and `/ (root)`, and save. GitHub will provide the site URL. All asset references are relative, so repository subpaths work. The included `.nojekyll` file bypasses Jekyll processing.

Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Preview locally

From this folder, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173. JavaScript modules and the workbook data must be served over HTTP, not opened by double-clicking `index.html`.

## What this preview does

- Starts with 33 navigation folders and 112 named document requirements imported from the workbook.
- Lets visitors switch between Hiloni and existing assignee preview views.
- Stores edits and attachments in that visitor's browser only. Visitors do not share edits. Clearing browser storage removes their local edits.
- Marks new attachments received and lets Hiloni review them or request resubmission with a reason and optional due date.
- Shows Send reminder for pending documents. The reminder can be copied or opened in an email app. It does not send email automatically.
- Shows download options for received documents. A received status imported from Excel does not mean a file is attached. Attach a file or add its Drive link first.
- Lets Hiloni confirm that a Drive folder exists after adding its link. Confirmation is manual; this preview does not query the Drive API.
- Shows Drive previews when Google permits embedding. Existing Google permissions still apply. Some private folders and file types must be opened in Drive.

## Before using this for live collection

This is a demonstration, not an authenticated shared records system. The role switcher is not access control. Anyone who can open the hosted preview can view the included workbook document names and assignments. Use Vercel's access settings if you need to limit preview visitors.

Sign-in, server-side role enforcement, a shared database, Drive API upload integration, and connected email delivery are not included. Do not use the preview's local uploads as the only copy of school documents. Preview attachments are limited to 4 MB per file and the browser's total storage limit.

## Updating the shared starting data

Edit `data.json` and redeploy. It contains the workbook's initial records, not a copy of a visitor's local browser changes. A returning browser continues using its local saved state; use a new browser profile to check the deployed starting data. Document IDs are stable even where Excel codes repeat.

## Files

- `index.html`: page shell
- `styles.css`: consolidated styling and responsive layouts
- `app.js`: preview interactions
- `drive.js`: Google Drive link validation and folder summary
- `polish.js`: SVG icons and dashboard components
- `data.json`: initial folder and document data
- `assets/`: bundled school logo and favicon
- `vercel.json`: static Vercel configuration

Google Fonts is the only external styling dependency; system fonts are used if it is unavailable. The school logo is bundled locally. Drive frames load only after a Drive link is saved and opened.
