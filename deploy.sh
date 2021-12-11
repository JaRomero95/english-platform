# ssh ubuntu@217.182.68.221
# cd english-platform
git pull
sudo docker-compose stop web
sudo docker-compose up -d web
sudo docker-compose run web rails db:migrate
cd client
REACT_APP_BACKEND_URL=http://217.182.68.221:3000 yarn build
cd ..