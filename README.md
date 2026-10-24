# 🔗 LinkVault – URL Shortener & Analytics

LinkVault is a full-stack web application that converts long URLs into short, shareable links. Built using the MERN stack, it allows users to shorten URLs, redirect visitors to original destinations, generate QR codes, and track link clicks.

##  Features

- **URL Shortening:** Convert long URLs into compact, shareable links.
- **URL Redirection:** Automatically redirect visitors to the original webpage using a short link.
- **QR Code Generation:** Generate QR codes for shortened URLs.
- **Download QR Codes:** Download QR codes as PNG images.
- **Copy to Clipboard:** Copy shortened URLs with a single click.
- **Click Analytics:** Track the number of times a shortened link is accessed.
- **MongoDB Integration:** Store URL information and click counts in a database.
- **Responsive Interface:** Access the application through a clean, user-friendly interface.

##  Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development server and build tool |
| Tailwind CSS | Styling and responsive layouts |
| DaisyUI | UI components |
| Node.js | Backend runtime |
| Express.js | REST API and URL redirection |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Axios | HTTP requests between frontend and backend |
| `qrcode` | Generate downloadable QR code images |
| `react-qr-code` | Render QR codes in React |

## 📁 Project Structure

```text
LINKVAULT/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative; your actual files may differ.*

##  Prerequisites

Before running LinkVault locally, install:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or another accessible MongoDB deployment.

##  Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SubhroKaran/LINKVAULT.git
cd LINKVAULT
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your MongoDB connection string. Keep this file private and never commit your credentials.

Start the backend:

```bash
npm run dev
```

If your project does not have a `dev` script, use the start command defined in your `backend/package.json`.

### 3. Configure the Frontend

Open a second terminal and navigate to the frontend directory from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_BACKEND_URL=http://localhost:3000/api/urls
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

##  How It Works

1. The user enters a long URL in the React interface.
2. The frontend sends the URL to the Express backend through an HTTP POST request.
3. The backend validates the URL and generates a unique short code.
4. MongoDB stores the original URL, short code, and click count.
5. The backend returns the shortened URL to the frontend.
6. When someone opens the short link, the backend retrieves the original URL and redirects the visitor.
7. The application increments the click count and provides a QR code for convenient sharing.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check whether the backend is running |
| `POST` | `/api/urls/shorten` | Generate a shortened URL |
| `GET` | `/:code` | Redirect to the original URL |

### Example: Shorten a URL

**Request**

```http
POST /api/urls/shorten
Content-Type: application/json
```

```json
{
  "originalUrl": "https://example.com"
}
```

**Example response**

```json
{
  "shortUrl": "http://localhost:3000/a1b2c3d4"
}
```

The short code and URL are generated dynamically, so the actual response will vary.

## 🔐 Environment Variables

### Backend

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Backend server port |
| `BASE_URL` | Base URL used to construct shortened links |
| `FRONTEND_URL` | Frontend origin allowed by CORS |

### Frontend

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend URL API |

Never expose database credentials or other secrets in frontend environment variables. Variables prefixed with `VITE_` are exposed to client-side code.

## 🌐 Deployment

LinkVault can be deployed using:

- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

For production deployment, configure the environment variables with the deployed backend URL, allow the deployed frontend origin in CORS, and set `BASE_URL` to the public backend domain so generated short links work outside your local machine.

##  Future Enhancements

- Custom short URLs.
- Expiring links.
- Detailed analytics dashboard.
- Click timestamps and visit history.
- User authentication and personal link management.
- Link search, filtering, and deletion.

##  Project Objective

The objective of LinkVault is to demonstrate full-stack web development using the MERN stack, including REST API development, database integration, URL validation, HTTP redirection, and basic link analytics.

##  Author

**Subhro Karan**

- GitHub: [SubhroKaran](https://github.com/SubhroKaran)
- Project Repository: [LINKVAULT](https://github.com/SubhroKaran/LINKVAULT)

---

If you find this project useful, consider giving the repository a star!
