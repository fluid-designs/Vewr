DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movies;
DROP TABLE users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255)
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER,
  title VARCHAR(255),
  synopsis TEXT,
  released_on VARCHAR(255),
  image_url TEXT
);

CREATE TABLE reviews ( 
    id SERIAL PRIMARY KEY,
    review VARCHAR(1000),
    rating FLOAT,
    recommended BIT,
    created_on BIGINT,
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id)
  );