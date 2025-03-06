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
const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen">
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
          <Input label="Full Name" size="lg" />
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
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
    </div>
  );
};

export default Register;
