# 🐶 Fetch - Dog Finder

This project is part of Fetch's technical take-home exercise. It is a web application that allows users to search for available shelter dogs, filter them by breed, mark favorites, and generate a match from their favorite dogs.

## 🚀 **Live Demo**
🔗 **Live Demo:** [Fetch Dog](https://darkgrey-lyrebird-452749.hostingersite.com/)

---

## 📌 **Features**
✔️ **Authentication** with email and password.
✔️ **Dog search** with breed filtering and pagination.
✔️ **Sorting results** by name, age, and breed.
✔️ **Favorite selection** with persistence in `localStorage`.
✔️ **Generate a match** using the `/dogs/match` endpoint.
✔️ **Attractive UI** with animations and an interactive modal.

---

## 🛠 **Technologies Used**
- **React** with Vite ⚡
- **React Router DOM** for navigation 🛤️
- **Bootstrap** for styling and responsive design 🎨
- **Fetch API** for API requests 🔗
- **LocalStorage** for session and favorites persistence 🗄️

---

## 📂 **Project Structure**
📦 fetch-dogs ┣ 📂 public ┣ 📂 src ┃ ┣ 📂 components ┃ ┃ ┣ 📜 DogCard.jsx ┃ ┃ ┣ 📜 Navbar.jsx ┃ ┃ ┣ 📜 MatchModal.jsx ┃ ┃ ┗ 📜 ... ┃ ┣ 📂 context ┃ ┃ ┗ 📜 AuthContext.jsx ┃ ┣ 📂 pages ┃ ┃ ┣ 📜 Login.jsx ┃ ┃ ┣ 📜 Search.jsx ┃ ┃ ┗ 📜 Favorites.jsx ┃ ┣ 📜 App.jsx ┃ ┣ 📜 main.jsx ┃ ┗ 📂 assets ┣ 📜 package.json ┣ 📜 vite.config.js ┣ 📜 README.md ┗ 📜 .gitignore


---

## 🏗 **Installation and Setup**
### 1️⃣ Clone the repository
```sh
git clone https://github.com/FacundoQuiroga9/fetch-dogs.git
cd fetch-dogs
