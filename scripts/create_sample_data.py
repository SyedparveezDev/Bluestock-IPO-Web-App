#!/usr/bin/env python
"""
Script to create sample IPO data for testing
Run this after setting up the database
"""

import os
import sys
import django
from datetime import date, timedelta
from decimal import Decimal

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipo_project.settings')
django.setup()

from ipo_app.models import IPO

def create_sample_data():
    """Create sample IPO data"""
    
    sample_ipos = [
        {
            'company_name': 'OLA Electric Mobility Ltd.',
            'price_band': '₹72-76',
            'open_date': date.today() + timedelta(days=30),
            'close_date': date.today() + timedelta(days=33),
            'issue_size': '₹5,500 Cr.',
            'issue_type': 'book_built',
            'status': 'upcoming',
        },
        {
            'company_name': 'One Mobikwik Systems Ltd.',
            'price_band': '₹265-279',
            'open_date': date.today() - timedelta(days=5),
            'close_date': date.today() + timedelta(days=2),
            'issue_size': '₹1,900 Cr.',
            'issue_type': 'book_built',
            'status': 'ongoing',
        },
        {
            'company_name': 'Le Travenues Technology (ixigo)',
            'price_band': '₹88-93',
            'open_date': date.today() - timedelta(days=60),
            'close_date': date.today() - timedelta(days=57),
            'listing_date': date.today() - timedelta(days=50),
            'issue_size': '₹1,800 Cr.',
            'issue_type': 'book_built',
            'status': 'listed',
            'ipo_price': Decimal('93.00'),
            'listing_price': Decimal('106.00'),
            'current_market_price': Decimal('125.00'),
        },
        {
            'company_name': 'CMR Green Technologies',
            'price_band': '₹200-220',
            'open_date': date.today() + timedelta(days=15),
            'close_date': date.today() + timedelta(days=18),
            'issue_size': '₹500 Cr.',
            'issue_type': 'book_built',
            'status': 'upcoming',
        },
        {
            'company_name': 'Wellness Forever',
            'price_band': '₹300-350',
            'open_date': date.today() + timedelta(days=45),
            'close_date': date.today() + timedelta(days=48),
            'issue_size': '₹800 Cr.',
            'issue_type': 'book_built',
            'status': 'upcoming',
        },
        {
            'company_name': 'Nova Agritech Ltd.',
            'price_band': '₹39-41',
            'open_date': date.today() - timedelta(days=90),
            'close_date': date.today() - timedelta(days=87),
            'listing_date': date.today() - timedelta(days=80),
            'issue_size': '₹38 Cr.',
            'issue_type': 'book_built',
            'status': 'listed',
            'ipo_price': Decimal('41.00'),
            'listing_price': Decimal('45.00'),
            'current_market_price': Decimal('52.00'),
        },
    ]
    
    for ipo_data in sample_ipos:
        ipo, created = IPO.objects.get_or_create(
            company_name=ipo_data['company_name'],
            defaults=ipo_data
        )
        
        if created:
            print(f"Created IPO: {ipo.company_name}")
        else:
            print(f"IPO already exists: {ipo.company_name}")

if __name__ == '__main__':
    create_sample_data()
    print("Sample data creation completed!")
