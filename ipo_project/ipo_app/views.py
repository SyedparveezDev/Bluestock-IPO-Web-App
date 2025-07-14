from django.shortcuts import render
from .models import IPO

def home(request):
    query = request.GET.get('q')
    status_filter = request.GET.get('status')

    ipos = IPO.objects.all()

    if query:
        ipos = ipos.filter(company_name__icontains=query)
    if status_filter:
        ipos = ipos.filter(status=status_filter)

    return render(request, 'ipo_app/ipo_list.html', {
        'ipos': ipos,
        'query': query,
        'status_filter': status_filter,
    })
