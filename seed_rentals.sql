-- SEED RENTAL ITEMS
-- Run this in your Supabase SQL Editor

TRUNCATE TABLE rental_items CASCADE;

INSERT INTO rental_items (id, name, category, total_quantity, price_per_hour_cents) VALUES
(1, 'Einsteiger Board', 'board', 10, 1500),
(2, 'Funboard / Pro', 'board', 5, 2000),
(3, 'Rigg komplett', 'other', 15, 1500),
(4, 'SUP Board (1 Std)', 'board', 20, 1500),
(5, 'SUP Board (2 Std)', 'board', 20, 2500),
(6, 'Big SUP (Gruppe)', 'board', 2, 8000),
(7, 'Longboard (1 Std)', 'other', 8, 800),
(8, 'Tagesmiete Longboard', 'other', 8, 2500),
(9, 'Neoprenanzug', 'wetsuit', 30, 500);

-- Reset sequence if needed
SELECT setval('rental_items_id_seq', (SELECT MAX(id) FROM rental_items));
