# Deployment Guide

This guide will help you deploy both the frontend and backend of your Todo application to production.

## 🚀 **Frontend Deployment (Vercel)**

### **Step 1: Prepare Frontend for Vercel**

1. **Push your code to GitHub** (if not already done)
2. **Go to [Vercel](https://vercel.com)** and sign up/login
3. **Import your repository** from GitHub
4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### **Step 2: Set Environment Variables**

In your Vercel project settings, add these environment variables:

```bash
VITE_API_URL=https://your-backend-url.onrender.com/api/v1/todo
```

### **Step 3: Deploy**

Click "Deploy" and Vercel will automatically build and deploy your frontend.

---

## 🔧 **Backend Deployment (Render)**

### **Step 1: Prepare Backend for Render**

1. **Push your code to GitHub** (if not already done)
2. **Go to [Render](https://render.com)** and sign up/login
3. **Create a new Web Service**
4. **Connect your GitHub repository**

### **Step 2: Configure the Web Service**

- **Name**: `todo-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run prod`

### **Step 3: Set Environment Variables**

Add these environment variables in Render:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### **Step 4: Set Up MongoDB**

1. **Create a MongoDB Atlas account** (free tier available)
2. **Create a new cluster**
3. **Get your connection string**
4. **Add it to Render environment variables** as `MONGODB_URI`

### **Step 5: Deploy**

Click "Create Web Service" and Render will deploy your backend.

---

## 🔗 **Connect Frontend to Backend**

### **Update Frontend Environment**

Once your backend is deployed, update your Vercel environment variable:

```bash
VITE_API_URL=https://your-backend-url.onrender.com/api/v1/todo
```

### **Update Backend CORS**

In your backend code, update the allowed origins:

```typescript
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.vercel.app", // Your actual Vercel domain
  process.env.FRONTEND_URL,
].filter(Boolean);
```

---

## 📋 **Deployment Checklist**

### **Frontend (Vercel)**

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Domain configured

### **Backend (Render)**

- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] MongoDB Atlas cluster set up
- [ ] Environment variables configured
- [ ] Build and deployment successful
- [ ] Health check endpoint working

### **Integration**

- [ ] Frontend environment variable updated with backend URL
- [ ] CORS configured correctly
- [ ] API calls working from frontend
- [ ] Full CRUD operations tested

---

## 🔍 **Testing Your Deployment**

### **Backend Health Check**

```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### **Frontend API Test**

1. Open your Vercel frontend URL
2. Try creating a new todo
3. Try editing and deleting todos
4. Verify all CRUD operations work

---

## 🛠 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**

   - Check that your frontend URL is in the allowed origins
   - Verify environment variables are set correctly

2. **Build Failures**

   - Check that all dependencies are in package.json
   - Verify TypeScript compilation works locally

3. **Database Connection Issues**

   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas

4. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

### **Useful Commands**

```bash
# Test backend locally
cd server
npm run build
npm run prod

# Test frontend locally
cd client
npm run build
npm run preview
```

---

## 📊 **Monitoring**

### **Vercel Analytics**

- Monitor frontend performance
- Track user interactions
- View error logs

### **Render Logs**

- Monitor backend performance
- View application logs
- Track API usage

### **MongoDB Atlas**

- Monitor database performance
- Track query performance
- View connection metrics

---

## 🔄 **Continuous Deployment**

Both Vercel and Render support automatic deployments:

- **Vercel**: Deploys on every push to main branch
- **Render**: Deploys on every push to main branch

Your application will automatically update when you push changes to GitHub!

---

## 🎉 **Success!**

Once deployed, your Todo application will be available at:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Your full-stack application is now live and ready for users! 🚀
