create TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    user_comment TEXT,
    user_address_city VARCHAR(255) NOT NULL,
    user_address_street VARCHAR(255) NOT NULL,
    user_address_house VARCHAR(50) NOT NULL,
    user_address_building VARCHAR(50),
    user_address_apartment VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,  
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,  
    menu_name VARCHAR(255) ,
    quantity INT 
);
