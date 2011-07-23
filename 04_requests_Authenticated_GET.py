import json
import pprint
from ConfigParser import ConfigParser
import os.path
import requests

# Basic Setup
uri = "https://api.github.com"
pp = pprint.PrettyPrinter(indent=4)

# Get the Credentials..so I'm not storing them in this repo
gitconfig = ConfigParser()
gitconfig.readfp(open(os.path.expanduser("~/.gitconfig")))
username = gitconfig.get("github", "user")
password = gitconfig.get("github", "password")

response = requests.get("%s/users/%s/gists" % (uri, username), auth=(username, password))
resp_parsed = json.loads(response.content)
pp.pprint(resp_parsed)
