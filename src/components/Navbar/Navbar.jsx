import React from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router.js";

export default function Nav({
  onSignIn = () => {},
  onSignOut = () => {},
  onSignUp = () => {},
}) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [variant, setVariant] = useState("default");
  const [activeColor, setActiveColor] = useState("primary");
  const [handleSignInOut, setHandleSignInOut] = useState(false);

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
      name: "Home",
      href: "/",
    },
    {
      name: "Articles",
      href: "/articles",
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

  const { data: session } = useSession();

  const router = useRouter();

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand onClick={() => router.push("/")}>
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
          {menuLinkContent.map((item, index) => (
            <>
              <Navbar.Link
                key={index}
                href={item.href}
                isActive={router.pathname === item.href ? true : false}
              >
                {item.name}
              </Navbar.Link>
            </>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          {session ? (
            <>
              <Navbar.Link color="primary" onClick={onSignOut}>
                Sign Out
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link color="primary" onClick={onSignIn}>
                Login
              </Navbar.Link>
              <Navbar.Link color="primary" onClick={onSignUp}>
                Sign Up
              </Navbar.Link>
            </>
          )}

          {/* <Navbar.Item>
            <Button auto flat as={Link} href="#" color="primary">
              Sign Up
            </Button>
          </Navbar.Item> */}
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

        <Navbar.Collapse className="block lg:hidden">
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
