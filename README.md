# 📬 React Native Gmail Clone

This is a React Native project that replicates the Gmail inbox interface. The app connects to a mock backend powered by `json-server` and uses `ngrok` to expose local APIs to the frontend.

## 🚀 Getting Started

Follow the steps below to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
```

### 2. Navigate to the Project Directory

```bash
cd <your-repo-name>
```
### 3. Run the App on Android
```bash
npm run android
```

Make sure you have an Android emulator running or a physical device connected.

## 🖥️ Starting the Mock Backend
### 4. Install json-server

Install it globally (recommended) or as a dev dependency:
```bash
npm install -g json-server
```
***OR***
```bash
npm install -D json-server
```

### 5. Start the json-server

```bash
npx json-server db.json
```

This will start the server at http://localhost:3000.

## 🌐 Expose the Backend Using Ngrok
### 6. Register and Install ngrok

Follow the ngrok official documentation to:
- Sign up for an account
- Install the CLI
- Authenticate your ngrok installation

### 7. Expose Your Local Backend

```bash
ngrok http http://localhost:3000
```

Ngrok will generate a public URL (e.g., https://abcd1234.ngrok.io).

## 🔧 Update the Frontend to Use the Public Backend URL

In the file src/services/mail.ts, update the BACKEND_URI:

```ts
// Before:
const BACKEND_URI = "https://localhost:3000/mails";

// After:
const BACKEND_URI = "<your-ngrok-public-url>/mails";
```

Replace `<your-ngrok-public-url>` with the actual URL provided by ngrok (e.g., `https://abcd1234.ngrok.io`).

## ✅ You're All Set!

You can now use the app and interact with the mock backend over the internet via the public URL provided by ngrok.

## 📂 Project Structure

```
├── db.json                # Mock database for json-server
├── src/
│   ├── services/
│   │   └── mail.ts        # API config with backend URI
│   └── ...                # Other app files
├── App.tsx
└── ...
```

## 📄 License
This project is for educational and personal use only.