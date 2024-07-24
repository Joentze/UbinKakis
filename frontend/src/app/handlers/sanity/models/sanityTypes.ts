interface Slug {
  current: string;
  _type: "slug";
}

interface ImageAsset {
  _ref: string;
  _type: "reference";
}

interface MainImage {
  _type: "image";
  asset: ImageAsset;
}

interface Reference {
  _ref: string;
  _type: "reference";
  _key?: string;
}

interface Span {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

interface Block {
  markDefs: any[];
  children: Span[];
  _type: "block";
  style: string;
  _key: string;
  listItem?: "bullet";
  level?: number;
}

interface YouTubeBlock {
  _type: "youtube";
  _key: string;
  url: string;
}

interface AuthorNameSlug {
  name: string;
  slug: string;
}
interface Post {
  authorName: AuthorNameSlug[];
  _updatedAt: string;
  slug: Slug;
  mainImage: MainImage;
  publishedAt: string;
  _type: "post";
  _id: string;
  categories: Reference[];
  body: (Block | YouTubeBlock)[];
  title: string;
  author: Reference;
  _createdAt: string;
  _rev: string;
}

interface AuthorName {
  name: string;
}

interface PostPeek {
  publishedAt: string;
  title: string;
  image: string;
  slug: string;
  author: AuthorName[];
}
