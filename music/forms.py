from django import forms
from .models import Artist, Album, Song


class ArtistForm(forms.ModelForm):
    class Meta:
        model = Artist
        fields = ('name', 'year_formed')


class AlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ('title', 'release_date', 'genre')


class SongForm(forms.ModelForm):
    class Meta:
        model = Song
        fields = ('title', 'artist', 'album')
