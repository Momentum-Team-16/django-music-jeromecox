# Django Music Collection 🎵

Create an application to keep track of all the music albums you own. You can choose whatever fields you think an album should have, but it should have at least these three:

- title
- artist
- created_at

The `created_at` field should reflect the time that the album object is created (not the year that the album was released, although you could certainly create a field for that too!).

Your Django app should allow you to do the following:

- See a list of all albums on the homepage
- Create a new album
- See a detail page for one existing album
- Edit an existing album
- Delete an existing album

Your app should have at least minimal styling. It's pretty practical to use a CSS library like [Bulma](https://bulma.io/) or [Picnic](https://picnicss.com/), though you can write custom CSS if you want to. Just remember that **for this project, functionality is a higher priority than styling**.

A good place to start is planning out your Album model and making sure you can make an Album object in the admin or shell. Make a couple of them. Then, you can start working on urls and views by make a homepage to list the existing albums.

## URLs

Your app should have the following URLs. You'll need to define view functions to go along with each path. Remember, one view function can handle more than one type of request!

| path                      | verb | purpose                                               |
| ------------------------- | ---- | ----------------------------------------------------- | 
| `""`                      | GET  | show a list of all the albums                         |
| `/albums/new`             | GET  | show a form to create a new album                     |
| `/albums/new`             | POST | create a new album                                    |
| `/albums/<int:pk>`        | GET  | show details about a single album                     |
| `/albums/<int:pk>/edit`   | GET  | show a form to edit a new album                       |
| `/albums/<int:pk>/edit`   | POST | update a specific album                               |
| `/albums/<int:pk>/delete` | GET  | show a confirmation screen to delete a specific album |
| `/albums/<int:pk>/delete` | POST | delete a specific album                               |

❓ Why are we using `POST` instead of `DELETE` or `PUT/PATCH` verbs for the delete and edit actions? It's because we are using web forms to send the data. [Web forms can only send `GET` or `POST` requests](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method). We have more options with AJAX, but we haven't learned about how to use that with Django yet.

## 🌶️ Spicy options

- Add an Artist model and create a foreign key on the Album model to associate the two.
  - Show the Artist and their other albums on the album detail page, with links to those album detail pages.
- Create an way to mark an album as a favorite. Favorited albums are displayed with a star next to them (how you choose to show this is up to you). A user should be able to click on the star, or a link or button, to mark the album as a favorite.
- Show a list of all the albums by a particular artist if a user clicks on an artist's name.

## Getting up and running

In your project directory, get a new Django project set up. Don't forget the `.` at the end of the command to `startproject`!

```
> pipenv install django
> pipenv shell
> django-admin startproject django_music .
```

After you run this, your directory structure should look like this:

```sh
.
├── .gitignore
├── Pipfile
├── Pipfile.lock
├── README.md
├── django_music
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py

1 directory, 10 files
```

To generate an app in your django_music project (so that you have something analogous to `contacts` in the Uptact assignment), you want to run the following (where <name_of_app> is a name you can choose) in your repo:

`django-admin startapp <name_of_app>`

If you want to name your app "albums", then you would run:

```sh
django-admin startapp albums
```

and your directory structure would look like:

```
.
├── .gitignore
├── Pipfile
├── Pipfile.lock
├── README.md
├── albums
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── django_music
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py

3 directories, 17 files
```

Once you have your app set up, be sure to add it to the `INSTALLED_APPS` list in `settings.py`.

- A `.gitignore` file is provided.
- [pipenv](https://pipenv.pypa.io/en/latest/) is used to manage dependencies.

## Optional packages, why you would want them, and how to install them

Uptact has some extensions installed that provide some useful features. You might like to have them installed too!

🦋 It can be tricky to get these installed, but don't be afraid to try. Let an instructor know if things go sideways and you need some help!

#### **[django-extensions](https://django-extensions.readthedocs.io/en/latest/)**

**Why**: This package gives you some extra commands (extensions of the basic functionality of django) that can be super useful. Some examples:

- `shell_plus` gives you a super-charged shell, so you don't have to manually import every model that you want to work with in the shell.
- `show_urls` shows you all the urls you have defined
- `list_model_info` shows you the fields and methods for your models
- and a TON more. Check out [the docs](https://django-extensions.readthedocs.io/en/latest/index.html).

**To Install:**

```sh
pipenv install django-extensions
```

Then [follow the instructions here](https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration) to add it to your `INSTALLED_APPS`.

#### **[django-debug-toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/)**

**Why**: Extra information about each request and data when you load a page in the browser. Can really help you out when you are debugging.

Check out [this video](https://www.youtube.com/watch?v=H-vLUoXKKIs) to see what it can do.

**To Install:**

```sh
pipenv install django-debug-toolbar
```

Then, [follow the instructions here](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites) to add it to your `INSTALLED_APPS`.

#### **[django-environ](https://django-environ.readthedocs.io/en/latest/)**

**Why**: This allows you to have a `.env` file to store all your secret keys and environment variables following best practices (see [The 12-Factor App](https://12factor.net/config) if you want a deep dive!) and easily use those values in your `settings.py`.

**To Install:**

```py
pipenv install django-environ
```

Then [follow the instructions here](https://django-environ.readthedocs.io/en/latest/#installation) AFTER the step to pip install. Remember, we are using `pipenv` to install packages, not `pip`!

You will need to create a new `.env` file and put it inside your project directory, and add your secret variables to this follow (see the example in the docs at the link above). Then you can change the values for those variables in `settings.py` to use the `.env` file. Again, the documentation will show you how.
