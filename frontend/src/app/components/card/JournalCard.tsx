import { Box, Card, Inset, Text } from "@radix-ui/themes"


interface IJournalCard {
    title: string
    image: string
    authorName: string
    date: string
    slug: string
}
const isoToStringDateFormat = (isoDateString: string): string => {
    const isoDate = new Date(isoDateString);
    const day = isoDate.getDate().toString().padStart(2, '0');
    const month = (isoDate.getMonth() + 1).toString().padStart(2, '0');
    const year = isoDate.getFullYear();
    const dayMonthYear = `${day}/${month}/${year}`;
    return dayMonthYear
}
const JournalCard: React.FC<IJournalCard> = ({ title, image, authorName, slug }) => {
    return (
        <Box maxWidth={"350px"} className="m-auto animate-fade-in">
            <Card size="4" className="mx-1" >
                <Inset clip="padding-box" side="top" pb="current">
                    < img

                        src={image}
                        alt={`img-${title}`
                        }
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 200,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset >
                <a href={`/p/${slug}`}>
                    <h1 className="text-3xl text-gray-600 hover:underline cursor-pointer truncate">
                        {title}
                    </h1>
                </a>
                <p className="text-sm text-gray-400">
                    By {authorName}
                </p>
            </Card >
        </Box>
    )
}

export default JournalCard