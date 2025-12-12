# 🍬 Sweet Shop Management System

A full-stack inventory and sales management system designed for sweet shops. This application allows administrators to manage stock, track sales, and provides a modern, responsive dashboard for viewing available sweets. Built with **Spring Boot (Java)** and **React**.

## 🚀 Live Demo
* **Frontend (Vercel):** [Link to your Vercel Deployment]
* **Backend (Railway):** [Link to your Railway API]

---

## 🛠️ Tech Stack

### **Backend**
* **Language:** Java 17
* **Framework:** Spring Boot 3.3.0
* **Security:** Spring Security + JWT (JSON Web Tokens)
* **Database:** PostgreSQL (Production) / H2 (Testing)
* **Testing:** JUnit 5, Mockito (TDD Approach)
* **Tools:** Maven, Lombok

### **Frontend**
* **Framework:** React.js (Vite)
* **Styling:** CSS3 (Custom Glassmorphism Design, Responsive Grid)
* **Routing:** React Router DOM
* **HTTP Client:** Axios

---

## ✨ Features

* **User Authentication:** Secure Registration and Login using JWT.
* **Inventory Dashboard:** Visual display of all sweets with auto-generated color coding.
* **Stock Management:**
    * **Add:** Admin interface to add new sweets with Price and Quantity.
    * **Purchase:** Real-time stock reduction when items are "bought".
    * **Delete:** Remove items from the inventory.
* **Search & Filter:**
    * Instant search bar to find sweets by name.
    * Sorting functionality (Price: Low to High / High to Low).
* **Responsive Design:** Works on desktop and mobile devices.

---

## ⚙️ Local Setup Instructions

Follow these steps to run the project locally.

### **1. Prerequisites**
* Java JDK 17+
* Node.js & npm
* PostgreSQL (Installed and running)

### **2. Database Setup**
1. Open pgAdmin or your terminal.
2. Create a new database named `sweetshop`.
3. (Optional) The application will automatically seed default data (Ladoo, Barfi) if the table is empty.

### **3. Backend Setup (Spring Boot)**

```bash
cd backend-api