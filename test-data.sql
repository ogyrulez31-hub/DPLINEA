-- Test podaci za sistem upravljanja rasporedom posla
-- Pokretanje: sqlite3 database/work_schedule.db < test-data.sql

-- Dodavanje test korisnika za proizvodnju
INSERT INTO users (username, password_hash, role, full_name, title, email, created_by_admin_id) VALUES
('marko', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'production', 'Marko Petrović', 'Šef proizvodnje', 'marko@example.com', 1),
('ana', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'production', 'Ana Jovanović', 'Stariji radnik', 'ana@example.com', 1),
('stefan', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'production', 'Stefan Nikolić', 'Radnik', 'stefan@example.com', 1);

-- Test narudžbe sa brojem naloga
INSERT INTO orders (order_number, client, date, product, quantity, material, deadline, assigned_worker, status, price, advance_payment, notes) VALUES
('00001', 'Kompanija ABC d.o.o.', '2024-10-01', 'Metalni okvir', 5, 'Čelik', '2024-10-10', 'Marko Petrović', 0, 1500.00, 500.00, 'Hitna narudžba, potrebna preciznost'),
('00002', 'Građevinska firma XYZ', '2024-10-02', 'Aluminijski profili', 20, 'Aluminij', '2024-10-12', 'Ana Jovanović', 1, 2800.00, 1000.00, 'Standardni profili 40x40mm'),
('00003', 'Privatni klijent - Miloš', '2024-10-03', 'Kapija', 1, 'Željezo', '2024-10-09', 'Stefan Nikolić', 2, 800.00, 300.00, 'Dizajn prema skici klijenta'),
('00004', 'Restoran Zlatna ribica', '2024-10-04', 'Stolovi i stolice', 10, 'Čelik/Drvo', '2024-10-15', 'Marko Petrović', 3, 3200.00, 1500.00, 'Set od 4 stola i 16 stolica'),
('00005', 'Škola Sveti Sava', '2024-10-05', 'Ograđa za igralište', 50, 'Pocinkovani čelik', '2024-10-20', 'Ana Jovanović', 4, 5500.00, 2000.00, 'Visina 1.5m, sa vratima'),
('00006', 'Auto servis Brzina', '2024-10-06', 'Radni sto', 3, 'Čelik', '2024-10-08', 'Stefan Nikolić', 0, 1200.00, 400.00, 'Pojačana konstrukcija - HITNO!'),
('00007', 'Kafić Centar', '2024-10-07', 'Baštenski namještaj', 8, 'Aluminij', '2024-10-25', 'Marko Petrović', 1, 2400.00, 800.00, 'Otporan na vremenske uslove'),
('00008', 'Privatni klijent - Jovana', '2024-10-08', 'Balkonska ograđa', 12, 'Inox', '2024-10-30', 'Ana Jovanović', 2, 1800.00, 600.00, 'Moderni dizajn'),
('00009', 'Fabrika Tekstil', '2024-10-09', 'Industrijski regali', 15, 'Čelik', '2024-11-05', 'Stefan Nikolić', 0, 4200.00, 1500.00, 'Nosivost 500kg po polici'),
('00010', 'Hotel Panorama', '2024-10-10', 'Recepcijski pult', 1, 'Čelik/Staklo', '2024-11-15', 'Marko Petrović', 1, 2200.00, 1000.00, 'Luksuzni dizajn sa LED osvjetljenjem');

-- Test notifikacije (simulacija promjena statusa)
INSERT INTO notifications (admin_id, order_id, message, old_status, new_status, is_read) VALUES 
(1, 2, 'Status narudžbe je promijenjen sa "Nije uzeto" na "Primljeno"', 0, 1, FALSE),
(1, 3, 'Status narudžbe je promijenjen sa "Primljeno" na "Pregledava se"', 1, 2, FALSE),
(1, 4, 'Status narudžbe je promijenjen sa "Pregledava se" na "U proizvodnji"', 2, 3, TRUE),
(1, 5, 'Status narudžbe je promijenjen sa "U proizvodnji" na "Završeno"', 3, 4, TRUE);

-- Test istorija statusa
INSERT INTO status_history (order_id, old_status, new_status, changed_by_user_id, notification_sent) VALUES 
(2, 0, 1, 2, TRUE),
(3, 1, 2, 3, TRUE),
(4, 2, 3, 2, TRUE),
(5, 3, 4, 3, TRUE),
(7, 0, 1, 2, TRUE),
(8, 1, 2, 3, TRUE);