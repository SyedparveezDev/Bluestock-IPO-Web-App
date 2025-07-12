from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/ipo/', views.IPOListAPI.as_view(), name='api-ipo-list'),
    path('api/ipo/<int:pk>/', views.IPODetailAPI.as_view(), name='api-ipo-detail'),

    # Web pages
    path('', views.home, name='home'),
    path('ipo/<int:pk>/', views.ipo_detail, name='ipo-detail'),
    path('upcoming/', views.upcoming_ipo, name='upcoming-ipo'),
]
