const jwt = require('jsonwebtoken');
const Database = require('../database/database');

const JWT_SECRET = 'work_schedule_secret_key_2024'; // U produkciji koristiti environment varijablu

// Middleware za verifikaciju JWT tokena
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Pristup odbačen. Token nije pronađen.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Nevaljan token.' });
        }
        req.user = user;
        next();
    });
};

// Middleware za provjeru admin uloge
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Pristup odbačen. Potrebne su admin privilegije.' });
    }
    next();
};

// Middleware za provjeru production uloge
const requireProduction = (req, res, next) => {
    if (req.user.role !== 'production') {
        return res.status(403).json({ error: 'Pristup odbačen. Potrebne su production privilegije.' });
    }
    next();
};

// Middleware za provjeru admin ili production uloge
const requireAdminOrProduction = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'production') {
        return res.status(403).json({ error: 'Pristup odbačen. Nemate potrebne privilegije.' });
    }
    next();
};

// Funkcija za generiranje JWT tokena
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            username: user.username, 
            role: user.role,
            full_name: user.full_name 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Funkcija za verifikaciju korisnika iz baze
const verifyUser = (username, password) => {
    const bcrypt = require('bcryptjs');
    const db = new Database();
    
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        
        db.getDb().get(query, [username], (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            
            if (!user) {
                resolve(null); // Korisnik ne postoji
                return;
            }
            
            // Provjera lozinke
            const isValidPassword = bcrypt.compareSync(password, user.password_hash);
            
            if (isValidPassword) {
                // Uklanjanje hash-a lozinke iz odgovora
                const { password_hash, ...userWithoutPassword } = user;
                resolve(userWithoutPassword);
            } else {
                resolve(null); // Pogrešna lozinka
            }
        });
    });
};

module.exports = {
    authenticateToken,
    requireAdmin,
    requireProduction,
    requireAdminOrProduction,
    generateToken,
    verifyUser,
    JWT_SECRET
};