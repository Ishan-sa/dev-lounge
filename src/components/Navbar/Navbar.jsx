import React from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { useState } from "react";

export default function Nav() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [variant, setVariant] = useState("default");
  const [activeColor, setActiveColor] = useState("primary");

  //   const { isDark } = useTheme();

  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  const colors = ["primary", "secondary", "success", "warning", "error"];
  const collapseItems = ["Posts", "Contact", "About"];

  const menuLinkContent = [
    {
      name: "Posts",
      href: "/posts",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            Dev Lounge
          </Text>
        </Navbar.Brand>

        <Navbar.Content
          enableCursorHighlight
          hideIn="xs"
          variant="underline"
          className="hidden lg:flex"
        >
          {/* <Navbar.Link href="#">Posts</Navbar.Link>
          <Navbar.Link isActive href="#">
            Contact
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link> */}
          {menuLinkContent.map((item, index) => (
            <>
              <Navbar.Link key={index} href={item.href}>
                {item.name}
              </Navbar.Link>
            </>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="primary" href="#">
            Login
          </Navbar.Link>
          {/* <Button color="primary">Login</Button> */}
          <Navbar.Item>
            <Button auto flat as={Link} href="#" color="primary">
              Sign Up
            </Button>
          </Navbar.Item>
          <div className="block lg:hidden">
            <Navbar.Toggle aria-label="toggle navigation" />
          </div>
          <div>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </div>
        </Navbar.Content>

        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}

/* 
    <div>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </div>
*/
