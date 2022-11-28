# About
EProtection FTP-Cameras Dashboard

# Installation
1. Checkout the git repo on the terget server /srv/eprotection/cameras-dashboard
    `git clone git@github.com:eprotection/cameras-dashboard.git`
2. Make a build 
    `npm install --omit=dev`
    `npm run build` => it creates "build" forder
3. Set symink dashboard/cameras -> build  (only once)
    `cd /srv/eprotection/dashboard`
    `ln -s /srv/eprotection/cameras-dashboard/build cameras`


# Dev notes:
