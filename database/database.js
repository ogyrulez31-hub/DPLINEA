const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'work_schedule.db');

class Database {
    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Greška pri povezivanju sa bazom:', err.message);
            } else {
                console.log('Uspješno povezano sa SQLite bazom podataka.');
            }
        });
    }

    // Kreiranje tabela
    initializeTables() {
        return new Promise((resolve, reject) => {
            const queries = [
                // Tabela korisnika
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role TEXT NOT NULL CHECK(role IN ('admin', 'production')),
                    full_name TEXT NOT NULL,
                    title TEXT DEFAULT '',
                    email TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    created_by_admin_id INTEGER,
                    FOREIGN KEY (created_by_admin_id) REFERENCES users(id)
                )`,

                // Tabela narudžbi
                `CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_number TEXT UNIQUE NOT NULL,
                    client TEXT NOT NULL,
                    date DATE NOT NULL,
                    product TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    material TEXT,
                    deadline DATE NOT NULL,
                    assigned_worker TEXT,
                    status INTEGER DEFAULT 0 CHECK(status IN (0, 1, 2, 3, 4)),
                    price DECIMAL(10,2),
                    advance_payment DECIMAL(10,2),
                    notes TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`,

                // Tabela notifikacija
                `CREATE TABLE IF NOT EXISTS notifications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    admin_id INTEGER NOT NULL,
                    order_id INTEGER NOT NULL,
                    message TEXT NOT NULL,
                    old_status INTEGER,
                    new_status INTEGER,
                    is_read BOOLEAN DEFAULT FALSE,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (admin_id) REFERENCES users(id),
                    FOREIGN KEY (order_id) REFERENCES orders(id)
                )`,

                // Tabela istorije statusa
                `CREATE TABLE IF NOT EXISTS status_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    old_status INTEGER,
                    new_status INTEGER NOT NULL,
                    changed_by_user_id INTEGER NOT NULL,
                    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    notification_sent BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    FOREIGN KEY (changed_by_user_id) REFERENCES users(id)
                )`
            ];

            let completed = 0;
            queries.forEach((query, index) => {
                this.db.run(query, (err) => {
                    if (err) {
                        console.error(`Greška pri kreiranju tabele ${index + 1}:`, err.message);
                        reject(err);
                    } else {
                        completed++;
                        if (completed === queries.length) {
                            console.log('Sve tabele su uspješno kreirane.');
                            resolve();
                        }
                    }
                });
            });
        });
    }

    // Kreiranje default admin korisnika
    createDefaultAdmin() {
        const bcrypt = require('bcryptjs');
        const defaultPassword = bcrypt.hashSync('admin123', 10);
        
        return new Promise((resolve, reject) => {
            const query = `INSERT OR IGNORE INTO users (username, password_hash, role, full_name, email) 
                          VALUES (?, ?, ?, ?, ?)`;
            
            this.db.run(query, ['admin', defaultPassword, 'admin', 'Administrator', 'admin@example.com'], function(err) {
                if (err) {
                    console.error('Greška pri kreiranju default admin korisnika:', err.message);
                    reject(err);
                } else {
                    if (this.changes > 0) {
                        console.log('Default admin korisnik kreiran (username: admin, password: admin123)');
                    } else {
                        console.log('Default admin korisnik već postoji.');
                    }
                    resolve();
                }
            });
        });
    }

    // Zatvaranje konekcije
    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('Greška pri zatvaranju baze:', err.message);
                    reject(err);
                } else {
                    console.log('Konekcija sa bazom zatvorena.');
                    resolve();
                }
            });
        });
    }

    // Funkcija za generiranje sljedećeg broja naloga
    generateOrderNumber() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT MAX(CAST(SUBSTR(order_number, 1, 5) AS INTEGER)) as max_num FROM orders';
            
            this.db.get(query, [], (err, row) => {
                if (err) {
                    console.error('Greška pri generiranju broja naloga:', err);
                    reject(err);
                    return;
                }
                
                let nextNumber = 1;
                if (row && row.max_num) {
                    nextNumber = row.max_num + 1;
                }
                
                // Format: 00001, 00002, itd.
                const orderNumber = nextNumber.toString().padStart(5, '0');
                resolve(orderNumber);
            });
        });
    }

    // Getter za pristup db objektu
    getDb() {
        return this.db;
    }
}

module.exports = Database;