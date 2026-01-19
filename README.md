# AOJ GFT Study Case

Welcome to the AOJ GFT Technologies study case project! This full-stack application demonstrates modern web development practices using Angular for the frontend and .NET 9 for the backend. The project showcases a clean architecture with separation of concerns, following industry best patterns and practices.

## 🚀 Quick Start

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** as package manager
- **.NET 9 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Angular CLI** (globally installed): `npm install -g @angular/cli`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aoj-gft-study-case
   ```

2. **Install all dependencies**

   ```bash
   npm i
   ```

   ```bash
   npm run install-deps
   ```

   This command will:
   - Install frontend dependencies in the `frontend/` directory
   - Restore .NET packages for the backend projects

   Alternatively, you can install dependencies separately:

   ```bash
   # Frontend dependencies
   cd frontend && npm install

   # Backend dependencies
   cd backend && dotnet restore
   ```

### Running the Applications

#### Development Mode (Recommended)

Start both frontend and backend in development mode with hot reload:

```bash
npm start
```

This will concurrently run:

- **Frontend**: Angular development server on `http://localhost:4200`
- **Backend**: .NET Web API on `http://localhost:5000` (or similar port)

#### Individual Services

If you prefer to run services separately:

**Frontend only:**

```bash
npm run dev-frontend
# or
cd frontend && npm start
```

**Backend only:**

```bash
npm run dev-backend
# or
cd backend/BackendApi && dotnet watch run
```

#### Production Mode

For production builds:

```bash
npm run start:prod
```

Or build individually:

```bash
# Build frontend
npm run prod-frontend

# Run backend in production mode
npm run prod-backend
```

## 📁 Project Structure

```
aoj-gft-study-case/
├── frontend/                 # Angular frontend application
│   ├── src/
│   │   ├── app/             # Angular app components and modules
│   │   ├── assets/          # Static assets
│   │   └── ...
│   ├── package.json
│   └── angular.json
├── backend/                  # .NET backend application
│   ├── BackendApi/          # Web API project
│   ├── Application/         # Application layer (DTOs, interfaces)
│   ├── Domain/              # Domain entities
│   └── Infrastructure/      # Infrastructure layer
├── package.json             # Root package.json with scripts
└── README.md
```

## 🛠️ Technology Stack

### Frontend

- **Angular 17** - Modern frontend framework
- **PrimeNG** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **ngx-translate** - Internationalization support
- **TypeScript** - Type-safe JavaScript

### Backend

- **.NET 9** - Latest .NET framework
- **ASP.NET Core Web API** - RESTful API framework
- **FluentValidation** - Validation library
- **Swashbuckle** - OpenAPI/Swagger documentation
- **Clean Architecture** - Layered architecture pattern

## 📝 Available Scripts

Here are the main npm scripts available in the root directory:

- `npm run install-deps` - Install all dependencies (frontend + backend)
- `npm start` - Start both apps in development mode
- `npm run start:prod` - Build and run in production mode
- `npm run dev-frontend` - Start only the frontend
- `npm run dev-backend` - Start only the backend
- `npm run prod-frontend` - Build the frontend for production
- `npm run prod-backend` - Run the backend in production mode
- `npm run deps-frontend` - Install only frontend dependencies
- `npm run deps-backend` - Restore only backend dependencies

## 🔧 Development Notes

- The frontend runs on port 4200 by default
- The backend API runs on port 5000 by default (may vary)
- Both services support hot reload during development
- The backend includes Swagger/OpenAPI documentation available at `/swagger`

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [PrimeNG Documentation](https://primeng.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

Built with ❤️ for the GFT Technologies code challenge.
