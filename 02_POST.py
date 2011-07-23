import urllib2
import json
import pprint

pp = pprint.PrettyPrinter(indent=4)

request = urllib2.Request("https://api.github.com/gists")

data = {
    "description": "An Example for my Talk on Consuming Web APIs with Python",
    "public": True,
    "files": {
        "hello_guido.py": {
            "content": 'print "Hello Guido!"',
        },
    },
}
request.add_data(json.dumps(data))

response = urllib2.urlopen(request)
resp_parsed = json.loads(response.read())
pp.pprint(resp_parsed)
