# Instrukcije za instalaciju i pokretanje

## VAŽNO: Prvo morate instalirati Node.js!

### Korak 1: Instalacija Node.js

#### Windows
1. Idite na https://nodejs.org/
2. Preuzmite **LTS verziju** (trenutno 18.x ili 20.x)
3. Pokrenite installer (.msi fajl)
4. Pratite instrukcije instalacije (ostavite sve default opcije)
5. **OBAVEZNO restartujte Command Prompt ili PowerShell**

#### Provjera instalacije
Otvorite **NOVI** Command Prompt i ukucajte:
```bash
node --version
npm --version
```

Trebali biste vidjeti nešto kao:
```
v18.17.0
9.6.7
```

**Ako ne vidite verzije, Node.js nije pravilno instaliran!**

## Korak 2: Instalacija dependencies

**VAŽNO**: Otvorite **NOVI** Command Prompt nakon instalacije Node.js!

1. Navigirajte u direktorij projekta:
```bash
cd C:\Users\ogyga\Desktop\work-schedule-app
```

2. Instalirajte dependencies:
```bash
npm install
```

**Ako dobijate grešku "npm is not recognized":**
- Node.js nije pravilno instaliran
- Restartujte Command Prompt
- Proverite da li je Node.js u PATH varijabli
- Reinstalirajte Node.js sa admin privilegijama

## Korak 3: Inicijalizacija baze podataka

```bash
npm run init-db
```

## Korak 4: (Opciono) Dodavanje test podataka

Ako želite test podatke, možete ih dodati ručno kroz SQLite:

1. Instalirajte SQLite (https://sqlite.org/download.html)
2. Pokrenite:
```bash
sqlite3 database/work_schedule.db < test-data.sql
```

Ili koristite bilo koji SQLite browser/manager.

## Korak 5: Pokretanje aplikacije

```bash
npm run dev
```

Aplikacija će biti dostupna na: http://localhost:3000

## Default pristupni podaci

- **Username**: admin
- **Password**: admin123

## Test korisnici (ako ste dodali test podatke)

- **Username**: marko, **Password**: password (production)
- **Username**: ana, **Password**: password (production)  
- **Username**: stefan, **Password**: password (production)

## Troubleshooting

### "npm is not recognized"
- Node.js nije instaliran ili nije u PATH varijabli
- Restartujte Command Prompt nakon instalacije

### Port 3000 je zauzet
```bash
set PORT=3001
npm start
```

### Problemi sa bazom
```bash
del database\work_schedule.db
npm run init-db