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

#### Cloner le projet
git clone https://github.com/TimDesmet00/API-compta-simple-nodeJs.git
cd API-compta-simple-nodeJs

#### Installer les dépendances
npm install

#### Créer un fichier .env et y ajouter les variables nécessaires
cp .env.example .env

#### Démarrer le serveur en mode développement
npm run nodemon

## 🛠️ Stack technique

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Outils** :
  - **Nodemon** : pour le rechargement automatique en développement
  - **Dotenv** : pour la gestion des variables d'environnement

## 📍 Routes de l'API

L'API expose plusieurs endpoints pour la gestion des clients, des factures, des processus de facturation et des journaux de revenus.

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
| `GET` | `/facture/getclient/:id` | Récupérer les factures d'un client |
| `GET` | `/facture/getuser/:id` | Récupérer les factures d'un utilisateur |
| `PATCH` | `/facture/update/:id` | Modifier une facture |
| `DELETE` | `/facture/delete/:id` | Supprimer une facture |

### 📂 Gestion des factures entrantes (`/processInvoiceIn`)
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/processInvoiceIn/add` | Ajouter une facture entrante |
| `GET` | `/processInvoiceIn/getall` | Récupérer toutes les factures entrantes |
| `GET` | `/processInvoiceIn/getone/:id` | Récupérer une facture entrante spécifique |
| `PATCH` | `/processInvoiceIn/update/:id` | Modifier une facture entrante |
| `PATCH` | `/processInvoiceIn/close/:id` | Mettre à jour et clôturer une facture entrante |
| `DELETE` | `/processInvoiceIn/delete/:id` | Supprimer une facture entrante |

### 📂 Gestion des factures sortantes (`/processInvoiceOut`)
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/processInvoiceOut/add` | Ajouter une facture sortante |
| `GET` | `/processInvoiceOut/getall` | Récupérer toutes les factures sortantes |
| `GET` | `/processInvoiceOut/getone/:id` | Récupérer une facture sortante spécifique |
| `PATCH` | `/processInvoiceOut/update/:id` | Modifier une facture sortante |
| `PATCH` | `/processInvoiceOut/close/:id` | Mettre à jour et clôturer une facture sortante |
| `DELETE` | `/processInvoiceOut/delete/:id` | Supprimer une facture sortante |

### 📂 Gestion du journal des revenus (`/revenueJournal`)
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/revenueJournal/add` | Ajouter une entrée dans le journal des revenus |
| `GET` | `/revenueJournal/getall` | Récupérer toutes les entrées du journal des revenus |
| `GET` | `/revenueJournal/getone/:date` | Récupérer une entrée spécifique du journal par date |
| `PATCH` | `/revenueJournal/update/:date` | Modifier une entrée du journal des revenus |
| `DELETE` | `/revenueJournal/delete/:date` | Supprimer une entrée du journal des revenus |


## 🛠 Configuration de l'environnement

Le projet utilise un fichier `.env` pour stocker les variables d'environnement.  
Voici un exemple de configuration :


PORT=3000

MONGO_URI=votre route mongoDB
