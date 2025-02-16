# Quizo

This project is a full-stack application with a backend built using **TypeScript**, **Express**, and **Prisma**, and a frontend built using **React** powered by **Vite**.

## Setup

### Backend

1. **Navigate to the server directory:**
   ```sh
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Prisma:**
   - Set your `DATABASE_URL` in `prisma/.env` (e.g., for SQLite: `file:./dev.db`).
   - Run migrations
    ```sh
    npx prisma generate
    npx prisma migrate deploy
    npx prisma db seed
    ```

5. **Start the server**
   ```sh
   npm run dev
   ```

### Frontend

1. **Navigate to the client directory:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

## License

This project is licensed under the [MIT License](LICENSE).
