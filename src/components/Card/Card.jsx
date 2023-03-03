import { Card, Col, Text } from "@nextui-org/react";

export default function Card1() {
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
              What to watch
            </Text>
            <Text h4 color="white" size={20} weight="bold">
              Stream the Acme event
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="https://nextui.org/images/card-example-4.jpeg"
          objectFit="cover"
          width="100%"
          height={340}
          alt="Card image background"
        />
      </Card>
    </>
  );
}
