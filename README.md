# Groups App

This is the front-end application for Groups, written in Angular

# Installation/Docker Commands

It is intended that you will use [docker](https://docs.docker.com/engine/installation/)
and [docker compose](https://docs.docker.com/compose/install/). You'll need to run the
commands below via command line to get started:

---
NOTE: We are going to use a bash alias to make running docker-compose files a bit less verbose. You can run the following to create `docker-compose-local`, `docker-compose-test`, and `docker-compose-deploy` alias commands:
```
echo "alias docker-compose-local='docker-compose --file=docker-compose-local.yml'" >> ~/.bashrc
echo "alias docker-compose-test='docker-compose --file=docker-compose-test.yml'" >> ~/.bashrc
source ~/.bashrc
echo "alias docker-compose-deploy='docker-compose --file=docker-compose-deploy.yml'" >> ~/.bashrc
source ~/.bashrc
```
---

Copy the variables example file (ready for running locally):
`cp variables.env.example variables.env`

Compile the initial image, or if the Dockerfile changes:
`docker-compose build`

Bring up the container. This will tie the running process and logs to your terminal:
`docker-compose up`

You can now view the app in your browser:
[http://localhost:4202](http://localhost:4202)

To instead run it detached, you can run the following:
`docker-compose up -d app`

To view a detached container's logs as they are generated:
`docker-compose logs --follow`

To stop a detached container:
`docker-compose stop`

To open a bash shell in a container:
`docker-compose exec bash app`


# Committing

Good guide for git commits:
https://chris.beams.io/posts/git-commit/
