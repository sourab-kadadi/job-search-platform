GIT_USER_NAME=samarth0718
GIT_PASSWORD=iKNOWservice_Samarth
BRANCH=master
SERVICE_NAME=iknowservice
REPO_PATH=gitlab.com/samarth0718/ikj-backend.git
REPO_NAME=ikj-backend
PORT=3000
buildDocker()
{
    sudo rm -rf $REPO_NAME
    sudo git clone -b $BRANCH https://$GIT_USER_NAME:$GIT_PASSWORD@$REPO_PATH
    cd ~/$REPO_NAME
}
buildDocker
docker-compose up -d