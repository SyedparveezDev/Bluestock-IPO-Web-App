from django.shortcuts import render, get_object_or_404
from rest_framework import generics, filters
from .models import IPO
from .serializers import IPOSerializer

# API views
class IPOListAPI(generics.ListAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['company_name', 'status']
    ordering_fields = ['open_date', 'listing_date']

class IPODetailAPI(generics.RetrieveAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

# Web views
