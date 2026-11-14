Little Smart Kids V2.3 Online — setup

1. In Firebase Console > Project settings > Your apps > Web app > SDK setup and configuration > Config, copy apiKey and appId into firebase-config.js.
2. Host index.html and firebase-config.js in the same public web folder (GitHub Pages or Firebase Hosting). Do not open with file:// or content:// because Google sign-in requires an authorized web domain.
3. Firebase Authentication > Settings > Authorized domains: add the actual hosting domain (e.g. YOURNAME.github.io).
4. First sign-in: the app shows UID on screen, but uploads stay disabled. Copy that UID into ADMIN_UID in firebase-config.js and replace PASTE_ADMIN_UID_HERE in firestore.rules with the SAME UID.
5. In Firestore > Rules, paste the updated firestore.rules and Publish. Then republish firebase-config.js.
6. After reload, admin can upload photos. Other visitors can only view.

NOTE: Images are resized to <=360px and stored as JPEG strings in Firestore. This avoids Cloud Storage but is suitable only for small images, not large photo galleries. Spark free quotas and document size apply.
Firestore is public-read only for wordImages; do not store private photos.
IMPORTANT: Do not publish rules containing the placeholder UID as an actual working admin policy.
