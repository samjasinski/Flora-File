import Card from "../components/card/Card";
import AddSeedForm from "../components/forms/AddSeedForm";

const Add = () => {
  return (
    <div>
      <Card>
        <h1 className="text-center mb-10 mt-5 text-xl">
          Let's <span className="emphasis">add</span> to the collection!
        </h1>

        <AddSeedForm />
      </Card>
    </div>
  );
};

export default Add;
