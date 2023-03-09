import React from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  useTheme,
  Loading,
} from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router.js";
import { Avatar } from "@nextui-org/react";

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

  const [btnLoading, setBtnLoading] = useState(false);
  const [btnText, setBtnText] = useState("Sign In");
  const [signOutBtnText, setSignOutBtnText] = useState("Sign Out");

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

  const collapseItems = ["Posts", "Contact", "About"];

  const menuLinkContent = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Articles",
      href: "/articles",
      slug: `/articles/`,
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

  const handleSignIn = () => {
    setBtnLoading(true);
    setBtnText("");
    setTimeout(() => {
      signIn();
      setBtnLoading(false);
    }, 2000);
  };

  const handleSignOut = () => {
    try {
      setBtnLoading(true);
      setSignOutBtnText("");
      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

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
                isActive={
                  router.pathname === item.href ||
                  (item.slug && router.pathname.startsWith(item.slug))
                }
              >
                {item.name}
              </Navbar.Link>
            </>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          {session ? (
            <>
              {/* <Navbar.Link color="primary" onClick={() => handleSignOut()}>
                Sign Out
              </Navbar.Link> */}
              <Button
                color="primary"
                onClick={() => handleSignOut()}
                className="bg-blue-500 hover:bg-blue-700 text-white"
                auto
              >
                {btnLoading && <Loading color="currentColor" size="sm" />}
                {signOutBtnText}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                onClick={() => handleSignIn()}
                className="bg-blue-500 hover:bg-blue-700 text-white"
                auto
              >
                {btnLoading && <Loading color="currentColor" size="sm" />}
                {btnText}
              </Button>
            </>
          )}

          <div className="block lg:hidden">
            <Navbar.Toggle aria-label="toggle navigation" />
          </div>
          {/* <div>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </div> */}
          <Avatar
            squared
            src={
              session?.user?.image ||
              "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
            }
            zoomed
          />
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
