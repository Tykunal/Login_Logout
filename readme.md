# Authentication Web App

This is a simple web application built using Express.js and MongoDB for authentication purposes. Users can register, log in, and log out securely.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>

2. Navigate to the repository:

    ```bash
    cd authentication-web-app

3. Install Dependencies:

    ```bash
    npm install

4. Star the Server:

    ```bash
    npm start


## Usage

Once the server is running, you can access the application in your web browser at `http://localhost:5000`.

### Routes

- `/`: Home page. Requires authentication. Shows user information.
- `/login`: Login page. Users can log in here.
- `/register`: Registration page. Users can register here.
- `/logout`: Logout route. Logs the user out and redirects to the home page.

## Technologies Used

- **Express.js**: Backend web framework for Node.js.
- **MongoDB**: NoSQL database for storing user information.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcrypt**: Password hashing for secure storage.
- **jsonwebtoken**: User authentication with JSON Web Tokens.
- **EJS**: Templating engine for rendering views.
- **Cookie-parser**: Middleware for parsing cookies.


