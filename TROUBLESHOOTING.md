# Troubleshooting - Rješavanje problema

## Problem: "Kad pritisnem prijavi se ne pokreće se ništa"

### BRZI TEST: Koristi test stranicu
1. Pokreni server: `npm run dev`
2. Otvori: http://localhost:3000/test.html
3. Ova stranica će testirati sve komponente i pokazati gdje je problem

### Korak 1: Provjeri da li je server pokrenut
Otvori Command Prompt i provjeri da li server radi:
```bash
cd work-schedule-app
npm run dev
```

Trebao bi vidjeti:
```
Server pokrenut na portu 3000
Otvorite browser na: http://localhost:3000
```

### Korak 2: Provjeri browser konzolu
1. Otvori http://localhost:3000
2. Pritisni F12 (Developer Tools)
3. Idi na "Console" tab
4. Provjeri da li ima grešaka (crvene poruke)

### Korak 3: Provjeri Network tab
1. U Developer Tools idi na "Network" tab
2. Pokušaj login
3. Provjeri da li se šalje zahtjev na `/api/auth/login`

### Mogući uzroci i rješenja:

#### 1. Server nije pokrenut
**Simptom**: Stranica se ne učitava ili pokazuje grešku
**Rješenje**: 
```bash
cd work-schedule-app
npm run dev
```

#### 2. Baza podataka nije kreirana
**Simptom**: Server se pokreće ali login ne radi
**Rješenje**:
```bash
npm run init-db
```

#### 3. JavaScript greške
**Simptom**: Konzola pokazuje greške
**Rješenje**: Provjeri da li su svi fajlovi ispravno učitani

#### 4. CORS problemi
**Simptom**: Network greške u konzoli
**Rješenje**: Server već ima CORS podršku

#### 5. Port je zauzet
**Simptom**: "EADDRINUSE" greška
**Rješenje**:
```bash
set PORT=3001
npm run dev
```

### Testiranje korak po korak:

1. **Provjeri da li se stranica učitava**:
   - Otvori http://localhost:3000
   - Trebao bi vidjeti login formu

2. **Provjeri JavaScript**:
   - Otvori F12 → Console
   - Trebao bi biti prazan (bez grešaka)

3. **Testiranje login forme**:
   - Username: `admin`
   - Password: `admin123`
   - Pritisni "Prijavi se"

4. **Provjeri Network zahtjeve**:
   - F12 → Network tab
   - Trebao bi vidjeti POST zahtjev na `/api/auth/login`

### Česti problemi:

#### Problem: "Failed to fetch"
- Server nije pokrenut
- Pogrešan URL
- CORS problem

#### Problem: "401 Unauthorized"
- Pogrešno korisničko ime ili lozinka
- Baza podataka nije inicijalizovana

#### Problem: "500 Internal Server Error"
- Greška u server kodu
- Problem sa bazom podataka

### Debug informacije:

Ako ništa ne radi, pošaljite mi:
1. Poruke iz Command Prompt-a kada pokrenete server
2. Greške iz browser konzole (F12)
3. Network zahtjeve iz Developer Tools

### Alternativno testiranje:

Možete testirati API direktno:
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

Trebali biste dobiti JSON odgovor sa token-om.