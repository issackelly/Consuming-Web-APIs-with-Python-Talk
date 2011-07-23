import pprint
from GithubClient import GithubClient

pp = pprint.PrettyPrinter(indent=4)

g = GithubClient()
response = g.request("GET", "/users/%s/gists" % g.username)
pp.pprint(response)
