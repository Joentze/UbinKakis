import { client } from "./sanityBase";
import { Post, PostPeek } from "../sanity/models/sanityTypes";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await client.fetch('*[_type == "post"]');
    return posts as Post[];
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
export const getPostsPeek = async (): Promise<PostPeek[]> => {
  // for getting title, image, date & category, author's name
  try {
    const posts = await client.fetch(`*[_type == "post"]{
      title,
      "image":mainImage.asset->url,
         "slug":slug.current,
      "authorName":*[_type=="author" && _ref==author._ref] {name},publishedAt
    }`);
    return posts as PostPeek[];
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
export const getPost = async (slug: string): Promise<Post> => {
  try {
    const post = await client.fetch(
      `*[_type=="post" && slug.current == "${slug}"]{
        ...,
        "authorName":*[_type=="author" && _ref==author._ref] {name, "slug":slug.current}
      }`
    );
    return post[0] as Post;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
