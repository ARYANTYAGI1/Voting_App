# Voting Application API

## Overview

This Voting Application API is a comprehensive backend solution designed to manage elections involving multiple parties and users. It features secure authentication, role-based access, and dynamic vote counting to ensure a transparent and efficient voting process.

## Features

- **Secure Authentication:** JWT-based authentication and bcrypt-hashed passwords for robust user security.
- **Unique Identity Verification:** Users are uniquely identified using `adhaarNumber`.
- **Role-Based Access Control:** Supports various user roles, including Voters, Admins, and Candidates.
- **Flexible Party Management:** Manages multiple parties with dynamic handling.
- **Secure Voting:** Voters can cast a single, secure vote.
- **Real-Time Vote Counting:** Displays real-time vote results for multiple parties.

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/https://github.com/ARYANTYAGI1/Voting_App/voting-app.git
   cd voting-app