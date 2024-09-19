import { Box, Button, Card, Inset, Text } from "@radix-ui/themes"

interface IEventCard {
    name: string
    image: string
    startsAt: Date
    endsAt: Date
    eventSlug: string
}

const EventCard: React.FC<IEventCard> = ({ name, image, startsAt, endsAt, eventSlug }) => {
    const startDate = startsAt.toISOString().replace(/-|:|\.\d+/g, "").concat("Z");
    const endDate = endsAt.toISOString().replace(/-|:|\.\d+/g, "").concat("Z");
    const googleCalendarLink = `http://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(name)}&dates=${startDate}/${endDate}&details=&location=&trp=false&sprop=&sprop=name:`;

    return (
        <Box maxWidth={"350px"} className="m-auto animate-fade-in">
            <Card size="4" className="mx-1" >
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={image}
                        alt={`img-${name}`}
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 200,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset >
                <a href={`/e/${eventSlug}`}>
                    <h1 className="text-2xl text-gray-600 hover:underline cursor-pointer truncate text-center">
                        {name}
                    </h1>
                </a>
                <div className="flex flex-col text-center mt-4">
                    <Text className="text-sm text-gray-500 text-center">
                        <strong>From:</strong> {startsAt?.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Text className="text-sm text-gray-500 text-center">
                        <strong>To:</strong> {endsAt?.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <a href={googleCalendarLink} target="_blank" rel="nofollow">
                        <Button className="m-auto mt-4" color="orange" variant="surface">Add to Calendar</Button>
                    </a>
                </div>
            </Card >
        </Box>
    )
}

export default EventCard