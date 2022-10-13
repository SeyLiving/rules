import React from 'react'
import { getPosts } from "../../utils/getPosts";
import Link from "link/next"


export async function getStaticProps () {
    const posts = await getPosts();

    return {
        props: {
            posts,
        },
    };
}

const Posts = ({ posts }) => {
    console.log(posts);

  return (
    <div>
        {posts?.map((post) => (
            <P>
                <Link href={`/posts/${post._id}`}>{post.title}</Link>
            </P>
        ))}
        <h1>Posts</h1>
    </div>
    );
};

export default Posts;