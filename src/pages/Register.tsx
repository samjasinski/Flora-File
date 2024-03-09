import RegisterForm from "../components/forms/RegisterForm";
import Card from "../components/card/Card";

const Register = () => {
  return (
    <div>
      <Card>
        <h1 className="text-center mb-10 mt-5 text-xl">
          Time to <span className="emphasis">sign up!</span>
        </h1>
        <RegisterForm />
      </Card>
    </div>
  );
};

export default Register;
