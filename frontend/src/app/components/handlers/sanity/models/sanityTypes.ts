export interface Slug {
  current: string;
  _type: "slug";
}

export interface ImageAsset {
  _ref: string;
  _type: "reference";
}

export interface MainImage {
  _type: "image";
  asset: ImageAsset;
}

export interface Reference {
  _ref: string;
  _type: "reference";
  _key?: string;
}

export interface Span {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface Block {
  markDefs: any[];
  children: Span[];
  _type: "block";
  style: string;
  _key: string;
  listItem?: "bullet";
  level?: number;
}

export interface YouTubeBlock {
  _type: "youtube";
  _key: string;
  url: string;
}

export interface CategoryTitle {
  title: string;
}

export interface AuthorNameSlug {
  name: string;
  slug: string;
}

export interface Image {
  url: string;
}

export interface Post {
  image: Image;
  authorRealName: string;
  authorName: AuthorNameSlug[];
  _updatedAt: string;
  slug: Slug;
  mainImage: MainImage;
  publishedAt: string;
  _type: "post";
  _id: string;
  categories: string[];
  body: (Block | YouTubeBlock)[];
  title: string;
  author: Reference;
  _createdAt: string;
  _rev: string;
}

export interface AuthorName {
  name: string;
}

export interface PostPeek {
  authorRealName: string;
  publishedAt: string;
  title: string;
  image: string;
  slug: string;
  authorName: AuthorName[];
  categories: string[];
}

export interface Team {
  team: string;
  image: string;
  // TODO: provide proper type for the bio
  bio: any[];
}

export interface Author {
  name: string;
  team: string;
  teamSlug: string;
  image: string | undefined;
  bio: any[];
}

export interface TeamPeek {
  team: string;
  teamSlug: string;
  image: string;
}

export interface EventPeek {
  eventName: string;
  image: string;
  eventStartsAt: Date;
  eventEndsAt: Date;
  eventSlug: string;
}

export interface Event {
  eventName: string;
  image: string;
  eventStartsAt: Date;
  eventEndsAt: Date;
  eventSlug: string;
  bio: any[];
}
