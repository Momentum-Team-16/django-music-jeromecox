from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Album, Artist, Song
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


# def ajax_post_view(request):
#     data_from_post = json.load(request)['post_data']


def create_album(request):
    if request.method == 'POST':
        form = AlbumForm(request.POST)
        if form.is_valid():
            album = form.save(commit=False)
            album.owner = request.user
            album.save()
            messages.success(request, 'Album has been added to your collection')
            # return redirect('album_detail', pk=album.pk)
            data = {
                'created': 'yes',
                'album_title': album.title
            }
        else:
            data = {
                'errors': form.errors
            }
    else:
        data = {'created': 'nothing, you dummy'}
    return JsonResponse(data)


def album_edit(request, pk):
    album = get_object_or_404(Album, pk=pk)
    if request.method == "POST":
        form = AlbumForm(request.POST, instance=album)
        if form.is_valid():
            form.save()
            messages.success(request, 'Album has been updated')
            return redirect('album_detail', pk=album.pk)
    else:
        form = AlbumForm(instance=album)
    return render(request, 'music/edit_album.html', {'form': form})


def album_delete(request, pk):
    album = get_object_or_404(Album, pk=pk)
    album.delete()
    messages.error(request, 'Album has been deleted from your collection')
    return redirect('../..')


# def make_artist_from_my_API():
#     new_artist = Artist.objects.create(name=data_album.get('artistName'))


# def make_album_from_my_API():
#     new_album = Album.objects.create(
#         title=data_album.get('collectionName'),
#         release_date=data_album.get('releaseDate')
#     )


# def make_artist():
#     with open('music/test.json') as file:
#         data = json.load(file)

#     '''TODO: if artist is already in database, merge new album'''

#     data_artist = Artist.objects.create(
#         name=data.get('artistName'))


# def make_album():
#     with open('music/test.json') as file:
#         data = json.load(file)

#     '''TODO: alert user if album is already in database'''

#     data_album = Album.objects.create(
#         title=data.get('collectionName'),
#         release_date=data.get('releaseDate'))


# def make_song():
#     with open('music/test.json') as file:
#         data = json.load(file)
#         print(type(data), data)

#     data_song = Song.objects.create(
#         title=data.get('trackName'),
#         album=data_album,
#         artist=data_artist)
