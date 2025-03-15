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
import * as Yup from 'yup';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(8, 'Must be 8 characters or more').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
            "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
          )
          .required('Required'),
      }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Input
            label="Email"
            size="lg"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            label="Password"
            size="lg"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Register
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
        
      </Card>
    </form>
  );
};

export default Register;
