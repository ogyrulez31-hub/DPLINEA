@echo off
echo ========================================
echo  Sistem za upravljanje rasporedom posla
echo ========================================
echo.

REM Provjeri da li postoji Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo GREŠKA: Node.js nije instaliran!
    echo.
    echo Molimo instalirajte Node.js sa https://nodejs.org/
    echo Preuzmite LTS verziju i restartujte Command Prompt nakon instalacije.
    echo.
    pause
    exit /b 1
)

echo Node.js je instaliran: 
node --version
echo NPM verzija: 
npm --version
echo.

REM Provjeri da li su dependencies instalirani
if not exist "node_modules" (
    echo Instaliram dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo GREŠKA: npm install neuspješan!
        pause
        exit /b 1
    )
    echo.
)

REM Provjeri da li postoji baza podataka
if not exist "database\work_schedule.db" (
    echo Kreiram bazu podataka...
    npm run init-db
    if %errorlevel% neq 0 (
        echo GREŠKA: Kreiranje baze neuspješno!
        pause
        exit /b 1
    )
    echo.
)

echo Pokretam server...
echo.
echo ========================================
echo  Server će biti dostupan na:
echo  http://localhost:3000
echo.
echo  Login podaci:
echo  Username: admin
echo  Password: admin123
echo.
echo  Za testiranje: http://localhost:3000/debug.html
echo ========================================
echo.
echo Pritisnite Ctrl+C da zaustavite server
echo.

npm run dev