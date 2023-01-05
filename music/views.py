from django.shortcuts import render
from .models import Album, Artist, Song
import json

# Create your views here.
# This is where actions happen. They are triggered by the user (or an AJAX request with JS)visiting a url.


def index(request):
  albums = Album.objects.all()
  context = {'albums': albums}
  # context is data from the database
  return render(request, 'music/index.html', context)


def make_artist():
  with open('music/test.json') as file:
    data = json.load(file)

  data_artist = Artist.objects.create(
    name=data.get('artistName')
  )


def make_album():
  with open('music/test.json') as file:
    data = json.load(file)

  data_album = Album.objects.create(
    title=data.get('collectionName'),
    release_date=data.get('releaseDate')
  )


def make_song():
  with open('music/test.json') as file:
    data = json.load(file)
    print(type(data), data)

  data_song = Song.objects.create(
    title=data.get('trackName'),
    album=data_album,
    artist=data_artist
  )
