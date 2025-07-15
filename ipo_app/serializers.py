from rest_framework import serializers
from .models import IPO

class IPOSerializer(serializers.ModelSerializer):
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'logo', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'issue_type', 'listing_date', 
            'status', 'ipo_price', 'listing_price', 'current_market_price',
            'rhp_pdf', 'drhp_pdf', 'created_at', 'updated_at',
            'listing_gain', 'current_return', 'days_to_open', 'is_active'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate(self, data):
        """Custom validation"""
        if data.get('open_date') and data.get('close_date'):
            if data['open_date'] >= data['close_date']:
                raise serializers.ValidationError(
                    "Close date must be after open date"
                )
        
        if data.get('status') == 'listed':
            if not data.get('ipo_price'):
                raise serializers.ValidationError(
                    "IPO price is required for listed IPOs"
                )
        
        return data

class IPOListSerializer(serializers.ModelSerializer):
    """Simplified serializer for list views"""
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'logo', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'status', 'listing_gain', 
            'current_return', 'days_to_open'
        ]
