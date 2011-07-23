import json
from ConfigParser import ConfigParser
import os.path
import requests


class GithubClient:
    
    _BASE_URL = "https://api.github.com"
    _use_raw_response = False
    username = None
    password = None
    
    def __init__(self, use_raw_response = False):
        self._use_raw_response = use_raw_response

        # Get the Credentials..so I'm not storing them in this repo
        gitconfig = ConfigParser()
        gitconfig.readfp(open(os.path.expanduser("~/.gitconfig")))
        self.username = gitconfig.get("github", "user")
        self.password = gitconfig.get("github", "password")
    
    def request(self, method, url, *args, **kwargs):
        """
        This is basically requests.api.request
        """
        
        if self.username and self.password:
            kwargs["auth"] = (self.username, self.password)
        
        # args[1] would be the data
        if len(args) > 1:
            args[1] = json.dumps(args[1])
        elif kwargs.get("data"):
            kwargs["data"] = json.dumps(kwargs["data"])
        url = "%s%s" % (self._BASE_URL, url)
        response = requests.request(method, url, *args, **kwargs)
        if self._use_raw_response:
            return response
        return json.loads(response.content)
