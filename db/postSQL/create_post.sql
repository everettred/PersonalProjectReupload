INSERT INTO posts(
    author_id, 
    post_title,
    post_content,
    category_id,
    posted_time,
    post_img_url
    
)
VALUES(
    ${userId},
    ${postTitle},
    ${postContent},
    ${categoryId},
    ${postedTime},
    ${url}
)
RETURNING *