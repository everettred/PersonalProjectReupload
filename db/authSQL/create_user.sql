INSERT INTO users(
    username, password_hash
)
VALUES(
    ${username},
    ${hash}
)
RETURNING *