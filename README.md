Task Manager API
The Task Manager API is a Node.js and MongoDB-based web service following a RESTful API design architecture. It facilitates task creation, management, user authentication, and various account-related functionalities. Additionally, the application sends email notifications to users upon creating or deleting their accounts.

Features
User Management:

Sign-up (POST /users)
Login (POST /users/login)
User Profile (GET /users/me)
Update Profile (PATCH /users/me)
Upload Profile Picture (POST /users/me/avatar)
View Profile Picture (GET /users/userID/avatar)
Delete Profile Picture (DELETE /users/me/avatar)
Delete Account (DELETE /users/me)
Logout (POST /users/logout)
Logout All Accounts (POST /users/logoutAll)
Task Management:

Create a Task (POST /users/tasks)
View a Task (GET /users/tasks/taskID)
View all Tasks (GET /users/tasks)
Sort Tasks by Created Date (GET /users/tasks?sortBy=createdAt:desc or asc)
Paginate Results (GET /users/tasks?limit=3&skip=3)
Update a Task (PATCH /users/tasks/taskID)
Delete a Task (DELETE /users/tasks/taskID)
Usage
You can test the Task Manager API by accessing the following URL: Task Manager API
