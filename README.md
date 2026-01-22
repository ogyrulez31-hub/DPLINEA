# Sistem za upravljanje rasporedom posla

Kompletan web sistem za upravljanje narudžbama sa dva različita korisnička interfejsa - admin panel i production panel.

## 🚀 Brzo pokretanje

### Opcija 1: Automatsko pokretanje (Windows)
1. **Instaliraj Node.js** sa https://nodejs.org/ (LTS verzija)
2. **Dupli-klik na `start.bat`** - automatski će instalirati sve i pokrenuti server
3. **Otvori http://localhost:3000**
4. **Login**: admin / admin123

### Opcija 2: Ručno pokretanje
```bash
# 1. Instaliraj Node.js sa https://nodejs.org/
# 2. Navigiraj u direktorij
cd work-schedule-app

# 3. Instaliraj dependencies
npm install

# 4. Kreiraj bazu podataka
npm run init-db

# 5. Pokreni aplikaciju
npm run dev

# 6. Otvori http://localhost:3000
# Login: admin / admin123
```

## 🐛 Ako login ne radi:
1. **Test stranica**: http://localhost:3000/debug.html
2. **Debug stranica**: http://localhost:3000/test.html
3. **Detaljne instrukcije**: [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md)

## Funkcionalnosti

### Admin Panel
- **📋 Upravljanje narudžbama**: Kreiranje, uređivanje, brisanje i pregled svih narudžbi
- **🔢 Broj naloga**: Automatski generiranje brojeva naloga (00001, 00002...)
- **👥 Upravljanje korisnicima**: Dodavanje admin i production korisnika sa titulama
- **🔔 Notifikacije**: Real-time obavještenja o promjenama statusa
- **🔍 Filtriranje**: Napredni filtri po klijentu, statusu, radniku, datumu
- **📊 Sortiranje**: Po datumu, broju naloga, roku (uzlazno/silazno)
- **🎨 Boje za kašnjenje**: Crveno (hitno), žuto (upozorenje), normalno
- **📄 Izvještaji**: Štampa detaljnih izvještaja sa svim podacima
- **⚙️ Postavke**: Mijenjanje profila, lozinke

### Production Panel
- **📋 Pregled narudžbi**: Jednostavan prikaz bez cijena i internih napomena
- **🔢 Broj naloga**: Vidljiv broj naloga za lakše snalaženje
- **🔄 Ažuriranje statusa**: Mogućnost promjene statusa narudžbi (samo naprijed!)
- **📊 Sortiranje**: Po datumu, broju naloga, roku
- **🎨 Boje za kašnjenje**: Vizuelno upozorenje za hitne naloge
- **📄 Radne liste**: Štampa optimizovanih radnih lista
- **🔍 Filtriranje**: Osnovni filtri za production potrebe
- **⚙️ Postavke**: Mijenjanje profila, lozinke

### Sistem statusa (samo naprijed!)
- **0** - Nije uzeto
- **1** - Primljeno
- **2** - Pregledava se
- **3** - U proizvodnji
- **4** - Završeno

**VAŽNO**: Status se može samo povećavati! Kada se jednom promijeni sa 0, ne može se vratiti na 0 ili 1.

### Boje za urgentnost
- **🔴 Crveno**: Prošao rok ili manje od 2 dana
- **🟡 Žuto**: 3-5 dana do roka
- **⚪ Normalno**: Više od 5 dana do roka

### Titule radnika
Admin može dodjeljivati titule kao što su:
- Šef proizvodnje
- Stariji radnik
- Radnik
- Tehnolog
- Kontrolor kvaliteta

## Tehnologije

- **Backend**: Node.js, Express.js
- **Baza podataka**: SQLite
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Autentifikacija**: JWT tokeni
- **Stilizovanje**: Custom CSS sa responsive dizajnom

## Instalacija i pokretanje

### Preduslovi
- Node.js (verzija 14 ili novija)
- npm (dolazi sa Node.js)

### Korak 1: Kloniranje i instalacija
```bash
# Navigiraj u direktorij projekta
cd work-schedule-app

# Instaliraj dependencies
npm install
```

### Korak 2: Inicijalizacija baze podataka
```bash
# Pokreni skriptu za kreiranje baze i tabela
npm run init-db
```

Ova komanda će:
- Kreirati SQLite bazu podataka
- Kreirati sve potrebne tabele
- Dodati default admin korisnika

### Korak 3: Pokretanje aplikacije
```bash
# Za development (sa auto-restart)
npm run dev

# Ili za production
npm start
```

### Korak 4: Pristup aplikaciji
Otvori browser i idi na: `http://localhost:3000`

## Default pristupni podaci

Nakon inicijalizacije baze, možete se prijaviti sa:
- **Username**: `admin`
- **Password**: `admin123`
- **Uloga**: Administrator

## Struktura projekta

```
work-schedule-app/
├── database/
│   ├── database.js          # Database klasa i konfiguracija
│   └── work_schedule.db     # SQLite baza (kreira se automatski)
├── middleware/
│   └── auth.js              # JWT autentifikacija middleware
├── routes/
│   ├── auth.js              # Login/logout routes
│   ├── admin.js             # Admin API routes
│   └── production.js        # Production API routes
├── public/
│   ├── index.html           # Glavni HTML fajl
│   ├── styles.css           # CSS stilovi
│   └── script.js            # Frontend JavaScript
├── scripts/
│   └── init-database.js     # Skripta za inicijalizaciju baze
├── package.json             # NPM konfiguracija
├── server.js                # Glavni server fajl
└── README.md                # Ova dokumentacija
```

## API Endpoints

### Autentifikacija
- `POST /api/auth/login` - Prijava korisnika
- `POST /api/auth/logout` - Odjava korisnika
- `GET /api/auth/verify` - Verifikacija tokena

### Admin API
- `GET /api/admin/orders` - Dohvaćanje narudžbi (sa filtriranjem)
- `POST /api/admin/orders` - Kreiranje nove narudžbe
- `PUT /api/admin/orders/:id` - Ažuriranje narudžbe
- `DELETE /api/admin/orders/:id` - Brisanje narudžbe
- `GET /api/admin/users` - Dohvaćanje korisnika
- `POST /api/admin/users` - Kreiranje novog korisnika
- `PUT /api/admin/users/:id` - Ažuriranje korisnika
- `DELETE /api/admin/users/:id` - Brisanje korisnika
- `GET /api/admin/notifications` - Dohvaćanje notifikacija
- `PUT /api/admin/notifications/:id/read` - Označavanje notifikacije kao pročitane

### Production API
- `GET /api/production/orders` - Dohvaćanje narudžbi (bez cijena)
- `PUT /api/production/orders/:id/status` - Ažuriranje statusa narudžbe
- `GET /api/production/orders/:id` - Dohvaćanje pojedinačne narudžbe
- `GET /api/production/status-options` - Opcije statusa

## Baza podataka

### Tabele

#### users
- `id` - Primarni ključ
- `username` - Korisničko ime (jedinstveno)
- `password_hash` - Hash lozinke
- `role` - Uloga (admin/production)
- `full_name` - Puno ime
- `email` - Email adresa
- `created_at` - Datum kreiranja
- `created_by_admin_id` - ID admin-a koji je kreirao korisnika

#### orders
- `id` - Primarni ključ
- `client` - Naziv klijenta
- `date` - Datum narudžbe
- `product` - Naziv proizvoda
- `quantity` - Količina
- `material` - Materijal
- `deadline` - Rok izvršavanja
- `assigned_worker` - Dodijeljeni radnik
- `status` - Status (0-4)
- `price` - Cijena
- `advance_payment` - Avans
- `notes` - Napomene
- `created_at` - Datum kreiranja

#### notifications
- `id` - Primarni ključ
- `admin_id` - ID admin korisnika
- `order_id` - ID narudžbe
- `message` - Poruka notifikacije
- `old_status` - Stari status
- `new_status` - Novi status
- `is_read` - Da li je pročitana
- `created_at` - Datum kreiranja

#### status_history
- `id` - Primarni ključ
- `order_id` - ID narudžbe
- `old_status` - Stari status
- `new_status` - Novi status
- `changed_by_user_id` - ID korisnika koji je promijenio
- `changed_at` - Datum promjene
- `notification_sent` - Da li je notifikacija poslana

## Sigurnost

- JWT tokeni za autentifikaciju
- Bcrypt hash za lozinke
- Role-based pristup (admin/production)
- CORS podrška
- Input validacija

## Responsive dizajn

Aplikacija je optimizovana za:
- Desktop računare
- Tablete
- Mobilne telefone

## Štampa

- **Admin izvještaji**: Detaljni izvještaji sa svim podacima
- **Production radne liste**: Optimizovane za štampu bez cijena
- CSS print media queries za optimalno formatiranje

## Troubleshooting

### Problem sa pokretanjem
```bash
# Provjeri da li je Node.js instaliran
node --version

# Provjeri da li su dependencies instalirani
npm list

# Reinstaliraj dependencies
rm -rf node_modules
npm install
```

### Problem sa bazom podataka
```bash
# Obriši postojeću bazu i kreiraj novu
rm database/work_schedule.db
npm run init-db
```

### Problem sa portom
Ako je port 3000 zauzet, možete promijeniti port u `server.js` fajlu ili postaviti environment varijablu:
```bash
PORT=3001 npm start
```

## Podrška

Za pitanja i podršku, kontaktirajte administratora sistema.

## Licenca

MIT License