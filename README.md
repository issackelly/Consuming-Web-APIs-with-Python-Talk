Consuming Web APIs with Python Talk
===================================

Issac Kelly - July 30th 2011 - PyOhio
-------------------------------------

This is all example code for working with the Github API.
I use this for several reasons.

1. It's _very_ well documented.
1. Constantly uses JSON, (so skips Accept, and Content-Type headers)
1. Has both Anonymous and Authenticated support via Basic Auth (over https)

To set it up, put a .gitconfig in your home directory with your github settings

    [github]
    user=issackelly
    password=maipass

### 01_GET.py

This is an example anonymous GET request with the stdlib. Gets all public gists

### 02_POST.py

An example anonymous POST request with the stdlib. Makes an anonymous gist

### 03_Authenticated_GET.py

Authenticate on the api with the stdlib, and GET your own gists.

### 04_requests_Authenticated_GET.py

This is the exact same as #3, except it uses kennethreitz's [requests][requests] Library.

### 05_client_Authenticated_GET.py

This is the same as #3 and #4, but it uses the GithubClient class that we write in the GithubClient.py file.

### GithubClient.py

Our really basic GithubClient is a Github Specific wrapper around the requests library.

### 06_Client_POST.py

This is a rehash of 02, but it's authenticated, and uses our GithubClient.

[requests]: http://github.com/kennethreitz/requests
