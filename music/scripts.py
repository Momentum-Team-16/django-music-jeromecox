import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '../config.settings')

from django.conf import settings
import models
import json

with open('test.json') as file:
  data = json.load(file)
  print(type(data), data)


song = models.Song.objects.create(
  title=data.get('trackName'),
  album=data.get('collectionName'),
  artist=data.get('artistName')
)
