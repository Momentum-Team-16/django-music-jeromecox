from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import date

# Create your models here.
CURRENT_YEAR = date.today().year


class User(AbstractUser):
    # extends Django's built-in AbstractUser class
    # adding optional fields for additional user info
    bio = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.username


class Artist(models.Model):
    name = models.CharField(max_length=200, unique=True)
    members = models.CharField(max_length=200, blank=True, null=True)
    year_formed = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(CURRENT_YEAR)], blank=True, null=True)

    def __str__(self):
        return self.name


class Album(models.Model):
    # set full genre all caps = two letter abbrev
    ALT_METAL = 'AM'
    ALT_ROCK = 'AR'
    ROCK = 'RK'
    METAL = 'MT'

    # then genre_choices is list of tuples (full genre all caps = full genre for page display)
    GENRE_CHOICES = [(ALT_METAL, 'Alternative Metal'), (ALT_ROCK, 'Alternative Rock'), (ROCK, 'Rock'), (METAL, 'Metal')]

    title = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    release_date = models.DateField(blank=True, null=True)
    genre = models.CharField(max_length=2, choices=GENRE_CHOICES, null=True, blank=True)
    album_art = models.ImageField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        artists = self.artist_from_songs
        return f'{self.title}' + ' by ' + ','.join([artist.name for artist in artists])

    @property
    def artist_from_songs(self):
        return [song.artist for song in self.songs.all()]


class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='songs')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} by {self.artist}'
