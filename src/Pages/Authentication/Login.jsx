import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Hooks/useAuth";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
          "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        toast.loading("Logging in...");
        const { email, password } = values;
        await login(email, password);
        toast.dismiss();
        toast.success("Logged in successfully");
        navigate(location.state ? location.state : "/");
      } catch (err) {
        toast.dismiss();
        toast.error(err.message);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      toast.loading("Logging in with Google...");
      await googleLogin();
      toast.dismiss();
      toast.success("Successfully logged in with Google");
      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-center justify-center h-screen"
    >
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Please Login!!
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400 text-md">{formik.errors.email}</p>
          ) : null}
          <Input
            label="Password"
            size="lg"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-400 text-md">{formik.errors.password}</p>
          ) : null}
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Login
          </Button>
          <div className="flex my-4 gap-4 mx-auto justify-center items-center">
            <hr className=" w-full text-black" />
            <p className="text-black font-semibold text-lg">OR </p>
            <hr className="w-full text-black" />
          </div>
          <Button
            variant="gradient"
            fullWidth
            className="flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            Login with Google <FcGoogle className="ml-2 text-xl" />
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            New to the site?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Register
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
