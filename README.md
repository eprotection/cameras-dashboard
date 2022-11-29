## About
Frontend for an image surveillance system based on ftp-cameras.   
Example: http://eprotection.org/cameras/?ws=observer

## Under the hood (the backend description)
There are some ftp-cameras registered in the system. Each camera uploads images to the ftp-server. The backend pulls the images from the ftp and place them in the system storage. So, the ftp-server is used as a buffer only.

## Installation on the server
1. Download the code    
    `git clone git@github.com:igormayachenkov/cameras-dashboard.git`
2. Make a build  
    `npm install --omit=dev`   
    `npm run build` => it creates "build" forder
3. To expose as a subpage `/cameras`. Set symink dashboard/cameras -> build  (only once)   
    `cd /var/www/html`   
    `ln -s /your-path/cameras-dashboard/build cameras`

