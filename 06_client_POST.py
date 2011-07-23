import pprint
from GithubClient import GithubClient

pp = pprint.PrettyPrinter(indent=4)

g = GithubClient()
response = g.request("POST", "/gists",  data={
    "description": "An Example for my Talk on Consuming Web APIs with Python",
    "public": True,
    "files": {
        "hello_guido.py": {
            "content": 'print "Hello Guido!"',
        },
    },
})
pp.pprint(response)
