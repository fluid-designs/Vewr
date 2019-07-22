DROP TABLE IF EXISTS reviews
DROP TABLE IF EXISTS movies;
DROP TABLE users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  avatar_url TEXT,
);

CREATE TABLE reviews ( 
    id SERIAL PRIMARY KEY,
    rating FLOAT,
    recommended BIT default 'FALSE',
    created_at DATE,
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id)
  );


CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER,
  title VARCHAR(255),
  overview TEXT,
  released_date VARCHAR(255),
  poster_path TEXT,
  user_id INTEGER NOT NULL,
  created_at DATE,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
