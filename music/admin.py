from django.contrib import admin
from .models import User
# import each model

# Register your models here.
admin.site.register(User)
# make the admin aware of your model to render it
