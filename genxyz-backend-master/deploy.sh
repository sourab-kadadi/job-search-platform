GIT_USER_NAME=samarth0718
GIT_PASSWORD=
BRANCH=master
SERVICE_NAME=genXYZ
REPO_PATH=gitlab.com/samarth0718/genxyz/genxyz-backend.git
REPO_NAME=genxyz-backend
PORT=3000

buildDocker()
{
    sudo rm -rf $REPO_NAME
    sudo git clone -b $BRANCH https://$GIT_USER_NAME:$GIT_PASSWORD@$REPO_PATH
    cd ~/$REPO_NAME
}

buildDocker

sudo docker run --name $SERVICE_NAME -itd --net="host" \
-e PORT=$PORT \
-e DATABASE_USER=$DATABASE_USER \
-e DATABASE_PASSWORD=$DATABASE_PASSWORD \
-e DB_HOST=$DB_HOST \
-e S3_ACCESS_KEY=AKIA3IV4SUPPET3MYB7G \
-e S3_SECRATE_KEY=imqxvkiXxYAxSQqnmMDw1aN9EQZ0X5261i72D8qN \
-e S3_BUCKET_NAME=genxyz.work \
-e S3_REGION=ap-south-1 \
-e REDIS_HOST=genxyzfargate-001.hcbytp.0001.euw2.cache.amazonaws.com \
-e REDIS_PORT=6379 \
-e ACCESS_TOKEN_EXPIRY=1 \
-e REFRESH_TOKEN_EXPIRY=3 \
-e ACCESS_TOKEN_IAT=5 \
-e REFRESH_TOKEN_IAT=2 \
-e ACCESS_TOKEN_SECRATE=samarth \
-e REFRESH_TOKEN_SECRATE=refreshToken \
--restart unless-stopped \
$SERVICE_NAME:latest;



echo "Deploy Complete";
echo $(sudo docker ps);