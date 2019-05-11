# ESTA WebJS 2+
ESTA WebJS 2+ is a development stack for web applications based on angular/cli. It adds the integration to our environment:

* Jenkins
* SonarQube including coverage
* Unit & E2E Tests on Selenium Webgrid
* Local Unit Tests are running on a headless browser instead of chrome
* Docker based image to run the application in nginx within a container on OpenShift.

## Credits to
* https://github.com/angular/angular-cli

## How to use
* Clone this repository
* Change the following settings:

### Values to change after checkout
Replace the placeholders/esta values in:
- Jenkinsfile (All the placeholders in <>)
- pom.xml (GroupId, ArtifactId, Version)
- package.json (Name, Version)
- Dockerfile (Names, URL, FROM values)

### Environments
Adjust the files in app environments with your personal auth configuration
