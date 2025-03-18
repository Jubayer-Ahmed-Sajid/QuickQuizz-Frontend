import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const { createUser,googleLogin} = useAuth();
 

  // Initialize formik for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    // Define validation schema using Yup
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
          "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    // Handle form submission
    onSubmit: async (values) => {
      try {
        // Log form values
        toast.loading("Creating new user...")
        console.log(values);
        const name = values.name;
        const email = values.email;
        const user = { name, email };
        const password = values.password;
        // create new user
        await createUser(email,password);
        // Send registration request
        const res = await axiosPublic.post("/users/register", user);
        if(res?.data){
          toast.dismiss();
          toast.success(`${name} successfully registered`)
          navigate(location.state ? location.state : '/');
        }

        // Log response data
        console.log(res.data);
      } catch (err) {
        // Log any errors
        console.error(err);
        toast.dismiss();
        toast.error(err.message);
      }
    },
  });

  const handleGoogleLogin = async ()=>{
    try {
      toast.loading("Logging in with Google...")
      await googleLogin();
      toast.dismiss();
      toast.success("Successfully logged in with Google")
      navigate(location.state ? location.state : '/');
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(err.message);
    }
  }

  return (
    <form
    // Handle form submission
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
            Please Register!!
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Input
            label="Full Name"
            size="lg"
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange} // Handle input change
            value={formik.values.name} // Set input value
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-400 text-md">{formik.errors.name}</p> // Display validation error
          ) : null}
          <Input
            label="Email"
            size="lg"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange} // Handle input change
            value={formik.values.email} // Set input value
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400 text-md">{formik.errors.email}</p> // Display validation error
          ) : null}
          <Input
            label="Password"
            size="lg"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange} // Handle input change
            value={formik.values.password} // Set input value
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-400 text-md">{formik.errors.password}</p> // Display validation error
          ) : null}
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Register
          </Button>
          <div className="flex my-4 gap-4 mx-auto justify-center items-center">
            <hr className=" w-full text-black"/>
           <p className="text-black font-semibold text-lg">OR </p> 
            <hr className="w-full text-black"/>
          </div>
          <Button variant="gradient" fullWidth className="flex items-center justify-center" onClick={handleGoogleLogin}>
           Login with Google <FcGoogle className="ml-2 text-xl"/>
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/login" className="ml-1 font-bold text-blue-gray-500">
           
             Login
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
