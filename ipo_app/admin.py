from django.contrib import admin
from .models import IPO

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = [
        'company_name', 'status', 'open_date', 'close_date', 
        'price_band', 'issue_size', 'listing_gain', 'current_return'
    ]
    list_filter = ['status', 'issue_type', 'open_date', 'created_at']
    search_fields = ['company_name', 'price_band']
    ordering = ['-created_at']
    readonly_fields = ['listing_gain', 'current_return', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company_name', 'logo', 'status')
        }),
        ('IPO Details', {
            'fields': ('price_band', 'open_date', 'close_date', 'issue_size', 
                      'issue_type', 'listing_date')
        }),
        ('Financial Information', {
            'fields': ('ipo_price', 'listing_price', 'current_market_price'),
            'classes': ('collapse',)
        }),
        ('Documents', {
            'fields': ('rhp_pdf', 'drhp_pdf'),
            'classes': ('collapse',)
        }),
        ('Calculated Fields', {
            'fields': ('listing_gain', 'current_return'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
