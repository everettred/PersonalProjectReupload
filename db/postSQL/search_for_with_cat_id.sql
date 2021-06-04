SELECT * FROM posts
WHERE post_title LIKE ${searching}
AND  category_id = ${categoryId}