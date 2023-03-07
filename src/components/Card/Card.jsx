import { Card, Col, Text } from "@nextui-org/react";

export default function Card1({ topHeader, title, image }) {
  return (
    <>
      <Card>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              {topHeader || "Top Header"}
            </Text>
            <Text h4 color="white" size={20} weight="bold">
              {title || "Title"}
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src={image || "https://nextui.org/images/card-example-4.jpeg"}
          objectFit="cover"
          width="100%"
          height="100%"
          alt="Card image background"
          className="hover:scale-110 transition-all duration-500 ease-in-out hover:opacity-90"
        />
      </Card>
    </>
  );
}
