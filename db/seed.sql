CREATE TABLE users(
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    password_hash VARCHAR(300)
); 


CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(user_id),
    post_title VARCHAR(50),
    post_content VARCHAR(500),
    category_id VARCHAR(3),
    posted_time VARCHAR(50),
    post_img_url VARCHAR(500)
)