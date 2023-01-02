from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
  # extends Django's built-in AbstractUser class
  # adding optional fields for additional user info
  bio = models.TextField(max_length=500, blank=True, null=True)
  location = models.CharField(max_length=30, blank=True, null=True)
  birth_date = models.DateField(blank=True, null=True)
