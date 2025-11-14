# 🏥 BookmyDoc - Doctor's Appointment Management System

A simple and user-friendly web-based system to manage doctor appointments online.

## Features

**Browse Doctors** - View a list of available doctors with their specialization, experience, and consultation fees  
**Book Appointments** - Schedule appointments with doctors with form validation  
**Manage Bookings** - View, edit, and cancel your appointments  
**Form Validation** - Real-time validation for patient name, doctor selection, date, and time  
**Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices  
**Data Persistence** - Appointment data is saved in browser's local storage  

## Project Structure

```
web - online appointment managemeng portal (mini)/
├──images\
├── index.html          # Main HTML file with page structure
├── styles.css          # CSS styling for the application
├── script.js           # JavaScript functionality and logic
└── README.md           # This file
```

## How to Run

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- No server or installation required!

### Steps to Run

1. **Extract/Open the Project**
   - Navigate to the `web - online appointment managemeng portal (mini)` folder in your file system

2. **Open the Application**
   - Double-click on `index.html` to open it in your default browser
   - OR right-click `index.html` → Open with → Select your preferred browser

3. **Use the Application**
   - **Doctors Tab**: Browse through all available doctors
   - **Book Appointment**: Click on any doctor's "Book Appointment" button to fill in your details
   - **My Bookings**: View all your scheduled appointments

## Usage Guide

### Booking an Appointment

1. Click on a doctor card in the **Doctors** tab or click the "Book Appointment" button
2. Fill in your details:
   - **Patient Name**: Your full name (must be 3+ characters, letters only)
   - **Select Doctor**: Choose from the dropdown (auto-filled if clicked from doctor card)
   - **Appointment Date**: Select a future date
   - **Appointment Time**: Choose from available time slots (9 AM to 5 PM)
   - **Additional Notes**: (Optional) Add any notes for the doctor
3. Click **Book Appointment** to confirm

### Viewing Your Bookings

1. Navigate to the **My Bookings** tab
2. View all your scheduled appointments with details
3. **Edit**: Modify an existing appointment (removes old booking and returns to form)
4. **Cancel**: Delete an appointment 

### Sample Data

The application comes with 6 sample doctors:
- **Dr. Rajesh Kumar** - Cardiology (₹500)
- **Dr. Priya Singh** - Neurology (₹600)
- **Dr. Arjun Patel** - Orthopedics (₹450)
- **Dr. Meera Sharma** - Pediatrics (₹400)
- **Dr. Vikram Desai** - Dermatology (₹350)
- **Dr. Anjali Verma** - General Medicine (₹300)

## Data Storage

- All appointment bookings are stored in your browser's **LocalStorage**
- Data persists even after closing the browser
- Data is cleared only if browser cache/storage is cleared
- Each browser/device maintains separate appointment records