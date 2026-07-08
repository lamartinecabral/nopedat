# nopedat
**The multi-view, serverless scratchpad.**

`nopedat` is a browser-first, serverless note platform that treats a single piece of data through multiple specialized lenses. Instead of just a single text editor, it provides a rich ecosystem of views—from professional code environments with live previews to markdown and mermaid rendering—all driven by the URL.

[Visit Live App](https://nopedat.web.app) | [Report a Bug](mailto:lamartine.cb@gmail.com)

---

## 💎 Architectural Highlights

`nopedat` is built on a **"no-backend"** philosophy, delegating infrastructure to Firebase while maintaining a sophisticated route-oriented architecture and unique security models.

### 🗺️ Route-Oriented Multi-View
The application's core UX is driven by the URL. A single `docId` can be experienced through many different interfaces:
* **Main Editor:** A lightweight, highly compatible text editor (transpiled to ES5) for maximum device support.
* **Code Editor:** A professional editing surface featuring language selection and on-demand formatting via Prettier.
* **Specialized Rendering Routes:** 
    * `/markdown`: Live rendering with syntax highlighting (`marked`, `katex`).
    * `/mermaid`: Direct diagram rendering using the Mermaid runtime.
    * `/play`, `/script`, & `/react`: Interactive, iframe-based live previews for HTML, JavaScript, and JSX/React content.
  * **Utility Views:** Specialized routes for QR code generation (`/qrcode`), intelligent file downloads (`/download`), and a local history view (`/history`).

### 🛡️ Per-Note Security Model
Using named Firebase App instances, `nopedat` implements a unique **synthetic login model**. Users can "claim" ownership of a note using a specific email format derived from the note's ID. This isolates authentication state per note, allowing users to manage multiple distinct notes without complex session switching or global account conflicts.

### 🏗️ Technical Stack
* **Infrastructure:** Fully serverless; powered by **Firebase** (Hosting, Firestore, Authentication).
* **State & UI:** A minimalist, framework-less approach using `@lamartinecabral/freedom` for declarative DOM construction and an observable `Subject`-based state management.
* **Performance:** Heavily leverages **Web Workers** to handle complex transformations (like Babel transpilation for JSX or Mermaid rendering) without blocking the main UI thread.

---

## 🚀 User Guide

### Quick Start
Create a unique space instantly by adding an identifier to the URL:
> `https://nopedat.web.app/?your_unique_string`

### Key Features
* **Instant Access:** No onboarding required for immediate use.
* **Persistent URLs:** Your notes stay tied to your chosen identifier.
* **Interactive Previews:** Transform code into live HTML/React previews instantly.
* **Optional Security:** Keep it open for collaboration or lock it down with a password.

---

## ⚠️ Security & Privacy

**Default to Public:** By default, anyone with your specific URL can view or edit your content.

* **Do not** store sensitive data, API keys, or private credentials in an unprotected note.
* **Encryption:** Note content is stored securely on Firestore but is **not** end-to-end encrypted. For high-security needs, use the [Secret Note](https://nopedat.web.app/secret) flow.

---

## 💬 FAQ

**Q. Does this app collect my personal data?**
A. If you use the app without an account, only the content of your notes is stored in our database—nothing more. If you choose to create an account, we will only collect the email address needed for your login.

**Q. Is there a way to protect my notes?**
A. Yes, you can add a password to your note. Just click the **Password** button in the upper right corner. *Please keep in mind that this password is used for access authentication, but the note's content is not end-to-end encrypted.*

**Q. I would like to make my note read-only. Is that possible?**
A. Yes! To allow others to view your note without being able to edit it:
1. Add a password to your note.
2. Click **Options** in the upper right corner.
3. Check both the **Protected** and **Public** boxes.

**Q. I forgot my note's password. How can I restore access to my note?**
A. For standalone notes, there is no way to recover or change a forgotten password, so please keep it safe! 

> **Pro-Tip:** To ensure you never lose access, create an account at [nopedat.web.app/account](https://nopedat.web.app/account/). This allows you to officially "claim" your notes and restore them via email if needed.

**Q. Can I claim any note as mine once I have an account?**
A. You can claim a note as long as it is not currently protected and hasn't already been claimed by another user.

**Q. Still have questions?**
A. If you didn't find the answer you were looking for, or if you want to report a bug, please reach out to us at [lamartine.cb@gmail.com](mailto:lamartine.cb@gmail.com).