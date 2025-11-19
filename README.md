# CBD-PasCher
Create a website to sell CBD

# CBD-PasCher 🌿

A modern web application for selling quality CBD products at affordable prices.

## 📋 Description

CBD-PasCher is an e-commerce platform dedicated to selling quality CBD products at competitive prices. The application provides a smooth and intuitive user experience for discovering and purchasing CBD products with confidence.

## 🚀 Project Status

🔨 **In Development** - Project is in early stage

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Static typing for more robust code
- **Vite** (recommended) - Modern and fast build tool

### Backend
- **Java 17+** - Backend language
- **Spring Boot** - Framework for REST API development
- **Spring Security** - Authentication and authorization management
- **Spring Data JPA** - Data access layer

### Database
- **PostgreSQL** - Relational database

### Tools
- **Git** - Version control
- **Maven/Gradle** - Java dependency management

## ✨ Planned Features

- [ ] CBD product catalog
- [ ] User authentication system
- [ ] Shopping cart
- [ ] Checkout process
- [ ] Secure payment processing
- [ ] Admin dashboard
- [ ] Search and filter system
- [ ] Product reviews and ratings

## 📦 Installation

### Prerequisites

- Node.js (v18+)
- Java JDK (17+)
- PostgreSQL (14+)
- Git

### Backend
```bash
# Clone the repository
git clone https://github.com/[your-username]/cbd-pascher.git

# Navigate to backend folder
cd cbd-pascher/backend

# Install dependencies with Maven
mvn clean install

# Configure database in application.properties
# Run the application
mvn spring-boot:run
```

### Frontend
```bash
# Navigate to frontend folder
cd cbd-pascher/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database
```sql
-- Create the database
CREATE DATABASE cbd_pascher;

-- Migrations will be handled by Spring Boot / Flyway
```

## 🗂️ Project Structure
```
cbd-pascher/
├── frontend/          # React + TypeScript application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   └── pom.xml
├── docs/             # Documentation
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how to participate:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Workflow

1. Create an issue for each feature or bug
2. Create a branch from `main` for each issue
3. Make atomic and descriptive commits
4. Create a Pull Request to `main`
5. Code review before merge

## 📄 License

[To be defined] - This project requires an appropriate license

## 👥 Authors

- **[Your Name]** - Lead Developer

## 📞 Contact

For any questions or suggestions, feel free to open an issue!

---

⚠️ **Legal Notice**: This project complies with French legislation regarding CBD product sales. All products offered contain less than 0.3% THC in accordance with current regulations.
