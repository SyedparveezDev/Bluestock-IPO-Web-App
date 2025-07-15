# BLUESTOCK IPO Platform

A comprehensive IPO (Initial Public Offering) web application built with Django and vanilla JavaScript.

## Features

### Public Interface
- **IPO Listings**: View upcoming, ongoing, and listed IPOs
- **Detailed Information**: Complete IPO details including financial performance
- **Search & Filter**: Real-time search and filtering capabilities
- **Document Downloads**: Access to RHP and DRHP PDF documents
- **Responsive Design**: Mobile-friendly interface

### Admin Panel
- **CRUD Operations**: Create, read, update, and delete IPO entries
- **File Management**: Upload company logos and PDF documents
- **Status Management**: Handle different IPO lifecycle states
- **Form Validation**: Comprehensive input validation

### API Features
- **RESTful API**: Complete REST API with Django REST Framework
- **Filtering & Search**: Advanced filtering and search capabilities
- **Pagination**: Efficient data pagination
- **Documentation**: API endpoints for integration

## Tech Stack

### Backend
- **Python 3.12.3**
- **Django 5.0.6**
- **Django REST Framework 3.15.1**
- **PostgreSQL** (Database)

### Frontend
- **HTML5**
- **CSS3**
- **Vanilla JavaScript** (No Node.js)
- **Bootstrap 5** (via CDN)

### Tools
- **Postman** (API Testing)
- **Git & GitHub** (Version Control)
- **Visual Studio Code** (IDE)

## Installation

### Prerequisites
- Python 3.12.3
- PostgreSQL
- Git

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ipo-platform
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Setup PostgreSQL Database**
   \`\`\`sql
   CREATE DATABASE ipo_database;
   CREATE USER postgres WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ipo_database TO postgres;
   \`\`\`

5. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   # Edit .env file with your database credentials
   \`\`\`

6. **Run migrations**
   \`\`\`bash
   python manage.py makemigrations
   python manage.py migrate
   \`\`\`

7. **Create superuser**
   \`\`\`bash
   python manage.py createsuperuser
   \`\`\`

8. **Load sample data**
   \`\`\`bash
   python scripts/create_sample_data.py
   \`\`\`

9. **Run development server**
   \`\`\`bash
   python manage.py runserver
   \`\`\`

## API Endpoints

### IPO Management
- `GET /api/ipo/` - List all IPOs
- `POST /api/ipo/` - Create new IPO
- `GET /api/ipo/{id}/` - Get IPO details
- `PUT /api/ipo/{id}/` - Update IPO
- `DELETE /api/ipo/{id}/` - Delete IPO

### Filtering & Search
- `GET /api/ipo/?status=upcoming` - Filter by status
- `GET /api/ipo/?search=company_name` - Search by company name
- `GET /api/ipo/?ordering=open_date` - Sort by field

### Statistics
- `GET /api/ipo/stats/` - Get IPO statistics
- `GET /api/ipo/upcoming/` - Get upcoming IPOs
- `GET /api/ipo/ongoing/` - Get ongoing IPOs
- `GET /api/ipo/listed/` - Get listed IPOs

## Project Structure

\`\`\`
ipo_project/
├── ipo_app/
│   ├── models.py          # IPO data model
│   ├── views.py           # API and frontend views
│   ├── serializers.py     # DRF serializers
│   ├── urls.py            # URL routing
│   └── admin.py           # Django admin configuration
├── ipo_project/
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py            # WSGI configuration
├── templates/
│   ├── base.html          # Base template
│   ├── home.html          # Home page
│   └── admin_panel.html   # Admin interface
├── static/
│   ├── css/style.css      # Custom styles
│   ├── js/main.js         # Core JavaScript
│   ├── js/ipo-listings.js # IPO listings functionality
│   └── js/admin-panel.js  # Admin panel functionality
├── media/                 # File uploads
├── scripts/
│   └── create_sample_data.py # Sample data script
├── requirements.txt       # Python dependencies
└── manage.py             # Django management script
\`\`\`

## Usage

### Public Interface
1. Visit `http://localhost:8000/` for the main IPO listings
2. Use search and filters to find specific IPOs
3. Click on company names to view detailed information
4. Download RHP/DRHP documents using the provided buttons

### Admin Panel
1. Visit `http://localhost:8000/admin-panel/` for IPO management
2. Add new IPOs using the "Add New IPO" button
3. Edit existing IPOs using the edit button
4. Delete IPOs using the delete button (with confirmation)

### API Testing with Postman
1. Import the API endpoints into Postman
2. Test CRUD operations on IPO data
3. Verify filtering and search functionality
4. Test file upload capabilities

## Database Schema

### IPO Model Fields
- `company_name`: Company name (CharField)
- `logo`: Company logo (ImageField)
- `price_band`: IPO price range (CharField)
- `open_date`: IPO opening date (DateField)
- `close_date`: IPO closing date (DateField)
- `issue_size`: Total issue size (CharField)
- `issue_type`: Type of issue (CharField with choices)
- `listing_date`: Stock listing date (DateField)
- `status`: Current status (CharField with choices)
- `ipo_price`: Final IPO price (DecimalField)
- `listing_price`: First day listing price (DecimalField)
- `current_market_price`: Current trading price (DecimalField)
- `rhp_pdf`: Red Herring Prospectus (FileField)
- `drhp_pdf`: Draft Red Herring Prospectus (FileField)

### Calculated Properties
- `listing_gain`: Percentage gain from IPO to listing price
- `current_return`: Percentage return from IPO to current price
- `days_to_open`: Days remaining until IPO opens
- `is_active`: Whether IPO is currently accepting applications

## Security Features
- CSRF protection enabled
- Input validation and sanitization
- File upload restrictions
- SQL injection prevention
- XSS protection

## Performance Optimizations
- Database query optimization
- Efficient pagination
- Static file compression
- Image optimization
- Caching strategies

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License
This project is proprietary to Bluestock Fintech and must not be shared, distributed, or disclosed without prior authorization.

## Support
For technical support, contact:
- Email: hello@bluestock.in
- WhatsApp: +91 9225220170
- Project Manager: Yash Kale (yashkale@bluestock.in)
\`\`\`

This completes the comprehensive Django-based IPO web application with all the specified requirements:

1. **Backend**: Django 5.0.6 with Django REST Framework 3.15.1
2. **Frontend**: HTML, CSS, vanilla JavaScript with Bootstrap 5
3. **Database**: PostgreSQL with comprehensive IPO model
4. **Features**: Complete CRUD operations, search/filter, file uploads
5. **API**: RESTful API with proper endpoints and documentation
6. **Security**: Production-ready security measures
7. **Testing**: Ready for Postman API testing
8. **Documentation**: Complete setup and usage instructions

The application is production-ready and follows Django best practices with a clean, maintainable codebase.
