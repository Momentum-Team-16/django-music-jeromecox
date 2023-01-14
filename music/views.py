from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import User, Album, Artist, Song
from .forms import AlbumForm
from django.contrib import messages
# from .consume import data_album
import json

# Create your views here.
# This is where actions happen. They are triggered by the user (or an AJAX request with JS)visiting a url.


def index(request):
    albums = Album.objects.all()
    form = AlbumForm()
    context = {
        'form': form,
        'albums': albums,
    }
    # context is data from the database
    return render(request, 'music/index.html', context)


def album_detail(request, pk):
    album = get_object_or_404(Album, pk=pk)
    return render(request, 'music/album_detail.html', {'album': album})


def create_album(request):
    if request.method == 'POST':
        form = AlbumForm(request.POST)
        if form.is_valid():
            album = form.save(commit=False)
            album.save()
            messages.success(request, 'Album has been added to your collection')

            data = {
                'created': 'yes',
                'album_title': album.title,
                'album_pk': album.pk
            }
            form = AlbumForm()
        else:
            data = {
                'errors': form.errors
            }
    else:
        data = {'created': 'nothing, you silly goose'}
    return JsonResponse(data)


def create_itunes_album(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        artist_name = data['artist']
        album_title = data['title']
        album_art = data['albumArt']
        album_release = data['releaseDate']
        formatted_release = album_release[:10]
        album_genre = data['albumGenre']

        artist, created = Artist.objects.get_or_create(name=artist_name)

        album_title = data['title']
        album, created = Album.objects.get_or_create(
            title=album_title,
            release_date=formatted_release,
            album_art=album_art
        )

        album.save()
        data = {
            'album_title': album.title,
            'album_artist': artist.name,
            'album_art': album.album_art,
            'album_pk': album.pk,
        }
    else:
        data = {'created': 'nothing'}
    return JsonResponse(data)


def album_edit(request, pk):
    album = get_object_or_404(Album, pk=pk)
    if request.method == "POST":
        form = AlbumForm(request.POST, instance=album)
        if form.is_valid():
            form.save()
            messages.success(request, 'Album has been updated')
            return redirect('album-detail', pk=album.pk)
    else:
        form = AlbumForm(instance=album)
    return render(request, 'music/edit_album.html', {'form': form})


def album_delete(request, pk):
    album = get_object_or_404(Album, pk=pk)
    album.delete()
    messages.error(request, 'Album has been deleted from your collection')
    data = {
        'deleted': 'yes'
    }
    return JsonResponse(data)


def album_delete_detail(request, pk):
    album = get_object_or_404(Album, pk=pk)
    album.delete()
    messages.error(request, 'Album has been deleted from your collection')
    return redirect('home')
