# Documentation

This is written technical documentation for this repo.

## CI/CD with GitLab

Import the repository from GitHub into GitLab

### Set up GitLab's Github Integration

This integration makes it so Github can see Gitlab's status checks

Go to gitlab > [repo] > settings > integrations > github

Create a personal access token from github, or copy it from another gitlab repo
that is already configured with a github integration.

### Set up GitLab's repository mirroring

This mirroring makes sure Gitlab gets updates that are made on Github

Go to gitlab > [repo] > Settings > Repository > Mirroring repositories

set the direction to 'Pull'

enter the *git* url of the repo you want to pull, ex: https://github.com/GazeDev/groups_api.git

select the user you want to pull as, and enter the remote system password for that user (in this case, github password).

Check 'Trigger pipelines for mirror updates' so that CI is run.

At the very least some environment variables will probably need to be added.

Go to gitlab > [repo] > Settings > CI/CD > Variables

Separate testing api keys and accounts should be set up for testing, and api keys
and account passwords should be set to 'Masked' in the gitlab variables UI
