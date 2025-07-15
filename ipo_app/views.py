from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from django.db.models import Q
from .models import IPO
from .serializers import IPOSerializer, IPOListSerializer

class IPOViewSet(viewsets.ModelViewSet):
    """
    ViewSet for IPO CRUD operations
    Provides list, create, retrieve, update, destroy actions
    """
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'issue_type']
    search_fields = ['company_name', 'price_band']
    ordering_fields = ['open_date', 'close_date', 'company_name', 'created_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Use different serializers for different actions"""
        if self.action == 'list':
            return IPOListSerializer
        return IPOSerializer
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming IPOs"""
        upcoming_ipos = self.queryset.filter(status='upcoming')
        serializer = self.get_serializer(upcoming_ipos, many=True)
        return Response({
            'count': upcoming_ipos.count(),
            'results': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def ongoing(self, request):
        """Get ongoing IPOs"""
        ongoing_ipos = self.queryset.filter(status='ongoing')
        serializer = self.get_serializer(ongoing_ipos, many=True)
        return Response({
            'count': ongoing_ipos.count(),
            'results': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def listed(self, request):
        """Get listed IPOs"""
        listed_ipos = self.queryset.filter(status='listed')
        serializer = self.get_serializer(listed_ipos, many=True)
        return Response({
            'count': listed_ipos.count(),
            'results': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get IPO statistics"""
        total_ipos = self.queryset.count()
        upcoming_count = self.queryset.filter(status='upcoming').count()
        ongoing_count = self.queryset.filter(status='ongoing').count()
        listed_count = self.queryset.filter(status='listed').count()
        
        return Response({
            'total_ipos': total_ipos,
            'upcoming': upcoming_count,
            'ongoing': ongoing_count,
            'listed': listed_count
        })

# Frontend Views
def home_view(request):
    """Home page view"""
    return render(request, 'home.html')

def ipo_detail_view(request, ipo_id):
    """IPO detail page view"""
    try:
        ipo = IPO.objects.get(id=ipo_id)
        return render(request, 'ipo_detail.html', {'ipo': ipo})
    except IPO.DoesNotExist:
        return render(request, '404.html', status=404)

def admin_panel_view(request):
    """Admin panel view"""
    return render(request, 'admin_panel.html')
