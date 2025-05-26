# 📬 React Native Gmail Clone

This is a React Native project that replicates the Gmail inbox interface. The app connects to a mock backend powered by `json-server` and uses `ngrok` to expose local APIs to the frontend.

## 🚀 Getting Started

Follow the steps below to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/RakshitRabugotra/mails-only.git
```

### 2. Navigate to the Project Directory

```bash
cd mails-only
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

Ngrok will generate a public URL (e.g., https://abcd1234.ngrok-free.app).

## 🔧 Update the Frontend to Use the Public Backend URL

In the file `src/services/storage.ts`, update the default backend uri:

```ts
// Before:
const result: { backendUri: string; error: Error | null } = {
  backendUri: "http://localhost:3000",
  error: null,
}

// After:
const result: { backendUri: string; error: Error | null } = {
  backendUri: "<your-ngrok-public-url>",
  error: null,
}
```

Replace `<your-ngrok-public-url>` with the actual URL provided by ngrok (e.g., `https://abcd1234.ngrok-free.app`).

## ✅ You're All Set!

You can now use the app and interact with the mock backend over the internet via the public URL provided by ngrok.

## 📂 Project Structure

```
├── android/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── navigations/
│   ├── screens/
│   ├── services/
│   │   └── mail.ts        # API config with backend URI
│   ├── types/
│   ├── utils/
│   └── ...                # Other app files
├── App.tsx
├── index.js
├── db.json                # Mock database for json-server
└── ...
```

## 🛠️ Tech Stack

- ⚛️ **React Native**  
  Core framework used to build the cross-platform mobile application.

- 📝 **React Native Paper**  
  UI component library implementing Material Design for React Native.

- 🧭 **React Navigation**  
  Used for implementing navigation (including drawer and stack navigation) between screens.

- 🗄️ **Mock Backend with `json-server`**  
  Simulated REST API used during development and testing.


## ✨ Features Implemented

- ✅ **Material Design Integration**  
  Utilizes Material Theme and Icons to align with the Gmail design philosophy.

- 📂 **Drawer Navigation**  
  Seamless drawer-based navigation between different screens of the app.

- 🔍 **Search Screen Transition**  
  Smooth transition between the search screen and the inbox for improved UX.

- 🔧 **Configurable Backend URI**  
  Ability to modify the backend URI directly from the **Meet** screen settings.

- 📩 **Email Selection Support**  
  Users can select multiple emails with Gmail-style background and icon animation.

- 📖 **Read/Unread Email Toggle**  
  Functionality to mark emails as read or unread.

- 🗑️ **Email Deletion**  
  Ability to delete emails directly from the inbox view.

- 🔄 **Infinite Scrolling**  
  Supports lazy loading of emails with infinite scroll for performance optimization.

- 🎨 **Dynamic Navigation Bar Color**  
  Uses NativeModule to adapt navigation bar color dynamically based on theme or context.

- 🛎️ **Unread Mail Badge**  
  Displays a badge indicator for unseen (unread) emails.

## 📄 License
This project is for educational and personal use only.
