import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const NavigationBar = () => {
  const { user, loading, Logout } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 text-black flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink to="/" className="flex items-center">
        Home
      </NavLink>
      <NavLink to="/quizzes" className="flex items-center">
        Quizzes
      </NavLink>
      <NavLink to="/" className="flex items-center">
        Home
      </NavLink>
      <NavLink to="/" className="flex items-center">
        Home
      </NavLink>
    </ul>
  );
  if (loading) return <div>Loading...</div>;
  const handleLogout = () => {
    Logout();
  };

  return (
    <Navbar className="sticky bg-black/10 top-0 z-10 h-max max-w-full  px-4 py-2 lg:px-8 lg:py-4">
      {/* Large device navbar */}
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 text-black cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>

        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {!user ? (
            <div className="flex items-center gap-x-1">
              <NavLink to="/register" className="flex items-center">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Register</span>
                </Button>
              </NavLink>
              <NavLink to="/login" className="flex items-center">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Login</span>
                </Button>
              </NavLink>
            </div>
          ) : (
            <Button
              onClick={handleLogout}
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
            >
              Logout
            </Button>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile device navbar */}
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          {!user ? (
            <div>
              <NavLink to="/register" className="flex items-center">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Register</span>
                </Button>
              </NavLink>
              <NavLink to="/login" className="flex items-center">
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Login</span>
                </Button>
              </NavLink>
            </div>
          ) : (
            <Button
              onClick={handleLogout}
              fullWidth
              variant="gradient"
              size="sm"
              className=""
            >
              <span>Logout</span>
            </Button>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
