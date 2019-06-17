
0. Login to container:

   ssh -i ~/CData/aaaChristian/Programming/aws/aws-petermueller/petermueller-keypair.pem ec2-user@ec2-54-93-250-13.eu-central-1.compute.amazonaws.com


1. Container

a) Docker installieren:
   > yum install docker
   > sudo service docker start
   > sudo chmod 777 /var/run/docker.sock

b) create volume for postgres data, certificate and nginx reverse-proxy config
   > docker volume create pv0
   > docker volume create pv1
   > docker volume create pv2

c) Firewall: open HTTP und HTTPS ports (80 and 443)

d) Configure AWS Tool (is already done in Docker Image):
   > aws configure
     AWS Access Key ID [None]: AKIAJY6HQNUDW7QCX2SQ
     AWS Secret Access Key [None]: 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
     Default region name [None]: eu-central-1
     Default output format [None]:


2. Database:

   a) Connect to database from within the container:
      > psql -h localhost -p 5432 -U postgres trainingdb;  (password: admin)

   b) Backup database:
      > pg_dump -U postgres -h localhost -d trainingdb -f backupFilename.sql

   c) Restore DB (generiert auch die Tabellen):
      > aws s3 ls s3://che-climbing-logbook2
      > aws s3 cp s3://che-climbing-logbook2/2019-01-28--0107.sql 2019-01-28--0107.sql
      > psql -h localhost -p 5432 -U postgres -d trainingdb -f 2019-01-28--0107.sql


3. Import an Excel Sheet:
   -> Logbook: Excel Controller auskommentieren -> ist ein Spring MVC Controller mit einem Dialog, um direkt mit der Logbook Applikation Daten zu importieren. 


4. Release bauen: 
   a) Versionen in POMs anpassen und einchecken (auch im app.js und cordova-app/config.xml -> auch version-code)
   b) Deploy Skript ausführen: ./buildAndDeploy version
   c) apk in Google Play Developer Console hochladen -> https://play.google.com/apps/publish/?hl=de
   d) ReleaseNotes erstellen

   Cordova manually: 
      ins Directory logbook-frontend/cordova-app wechseln: 
	  1) cordova build -> erstellt ein neues debug apk -> kann im Emulator gestartet (cordova run) oder auf Device installiert werden
      2) cordova build android --release -- --keystore=./logbook-release-key.keystore --storePassword=bullshitK --alias=logbook --password=bullshitK
         -> release.apk nach logbooks/docker-RELEASE kopieren


5. Domain snoopfish.ch/logbook
   -> Entsprechende Weiterleitung unter hosttech.ch einrichten: 
      Login: email, Password: !9fSiXWQRY 
	  
	  Hosttech Konfiguration: 
	  - Der "A Record" der Domain (snoopfish.ch) zeigt auf den AWS Bucket snoopfish.ch mit der IP Adresse 54.231.193.47
	  - Der "CNAME Record" von www.snoopfish.ch zeigt auf den AWS Bucket www.snoopfish.ch
	  - Auf AWS leitet der Bucket "snoopfish.ch" alle Anfragen auf den Bucket "www.snoopfish.ch" weiter
	  

6. Lets Encrypt Zertifikate:

   a) Nginx muss laufen, aber der reverse-proxy (weiterleiten) ist noch nicht aktiv

   b) generate certificate:
   > certbot --nginx

   c) move redirect instructions (reverse-proxy)
   > mv logbook.snoopfish.ch.conf /etc/nginx/conf.d/

   d) restart nginx
   > service stop nginx
   > service start nginx


7. Develop locally:

   a) Start database locally:
   > docker start mypostgresdb
     oder das erste Mal:
   > docker run --name mypostgresdb -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=trainingdb -v pv0:/var/lib/postgresql/data -d postgres:11.1

   b) Adjust settings app.js:
   - resourceServerUrl: 'http://localhost:8080/',
   - authServerUrl: 'http://localhost:8080/',

   c) Adjust settings in application.properties:
   - spring.datasource.url=jdbc:postgresql://localhost:5432/trainingdb
   - spring.datasource.password=admin

   c) Start backend
   > java -jar ...

   d) Start frontend:
   > cd logbook-frontend
   > gulp serve
   UI is served on http://localhost:3001/#/
