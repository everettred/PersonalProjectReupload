UPDATE posts
SET
    post_title=${postTitle},
    post_content=${postContent},
    category_id=${categoryId}
WHERE
    post_id=${postID}

