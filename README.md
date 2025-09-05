# Contact Book
A simple web-based contact book application built with PHP, MySQL, HTML, CSS, and JavaScript.

# Features
- Add new contacts with name, email, and phone number.
- Edit existing contacts.
- Delete individual contacts.
- Clear all contacts at once.
- Search contacts by name, email, or phone.
- Export contacts as a CSV file.
- Phone number input is formatted live as XXX-XXX-XXXX.
- Responsive and clean UI with dark theme.

# Technologies Used
- PHP (backend)
- MySQL (database)
- JavaScript (frontend)
- HTML & CSS

# Setup Instructions
## Prerequisites
- PHP (version 7.x or higher recommended)
- MySQL or MariaDB
- Web server (Apache)

# Database Setup
1) Create a database named contact_book:
   ```
   CREATE DATABASE contact_book;
   ```
2) Create a table named contacts:
   ```
   USE contact_book;
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(20) NOT NULL
   );
   ```
# Configure Database Connection
## Edit the db.php file to update your database credentials if needed: 
 ```
 <?php
$host = "localhost";
$user = "root"; 
$pass = "****";
$db = "contact_book";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```
# Running the Application
 1) Place the project files in your web server's root directory (e.g., htdocs for XAMPP).
 2) Start your web server and MySQL server.
 3) Open your browser and navigate to http://localhost/index.html
 4) Use the interface to add, edit, delete, search, and export contacts.

# File Structure
- **index.html** - Main frontend page.
- **styles.css** - Styling for the app.
- **script.js** - JavaScript for frontend logic.
- **db.php** - Database connection script.
- **add_contact.php** - Backend script to add a contact.
- **fetch_contacts.php** - Backend script to fetch all contacts.
- **update_contact.php** - Backend script to update a contact.
- **delete_contact.php** - Backend script to delete a single contact.
- **delete_all_contacts.php** - Backend script to delete all contacts

# Notes
- The phone number input is automatically formatted as you type.
- Email and phone inputs are validated on the frontend before submission.
- The "Clear All Contacts" button deletes all contacts after confirmation.
- The "Export as CSV" button downloads all contacts in CSV format.
- The app currently does not implement user authentication.
- Make sure your PHP environment has mysqli enabled.

# License
This project is open source and free to use.
