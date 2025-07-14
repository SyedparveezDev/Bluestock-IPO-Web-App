from django.db import models

class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('listed', 'Listed'),
    ]

    company_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    price_band = models.CharField(max_length=100, blank=True, null=True)
    open_date = models.DateField(blank=True, null=True)
    close_date = models.DateField(blank=True, null=True)
    issue_size = models.CharField(max_length=100, blank=True, null=True)
    issue_type = models.CharField(max_length=100, blank=True, null=True)
    listing_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    ipo_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    listing_gain = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    current_return = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    rhp_pdf = models.FileField(upload_to='pdfs/', blank=True, null=True)
    drhp_pdf = models.FileField(upload_to='pdfs/', blank=True, null=True)

    def __str__(self):
        return self.company_name
