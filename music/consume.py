import requests
import urllib.parse
import Artist
import Album

term = 'The Colour and the Shape'
term_encoded = urllib.parse.quote(term)

response = requests.get('https://itunes.apple.com/search?term=' + term_encoded + '&limit=1&entity=album')
data = response.json()
print(data)
for album in data.get('results'):
    data_album = album
    print(f'Here is an album: {data_album}')


def make_artist_from_my_API():
    new_artist = models.Artist.objects.create(name=data_album.get('artistName'))


def make_album_from_my_API():
    new_album = models.Album.objects.create(
        title=data_album.get('collectionName'),
        release_date=data_album.get('releaseDate')
    )
