# Project Deep Dive: nopedat

## Overview

`nopedat` is a browser-first, serverless note platform designed around shareable document identifiers and a multi-view architecture. Instead of a single monolithic editor, the application exposes the same underlying note content through a variety of specialized routes—ranging from a compatibility-focused plain text editor to a rich code environment with live previews, markdown rendering, and an encrypted secret-note flow.

The project is entirely serverless; the repository contains only the client-side application and Firebase configuration. All backend concerns—hosting, persistence, authentication, and access enforcement—are delegated to **Firebase Hosting**, **Firestore**, and **Firebase Authentication**.

## The User Experience: Route-Oriented Views

The application is driven by the URL, where the active note is identified by a document ID (`docId`).

- **Addressing**: Notes are typically accessed via query strings (e.g., `/?<docId>` for the main editor, `/code/?<docId>` for the code editor). The secret-note route is the exception, using a URL hash (`/secret/#<docId>`) to ensure the raw identifier is never sent to the server or stored in browser history.
- **Note Creation**: When no ID is present, the app generates a short random string client-side and redirects the user to a new note.
- **The Main Editor**: A lightweight, textarea-based experience. It is deliberately kept simple and transpiled to **ES5** to ensure compatibility with legacy devices and older browsers.
- **The Code Editor**: A professional-grade editing surface featuring language selection, per-note language preference caching, and on-demand formatting via Prettier.
- **Specialized Rendering Routes**:
  - `/markdown`: Renders note text live using a bundled `marked` build, extended with `marked-highlight` for syntax highlighting and `marked-katex-extension` for mathematical notation.
  - `/mermaid`: Renders diagrams directly using the Mermaid runtime.
  - `/play`, `/script`, and `/react`: Provide live, iframe-based previews for HTML, JavaScript, and JSX/React content.
  - `/qrcode`: Generates a scannable QR code of the note while allowing lightweight, debounced editing of the source text.
  - `/download`: Detects `data:` URLs to offer typed file downloads (with MIME-to-extension mapping) and inline image previews; otherwise, it exports notes as `.txt` files.
  - `/history`: A local browser-based history of recently visited notes.
  - `/account`: A management area for authenticated users to claim ownership of notes, and manage their claimed list.

## Technical Architecture

### The Preview Pipeline
The code editor's live preview is powered by a dedicated **Web Worker** (`src/code/worker.js`) to keep the UI thread responsive.
- **Transformations**: The worker handles language-specific transformations:
  - **JSX/TSX**: Transpiled in-worker using `@babel/standalone` with React and TypeScript presets.
  - **Markdown**: Parsed to HTML via `marked`.
  - **HTML/JS/Mermaid**: Wrapped in specialized boilerplate documents.
- **Lightweight Bundling**: To keep the worker bundle small, heavy runtimes like **React 19.2.0** and **Mermaid 11** are loaded via versioned CDN assets within the generated preview documents.

### State and UI Philosophy
The project avoids heavy UI frameworks in favor of a minimalist, first-party stack:
- **DOM Construction**: Uses `@lamartinecabral/freedom`, a lightweight utility library for declarative DOM creation.
- **State Management**: Employs a custom `Subject` class—a simple observable implementation—to drive UI updates without the overhead of a global state container.
- **Caching**: Extensively uses `localStorage` for note text caching (for owners), theme preferences, and note history.

### Firebase Integration & Isolation
A key architectural detail is the use of **named Firebase App instances**. By calling `firebase.initApp(docId)`, the application isolates the Firebase Auth state per note. This enables a **per-note synthetic login model**, where an owner can authenticate using a generated email (`<docId>@notepade.web.app`) without affecting the authentication state of other open notes.

## Data Model & Security

### Firestore Schema & Rules
The primary data resides in the `docs` collection, where each document contains a `text` field and optional `protected` (UID) and `public` (boolean) flags. Access control is enforced strictly via **Firestore Security Rules**:
- **Atomic Updates**: Rules enforce that only one top-level field can be changed per operation (using `diff().affectedKeys()`), preventing accidental state corruption.
- **Access Tiers**:
  - **Unprotected**: Open read/write access for everyone.
  - **Protected**: Read/write access restricted to the user whose UID matches the `protected` field.
  - **Public**: A protected note can be made read-only for the public via the `public: true` flag.
- **Ownership**: A separate `ownerships` collection tracks account-based claims. Claiming a note requires a verified email and is blocked if the note is already `protected`.

### Secret Notes
Secret notes utilize a separate encrypted flow via `@lamartinecabral/sekret`. The note ID serves as the encryption key:
- The Firestore document key is derived by encrypting the ID with itself.
- The note body is encrypted before being written to Firestore and decrypted upon retrieval.
- This ensures that neither the document ID nor the content is stored in plaintext on the server.

## Build, Tooling & Deployment

### Multi-Tier Build Strategy
The project uses a multi-entry Webpack configuration to balance features and compatibility:
- **Modern Bundles**: Used for the majority of routes (Account, Code, Markdown, etc.).
- **Legacy Bundles**: The main editor and a Firebase 8 compatibility path are targeted to **ES5** to support older clients.

### Development & Quality Assurance
- **Type Safety**: The project uses plain JavaScript with `@ts-check` annotations and a repository-wide `tsc --noEmit` step for static type checking.
- **Deployment**: Deployed via Firebase Hosting. The deployment process includes a custom script that stamps the build with a commit SHA and timestamp.
- **Static Sync**: A `postinstall` script ensures that CDN references for internal dependencies (like `freedom`) always match the version pinned in `package.json`.
- **Testing**: A comprehensive E2E suite in `test/notepad.spec.js` validates the consistency of note content across all specialized routes.

## Overall Assessment

`nopedat` is a sophisticated example of a "no-backend" architecture. Its primary strength lies in its route-oriented design, which allows a single piece of data to be experienced in multiple contexts. By combining a strict, rule-driven security model in Firestore with a lightweight, framework-less frontend and a clever isolation strategy for Firebase apps, it achieves a high degree of flexibility and compatibility without the complexity of a custom application server.