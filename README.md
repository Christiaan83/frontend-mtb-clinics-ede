
# **MTBClinicsApplication**

Deze full-stack applicatie is ontworpen om het beheer van mountainbike clinics en verhuur te stroomlijnen. Het biedt functionaliteiten voor het bijhouden van mountainbikes, het organiseren van trainingssessies, het beheren van boekingen en verhuur, en het faciliteren van communicatie met potentiële klanten via een contactformulier.

## Features
+ **Mountainbikebeheer:** Volledige CRUD-functionaliteit (Create, Read, Update, Delete) voor mountainbikes, inclusief het uploaden van afbeeldingen.
+ **Routebeheer:** CRUD-functionaliteit voor mountainbikeroutes met details zoals type, moeilijkheidsgraad en locatie.
+ **Training (Clinic) beheer:** CRUD-functionaliteit voor trainingssessies met details zoals moeilijkheidsgraad, locatie, prijs en tijdschema.
+ **Authenticatie:** Beveiligde authenticatie voor zowel beheerders als gebruikers.
+ **Boekingen**: Gebruikers kunnen trainingssessies boeken.
+ **Verhuur:** Beheer van mountainbikeverhuur, inclusief het koppelen van fietsen aan gebruikers.
+ **Contactformulier:** Potentiële klanten kunnen vragen stellen via een contactformulier.

## Tech Stack
+ **Backend:** Java met Spring Boot framework
+ **Database:** PostgreSQL (beheerd met PgAdmin 4)
+ **Frontend:** React
+ **Ontwikkelomgeving:** IntelliJ IDEA (backend), WebStorm (frontend)

## Installatie en Gebruik

### 1.Database Setup:

+ Installeer en open PgAdmin 4.
+ Maak een nieuwe database aan (bijv. mtb_clinic_db).
+ Noteer de databasegegevens (naam, gebruikersnaam, wachtwoord).

### 2.Backend Setup:

+ Open het project in IntelliJ IDEA.
+ Pas de databasegegevens aan in application.properties.
+ Bouw en run het project.

### 3.Frontend Setup:

+ Open het project in WebStorm.
+ Installeer de dependencies met npm install.
+Start de development server met npm start.

## API Endpoints
Zie documentatie in Endpionts.pdf voor een volledige lijst van alle beschikbare endpoints.
