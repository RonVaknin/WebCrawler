# WebCrawler
This app will scan a url for existing images under <img> tags and save every image url in a local file.
## Init application
To start the open the cmd on the project's directory and enter "npm start {url} {depth}"
Where the url parameter should be the desired website address,
and the depth parameter (optional, default to 3) will define the depth which the app will look for images in (by <a> tag links with full addresses)
