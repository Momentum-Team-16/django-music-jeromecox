from django.contrib import admin
from .models import User, Album, Artist
# import each model

# Register your models here.
admin.site.register(User)
admin.site.register(Album)
admin.site.register(Artist)
# make the admin aware of your model to render it
