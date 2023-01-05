from django.contrib import admin
from .models import User, Album, Artist, Song
# import each model

# Register your models here.
admin.site.register(User)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(Song)
# make the admin aware of your model to render it
