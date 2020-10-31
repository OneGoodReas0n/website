echo Write a version 
read VERSION

docker build -t r345on/portfolio:$VERSION .
docker push r345on/portfolio:$VERSION

ssh root@138.68.99.242 "docker pull r345on/portfolio:$VERSION && docker tag r345on/portfolio:$VERSION dokku/portfolio:$VERSION && dokku tags:deploy portfolio $VERSION"



