from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
  # extends Django's built-in AbstractUser class
  # adding optional fields for additional user info
  bio = models.TextField(max_length=500, blank=True, null=True)
  location = models.CharField(max_length=30, blank=True, null=True)
  birth_date = models.DateField(blank=True, null=True)

  def __str__(self):
    return self.username


class Artist(models.Model):
  name = models.CharField(max_length=200)
  members = models.CharField(max_length=200)
  date_formed = models.DateField(blank=True, null=True)

  def __str__(self):
    return self.name


class Album(models.Model):
  # set full genre all caps = two letter abbrev
  ALT_ROCK = 'AR'
  # then genre_choices is list of tuples (full genre all caps = full genre for page display)
  GENRE_CHOICES = [(ALT_ROCK, 'Alternative Rock')]

  title = models.CharField(max_length=200)
  artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  # songs = ''  Do we want songs?
  release_date = models.DateField(blank=True, null=True)
  genre = models.CharField(max_length=2, choices=GENRE_CHOICES)
  album_art = models.ImageField(blank=True, null=True)

  def __str__(self):
    return f'{self.title} by {self.artist}'
