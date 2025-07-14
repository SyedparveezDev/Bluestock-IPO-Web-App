from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import IPO
from .serializers import IPOSerializer

# Homepage: show IPO list + optional selected IPO detail
def home(request):
    ipos = IPO.objects.filter(status='upcoming')
    selected_ipo = None
    ipo_id = request.GET.get('ipo_id')
    if ipo_id:
        selected_ipo = get_object_or_404(IPO, pk=ipo_id)
    return render(request, 'ipo_app/upcoming_ipo.html', {
        'ipos': ipos,
        'selected_ipo': selected_ipo
    })

# Upcoming IPOs page (can be same as home, or separate if you like)
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

# IPO detail page (if user visits /ipo/3/)
def ipo_detail(request, pk):
    ipo = get_object_or_404(IPO, pk=pk)
    return render(request, 'ipo_app/ipo_detail.html', {'ipo': ipo})

# API: List all IPOs
class IPOListAPI(generics.ListAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

# API: IPO detail by ID
class IPODetailAPI(generics.RetrieveAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
