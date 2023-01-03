from django.shortcuts import render

# Create your views here.
# This is where actions happen. They are triggered by the user (or an AJAX request with JS)visiting a url.


def index(request):
  context = {}
  # context is data from the database
  return render(request, 'music/index.html', context)
