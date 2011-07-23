import urllib2
import json
import pprint
from ConfigParser import ConfigParser
import os.path

# Basic Setup
uri = "https://api.github.com"
pp = pprint.PrettyPrinter(indent=4)

# Get the Credentials..so I'm not storing them in this repo
gitconfig = ConfigParser()
gitconfig.readfp(open(os.path.expanduser("~/.gitconfig")))
username = gitconfig.get("github", "user")
password = gitconfig.get("github", "password")

# Build my HTTP Client with the HTTPBasic Authentication built in
password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
password_mgr.add_password(None, uri, username, password)
handler = urllib2.HTTPBasicAuthHandler(password_mgr)
opener = urllib2.build_opener(handler)
urllib2.install_opener(opener)

# Make the request
request = urllib2.Request("%s/users/%s/gists" % (uri, username))
response = urllib2.urlopen(request)
resp_parsed = json.loads(response.read())
pp.pprint(resp_parsed)
