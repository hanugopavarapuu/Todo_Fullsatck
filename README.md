# Todo Fullstack TypeScript Application

A modern, full-stack Todo application built with React, TypeScript, Express.js, and MongoDB. Features a beautiful Swiss-style design with dark/light theme support.

## 🚀 **Live Demo**

- **Frontend**: [Deploy to Vercel](#frontend-deployment)
- **Backend**: [Deploy to Render](#backend-deployment)

## ✨ **Features**

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- 🎨 **Swiss-Style Design**: Clean, minimalist UI with proper typography
- 🌙 **Dark/Light Theme**: Toggle between themes with persistent preference
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔒 **Type Safety**: Full TypeScript implementation
- 🧪 **Comprehensive Testing**: Frontend and backend test coverage
- 🚀 **Production Ready**: Optimized for deployment

## 🛠 **Tech Stack**

### **Frontend**

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Axios** for API communication
- **CSS3** with CSS Variables for theming
- **Vitest** + **React Testing Library** for testing

### **Backend**

- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** with Mongoose ODM
- **Zod** for input validation
- **CORS** for cross-origin requests
- **Jest** + **Supertest** for testing

## 📦 **Installation**

### **Prerequisites**

- Node.js 18+
- MongoDB (local or Atlas)

### **Clone and Setup**

```bash
git clone <your-repo-url>
cd TodoFullstack_Ts

# Install dependencies
cd client && npm install
cd ../server && npm install
```

### **Environment Setup**

**Frontend (.env)**

```bash
VITE_API_URL=http://localhost:5000/api/v1/todo
```

**Backend (.env)**

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## 🚀 **Development**

### **Start Frontend**

```bash
cd client
npm run dev
```

Frontend will be available at: http://localhost:5173

### **Start Backend**

```bash
cd server
npm start
```

Backend will be available at: http://localhost:5000

## 🧪 **Testing**

### **Frontend Tests**

```bash
cd client
npm test
```

### **Backend Tests**

```bash
cd server
npm test
```

## 🚀 **Deployment**

### **Quick Deploy**

```bash
./deploy.sh
```

### **Manual Deployment**

#### **Frontend (Vercel)**

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Set root directory to `client`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api/v1/todo`

#### **Backend (Render)**

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set root directory to `server`
5. Set build command: `npm install && npm run build`
6. Set start command: `npm run prod`
7. Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `FRONTEND_URL=https://your-frontend-domain.vercel.app`

📖 **Detailed deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 **Project Structure**

```
TodoFullstack_Ts/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (theme)
│   │   ├── api/           # API configuration
│   │   └── test/          # Test setup
│   ├── public/            # Static assets
│   └── dist/              # Build output
├── server/                # Backend Express app
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # MongoDB models
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript types
│   │   └── test/          # Test setup
│   └── dist/              # Build output
├── deploy.sh              # Deployment script
├── DEPLOYMENT.md          # Deployment guide
└── TEST_SUMMARY.md        # Test documentation
```

## 🔧 **API Endpoints**

### **Notes**

- `POST /api/v1/todo/note/addnote` - Create a new note
- `GET /api/v1/todo/note/list` - Get all notes
- `PUT /api/v1/todo/note/update/:id` - Update a note
- `DELETE /api/v1/todo/note/del/:id` - Delete a note

### **Health Check**

- `GET /health` - Server health status

## 🎨 **Design System**

### **Swiss-Style Principles**

- Clean typography with Helvetica Neue
- Minimal color palette (black/white/gray)
- Generous whitespace and proper spacing
- Mathematical precision in layout
- Functional over decorative approach

### **Theme Support**

- Light theme: Clean white backgrounds
- Dark theme: Deep dark backgrounds
- Smooth transitions between themes
- Persistent theme preference

## 🧪 **Testing Coverage**

### **Frontend Tests (4 tests)**

- ✅ CreateArea component form submission
- ✅ CreateArea component validation
- ✅ Note component editing functionality
- ✅ Note component deletion functionality

### **Backend Tests (5 tests)**

- ✅ Note creation API
- ✅ Note creation validation
- ✅ Note deletion API
- ✅ Note deletion error handling
- ✅ Invalid ID handling

📖 **Detailed test documentation**: [TEST_SUMMARY.md](./TEST_SUMMARY.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 **License**

This project is licensed under the ISC License.

## 🙏 **Acknowledgments**

- Swiss Design principles for UI inspiration
- Vite for fast development experience
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

---

**Built with ❤️ using modern web technologies**
