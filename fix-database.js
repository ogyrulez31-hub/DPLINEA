const Database = require('./database/database');

async function fixDatabase() {
    const db = new Database();
    
    try {
        console.log('Popravljam bazu podataka...');
        
        // Provjeri da li order_number kolona postoji
        db.getDb().get("PRAGMA table_info(orders)", (err, result) => {
            if (err) {
                console.error('Greška pri provjeri tabele:', err);
                return;
            }
            
            console.log('Struktura orders tabele:', result);
        });
        
        // Dodaj order_number kolonu
        db.getDb().run("ALTER TABLE orders ADD COLUMN order_number TEXT", (err) => {
            if (err && !err.message.includes('duplicate column')) {
                console.error('Greška pri dodavanju order_number:', err.message);
            } else {
                console.log('order_number kolona dodana ili već postoji');
                
                // Ažuriraj postojeće narudžbe
                db.getDb().run("UPDATE orders SET order_number = printf('%05d', id) WHERE order_number IS NULL", function(err) {
                    if (err) {
                        console.error('Greška pri ažuriranju brojeva:', err);
                    } else {
                        console.log(`Ažurirano ${this.changes} narudžbi sa brojem naloga`);
                    }
                });
            }
        });
        
        // Dodaj title kolonu
        db.getDb().run("ALTER TABLE users ADD COLUMN title TEXT DEFAULT ''", (err) => {
            if (err && !err.message.includes('duplicate column')) {
                console.error('Greška pri dodavanju title:', err.message);
            } else {
                console.log('title kolona dodana ili već postoji');
            }
        });
        
        setTimeout(() => {
            console.log('Baza podataka popravljena!');
            process.exit(0);
        }, 2000);
        
    } catch (error) {
        console.error('Greška:', error);
        process.exit(1);
    }
}

fixDatabase();