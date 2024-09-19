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
interface CategoryTitle {
  title: string;
}
interface AuthorNameSlug {
  name: string;
  slug: string;
}
interface Image {
  url: string;
}
interface Post {
  image: Image;
  authorName: AuthorNameSlug[];
  _updatedAt: string;
  slug: Slug;
  mainImage: MainImage;
  publishedAt: string;
  _type: "post";
  _id: string;
  categories: CategoryTitle[];
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
  authorName: AuthorName[];
}

interface Team {
  team: string
  image: string
  // TODO: provide proper type for the bio
  bio: any[]
}

interface Author {
  name: string
  team: string
  teamSlug: string
  image: string | undefined
  bio: any[]
}
interface TeamPeek {
  team: string
  teamSlug: string
  image: string
}

interface EventPeek {
  name: string
  image: string
  eventStartAt: Date
  eventEndsAt: Date
  eventSlug: string
}

interface Event {
  name: string
  image: string
  eventStartAt: Date
  eventEndsAt: Date
  eventSlug: string
  bio: any[]
}