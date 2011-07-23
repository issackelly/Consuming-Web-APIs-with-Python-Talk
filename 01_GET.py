import urllib2
import json
import pprint

pp = pprint.PrettyPrinter(indent=4)

request = urllib2.Request("https://api.github.com/gists")
response = urllib2.urlopen(request)
resp_parsed = json.loads(response.read())
pp.pprint(resp_parsed)
