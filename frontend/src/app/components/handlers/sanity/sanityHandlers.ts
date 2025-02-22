import { client } from "./sanityBase";
import {
  Author,
  Event,
  EventPeek,
  Post,
  PostPeek,
  Team,
  TeamPeek,
} from "./models/sanityTypes";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await client.fetch('*[_type == "post"]');
    console.log(posts);
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
      "authorName":*[_type=="author" && _ref==author._ref] {name},publishedAt,
      "authorRealName":author->name
    }`);
    console.log(posts);
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
        "image":mainImage.asset->url,
        "authorName":*[_type=="author" && _ref==author._ref] {name, "slug":slug.current},
        "authorRealName":author->name,
        categories[]->{title}
      }`,
    );
    console.log(post);
    return post[0] as Post;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getTeamsPeek = async (): Promise<TeamPeek[]> => {
  try {
    const teams = await client.fetch(`
    *[_type=="team"]{
      team,
      "teamSlug":slug.current,
      "image":image.asset->url
    }
    `);
    console.log(teams);
    return teams as TeamPeek[];
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getTeam = async (slug: string): Promise<Team> => {
  try {
    const team = await client.fetch(
      `
      *[_type=="team" && slug.current == "${slug}"]{
        team,
        bio,
        "image":image.asset->url
      }
      `,
    );
    console.log(team);
    return team[0] as Team;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getEventsPeek = async (): Promise<EventPeek[]> => {
  try {
    const events = await client.fetch(
      `*[_type=="event"]{
        eventName,
        eventStartsAt,
        "eventSlug":slug.current,
        eventEndsAt,
        "image":image.asset->url
      }
      `,
    );
    console.log(events);
    let formattedEvents: EventPeek[] = events.map((event: Event) => ({
      ...event,
      eventStartsAt: new Date(event["eventStartsAt"]),
      eventEndsAt: new Date(event["eventEndsAt"]),
    })).sort((a: Event, b: Event) =>
      a.eventStartsAt.getTime() - b.eventStartsAt.getTime()
    );

    return formattedEvents as EventPeek[];
  } catch (e) {
    throw new Error("There was an error with getting events");
  }
};

export const getEvent = async (slug: string): Promise<Event> => {
  try {
    const event = await client.fetch(
      `
      *[_type=="event" && slug.current == "${slug}"]{
        eventName,
        eventStartsAt,
        "eventSlug":slug.current,
        eventEndsAt,
        bio,
        "image":image.asset->url
      }
      `,
    );
    console.log(event);
    return {
      ...event[0],
      eventStartsAt: new Date(event[0]["eventStartsAt"]),
      eventEndsAt: new Date(event[0]["eventEndsAt"]),
    } as Event;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getAuthor = async (slug: string): Promise<Author> => {
  try {
    const author = await client.fetch(
      `
      *[_type=="author" && slug.current == "${slug}"]{
      ...team->{
        "teamSlug":slug.current,
        "team":team
      },
        name,
        bio,
        "image":image.asset->url
      }
      `,
    );
    console.log(author);
    return author[0] as Author;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
