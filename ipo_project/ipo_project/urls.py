"""
URL configuration for ipo_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/ipo/', views.IPOListAPI.as_view(), name='api-ipo-list'),
    path('api/ipo/<int:pk>/', views.IPODetailAPI.as_view(), name='api-ipo-detail'),

    # Web pages
    path('', views.home, name='home'),
    path('ipo/<int:pk>/', views.ipo_detail, name='ipo-detail'),
]

