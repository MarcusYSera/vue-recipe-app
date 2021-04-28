# Express Server for vue-recipe-app

[![Build Status](https://travis-ci.com/MarcusYSera/vue-recipe-app.svg?branch=main)](https://travis-ci.com/MarcusYSera/vue-recipe-app)[![Coverage Status](https://coveralls.io/repos/github/MarcusYSera/vue-recipe-app/badge.svg?branch=main)](https://coveralls.io/github/MarcusYSera/vue-recipe-app?branch=main)[![Maintainability](https://api.codeclimate.com/v1/badges/850a89fa760f035cdbd8/maintainability)](https://codeclimate.com/github/MarcusYSera/vue-recipe-app/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/850a89fa760f035cdbd8/test_coverage)](https://codeclimate.com/github/MarcusYSera/vue-recipe-app/test_coverage)[![Build status](https://ci.appveyor.com/api/projects/status/it7t49repj2sy0e7?svg=true)](https://ci.appveyor.com/project/MarcusYSera/vue-recipe-app)

---

### JWT usage

enter node env
`node`

`require('crypto').randomBytes(64).toString('hex')`

---

##### TO-DO

Finish JWT implementation, create another server and host auth to authentication on an additional pm2 instance

do joins for users to events / refine queries

---

#### PM2

singler server instance

`pm2 start npm -- run server1`

multiple server instances: require name to differentiate

```
pm2 start --name=server1 npm -- run server1
pm2 start --name=server2 npm -- run server2
```

find if an item is running on port

`sudo netstat -tunlp`

to kill process running on port, ie: port 8081

`sudo kill -9 $(sudo lsof -t -i:8081)`

issue with super user also running its own pm2 instances:

https://stackoverflow.com/questions/50987848/node-express-ubuntu-pm2-eaddrinuse
