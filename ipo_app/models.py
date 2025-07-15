from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('listed', 'Listed'),
    ]
    
    ISSUE_TYPE_CHOICES = [
        ('book_built', 'Book Built'),
        ('fixed_price', 'Fixed Price'),
        ('hybrid', 'Hybrid'),
    ]
    
    # Basic Information
    company_name = models.CharField(max_length=255, help_text="Name of the company")
    logo = models.ImageField(upload_to='logos/', null=True, blank=True, help_text="Company logo")
    
    # IPO Details
    price_band = models.CharField(max_length=100, help_text="Price band (e.g., ₹100-120)")
    open_date = models.DateField(help_text="IPO opening date")
    close_date = models.DateField(help_text="IPO closing date")
    issue_size = models.CharField(max_length=100, help_text="Issue size (e.g., ₹1000 Cr.)")
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE_CHOICES, default='book_built')
    listing_date = models.DateField(null=True, blank=True, help_text="Expected/Actual listing date")
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    
    # Financial Information (for listed IPOs)
    ipo_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Final IPO price"
    )
    listing_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Listing day price"
    )
    current_market_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Current market price"
    )
    
    # Documents
    rhp_pdf = models.FileField(upload_to='docs/', null=True, blank=True, help_text="Red Herring Prospectus")
    drhp_pdf = models.FileField(upload_to='docs/', null=True, blank=True, help_text="Draft Red Herring Prospectus")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "IPO"
        verbose_name_plural = "IPOs"
    
    def __str__(self):
        return f"{self.company_name} - {self.status.title()}"
    
    @property
    def listing_gain(self):
        """Calculate listing gain percentage"""
        if self.ipo_price and self.listing_price:
            gain = ((self.listing_price - self.ipo_price) / self.ipo_price) * 100
            return round(float(gain), 2)
        return None
    
    @property
    def current_return(self):
        """Calculate current return percentage"""
        if self.ipo_price and self.current_market_price:
            return_pct = ((self.current_market_price - self.ipo_price) / self.ipo_price) * 100
            return round(float(return_pct), 2)
        return None
    
    @property
    def days_to_open(self):
        """Calculate days remaining to open"""
        from datetime import date
        if self.open_date and self.status == 'upcoming':
            delta = self.open_date - date.today()
            return delta.days if delta.days > 0 else 0
        return None
    
    @property
    def is_active(self):
        """Check if IPO is currently active"""
        from datetime import date
        today = date.today()
        return (self.status == 'ongoing' and 
                self.open_date <= today <= self.close_date)
