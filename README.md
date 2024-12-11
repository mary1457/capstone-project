GlowBook
Descrizione del progetto
GlowBook è una piattaforma digitale pensata per semplificare la prenotazione di servizi di bellezza e benessere, come trattamenti estetici e spa. L’applicazione consente agli utenti di trovare facilmente i migliori trattamenti vicino a loro, mentre offre ai professionisti uno strumento pratico per raggiungere nuovi clienti e gestire il proprio calendario di appuntamenti.
Obiettivo del progetto
Il progetto si pone come obiettivo principale:
•	Per gli utenti: rendere semplice e veloce la ricerca e la prenotazione di trattamenti di bellezza, migliorando l'accessibilità ai servizi di benessere.
•	Per i professionisti: offrire uno strumento digitale per gestire il proprio calendario di appuntamenti e aumentare la visibilità online.
Caratteristiche principali
•	Ricerca rapida e geolocalizzata: trova i servizi di bellezza in base alla città selezionata.
•	Prenotazioni in tempo reale: gestione rapida degli appuntamenti.
•	Gestione utenti: profili personalizzati per clienti e professionisti.
•	Catalogo servizi: visualizzazione di trattamenti e disponibilità.
Tecnologie utilizzate
Frontend
•	Tecnologia: React
React verrà utilizzato per la creazione dell’interfaccia utente. La scelta è motivata dalla sua capacità di offrire:
o	Esperienze interattive e fluide.
o	Componenti riutilizzabili e scalabili.
o	Compatibilità con dispositivi mobili grazie alla natura responsive.
Backend
•	Tecnologia: Spring Boot
Il backend sarà sviluppato con Spring Boot per la gestione delle API RESTful. Questo framework garantirà:
o	Esecuzione veloce e stabile.
o	Facilità di integrazione con il database e servizi esterni.
o	Gestione efficiente delle operazioni CRUD (Create, Read, Update, Delete).
Database
•	Tecnologia: PostgreSQL
Per la gestione dei dati sarà utilizzato un database relazionale PostgreSQL, scelto per:
o	Affidabilità e scalabilità.
o	Ottima gestione delle transazioni.
o	Supporto avanzato per query complesse.
Installazione e configurazione
Requisiti
•	Node.js per l'ambiente frontend (versione 16.x o superiore).
•	Java JDK per il backend (versione 11 o superiore).
•	PostgreSQL per il database.
Installazione
1.	Clone del repository:
git clone https://github.com/<username>/glowbook.git
cd glowbook
2.	Configurazione frontend:
o	Accedi alla directory frontend.
o	Installa le dipendenze con:
npm install
o	Avvia il server di sviluppo:
npm start
3.	Configurazione backend:
o	Accedi alla directory backend.
o	Configura il file application.properties con le credenziali del database.
o	Compila e avvia il backend
4.	Configurazione database:
o	Crea un database PostgreSQL chiamato glowbook.


