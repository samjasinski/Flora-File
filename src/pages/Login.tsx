import Card from "../components/card/Card";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <Card>
      <h1 className="text-center mb-10 mt-5 text-xl">
        Let's <span className="emphasis">login</span> and get to adding!
      </h1>
      <LoginForm />
    </Card>
  );
};

export default Login;
