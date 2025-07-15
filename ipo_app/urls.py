from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# API Router
router = DefaultRouter()
router.register(r'ipo', views.IPOViewSet)

urlpatterns = [
    # API URLs
    path('api/', include(router.urls)),
    
    # Frontend URLs
    path('', views.home_view, name='home'),
    path('ipo/<int:ipo_id>/', views.ipo_detail_view, name='ipo_detail'),
    path('admin-panel/', views.admin_panel_view, name='admin_panel'),
]
