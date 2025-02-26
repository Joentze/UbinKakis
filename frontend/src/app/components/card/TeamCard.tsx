import { Box, Card, Inset, Text } from "@radix-ui/themes";

interface ITeamCard {
    team: string;
    image: string;
    slug: string;
}

const TeamCard: React.FC<ITeamCard> = ({ team, image, slug }) => {
    return (
        <Box width={"350px"} className="m-auto animate-fade-in">
            <Card size="4" className="mx-1">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={image}
                        alt={`img-${team}`}
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 200,
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <a href={`/t/${slug}`}>
                    <h1 className="text-center text-3xl text-gray-600 hover:underline cursor-pointer truncate">
                        {team}
                    </h1>
                </a>
            </Card>
        </Box>
    );
};

export default TeamCard;
