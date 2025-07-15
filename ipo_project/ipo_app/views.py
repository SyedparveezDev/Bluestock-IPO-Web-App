from django.core.paginator import Paginator

def home(request):
    query = request.GET.get('q')
    status_filter = request.GET.get('status')

    ipos = IPO.objects.all()

    if query:
        ipos = ipos.filter(company_name__icontains=query)
    if status_filter:
        ipos = ipos.filter(status=status_filter)

    paginator = Paginator(ipos, 6)  # 6 IPOs per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'ipo_app/ipo_list.html', {
        'page_obj': page_obj,
        'query': query,
        'status_filter': status_filter,
    })
