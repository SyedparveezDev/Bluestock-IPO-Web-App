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
def upcoming_ipo(request):
    ipos = IPO.objects.filter(status='upcoming')
    selected_ipo = None
    ipo_id = request.GET.get('ipo_id')
    if ipo_id:
        selected_ipo = get_object_or_404(IPO, pk=ipo_id)
    return render(request, 'ipo_app/upcoming_ipo.html', {
        'ipos': ipos,
        'selected_ipo': selected_ipo
    })