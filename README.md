# API-compta-simple-nodeJs
API Rest développer dans le cadre de mon projet de fin d'année pour ma formation en gestion de base et de l'entrainement en node.js 

## Authors

- [Tim Desmet](https://github.com/TimDesmet00)

## Deployment

local

## Tech Stack

Node.js

## Route

app.use("/client", require("./Router/client.router"));
router.post("/add", clientController.createClient);
router.get("/getall", clientController.getAllClients);
router.get("/getone/:id", clientController.getClientById);
router.patch("/update/:id", clientController.updateClient);
router.delete("/delete/:id", clientController.deleteClient);


app.use("/facture", require("./Router/facture.router"));


app.use("/processInvoiceIn", require("./Router/processInvoiceIn.router"));


app.use("/processInvoiceOut", require("./Router/processInvoiceOut.router"));


app.use("/revenueJournal", require("./Router/revenueJournal.router"));



--------------------------------------------------------------------------------------------------

# API Compta Simple - Node.js

Cette API REST a été développée dans le cadre de mon projet de fin d'année pour ma formation en gestion de base et en développement backend avec Node.js.  
Elle permet de gérer la comptabilité d'une petite entreprise en offrant des fonctionnalités liées aux clients, aux factures et aux journaux de revenus.

## 📌 Fonctionnalités principales

- Gestion des clients (ajout, modification, suppression, récupération)
- Gestion des factures entrantes et sortantes
- Traitement des journaux de revenus
- Connexion à une base de données MongoDB
- API REST structurée avec Express.js

## 👤 Auteur

- **Tim Desmet** - [GitHub](https://github.com/TimDesmet00)

## 🚀 Déploiement

Actuellement, l'API est déployée uniquement en local.

### Installation et exécution
Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [MongoDB](https://www.mongodb.com/) installés sur votre machine.

# Cloner le projet
git clone https://github.com/TimDesmet00/API-compta-simple-nodeJs.git
cd API-compta-simple-nodeJs

# Installer les dépendances
npm install

# Créer un fichier .env et y ajouter les variables nécessaires
cp .env.example .env

# Démarrer le serveur en mode développement
npm run dev

## 🛠️ Stack technique

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Outils** :
  - **Nodemon** : pour le rechargement automatique en développement
  - **Dotenv** : pour la gestion des variables d'environnement

## 📍 Routes de l'API

L'API expose plusieurs endpoints pour la gestion des clients, des factures et des journaux.  

### 📂 Gestion des clients (`/client`)
| Méthode | Route            | Description                              |
|---------|-----------------|------------------------------------------|
| `POST`  | `/client/add`   | Ajouter un nouveau client               |
| `GET`   | `/client/getall` | Récupérer la liste des clients          |
| `GET`   | `/client/getone/:id` | Récupérer un client spécifique      |
| `PATCH` | `/client/update/:id` | Modifier un client                  |
| `DELETE`| `/client/delete/:id` | Supprimer un client                 |

### 📂 Gestion des factures (`/facture`)
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/facture/add` | Ajouter une facture |
| `GET` | `/facture/getall` | Récupérer toutes les factures |
| `GET` | `/facture/getone/:id` | Récupérer une facture spécifique |
| `PATCH` | `/facture/update/:id` | Modifier une facture |
| `DELETE` | `/facture/delete/:id` | Supprimer une facture |

### 📂 Autres services
| Service | Route |
|---------|-------------|
| Traitement des factures entrantes | `/processInvoiceIn` |
| Traitement des factures sortantes | `/processInvoiceOut` |
| Journal des revenus | `/revenueJournal` |

## 🛠 Configuration de l'environnement

Le projet utilise un fichier `.env` pour stocker les variables d'environnement.  
Voici un exemple de configuration :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/compta_simple
