CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price integer,
  description text,
  image_url text,
  category text,
  desen text,
  beden text[],
  in_stock boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);
