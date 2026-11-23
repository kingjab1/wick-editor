# Online saves (Firebase)

My Work, teacher mode, Learn publishing and Class Sounds use Firebase Authentication and Cloud Firestore (free Spark plan).
They stay hidden until `cloud-config.json` exists in the site root:

```json
{ "apiKey": "...", "authDomain": "...", "projectId": "...", "appId": "..." }
```

These values are public by design. Access is controlled by `firestore.rules` (paste it into Firestore > Rules).
Teacher accounts are made in the app, then marked as teachers by adding `teachers/{uid}` in the Firestore console.
