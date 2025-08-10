#!/bin/bash

echo "🚀 Todo App Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    echo "   git push"
    exit 1
fi

echo "✅ Git repository is ready"

# Build frontend
echo "📦 Building frontend..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend built successfully"

# Build backend
echo "📦 Building backend..."
cd ../server
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
echo "✅ Backend built successfully"

cd ..

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git push"
echo ""
echo "2. Deploy to Vercel (Frontend):"
echo "   - Go to https://vercel.com"
echo "   - Import your repository"
echo "   - Set root directory to 'client'"
echo "   - Add environment variable: VITE_API_URL=https://your-backend-url.onrender.com/api/v1/todo"
echo ""
echo "3. Deploy to Render (Backend):"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your repository"
echo "   - Set root directory to 'server'"
echo "   - Set build command: npm install && npm run build"
echo "   - Set start command: npm run prod"
echo "   - Add environment variables:"
echo "     - NODE_ENV=production"
echo "     - MONGODB_URI=your_mongodb_connection_string"
echo "     - FRONTEND_URL=https://your-frontend-domain.vercel.app"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 