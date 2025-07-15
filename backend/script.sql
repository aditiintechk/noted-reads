-- users table
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL
);

-- BOOKS TABLE
CREATE TABLE books(
	id SERIAL PRIMARY KEY,
	google_id TEXT UNIQUE,
	name TEXT NOT NULL,
	author TEXT NOT NULL,
	thumbnail TEXT,
	summary TEXT,
	year_published INTEGER 
);

-- USER_BOOKS TABLE
CREATE TABLE user_books(
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
	status TEXT DEFAULT 'Want to Read' CHECK(status IN('Currently Reading', 'Want to Read', 'Completed')) NOT NULL,
	UNIQUE (user_id, book_id)
);

-- notes table (multiple notes per user_book)
CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	user_book_id INTEGER REFERENCES user_books(id) ON DELETE CASCADE,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);