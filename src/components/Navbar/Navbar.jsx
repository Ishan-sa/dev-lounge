import React from "react";
import { Navbar, Button, Link, Text, Loading } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router.js";
import { Avatar } from "@nextui-org/react";

export default function Nav() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnText, setBtnText] = useState("Sign In");
  const [signOutBtnText, setSignOutBtnText] = useState("Sign Out");

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.querySelector(".navbar-toggler").click();
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
          variant="highlight-rounded"
          className="hidden lg:flex"
        >
          {menuLinkContent.map((item, index) => (
            <Navbar.Link
              onClick={() => router.push(item.href)}
              key={index}
              isActive={
                router.pathname === item.href ||
                (item.slug && router.pathname.startsWith(item.slug))
              }
            >
              {item.name}
            </Navbar.Link>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          {session ? (
            <>
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
                className="bg-[#a6caff7f] hover:bg-[#5a9cff8d] text-[#3284ff]"
                auto
              >
                {btnLoading && <Loading color="currentColor" size="sm" />}
                {btnText}
              </Button>
            </>
          )}

          <div className="block lg:hidden">
            <Navbar.Toggle
              aria-label="toggle navigation"
              onClick={handleMenuClick}
              className="navbar-toggler"
            />
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

        {/* Mobile Menu */}

        {/* close the menu when click on a link in the menu */}

        <Navbar.Collapse
          className={`block lg:hidden ${isMenuOpen ? "show" : ""}`}
        >
          {menuLinkContent.map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                onClick={() => {
                  router.push(item.href), handleLinkClick();
                }}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
