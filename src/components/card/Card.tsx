import "./Card.css";

const Card = ({ children }: any) => {
  return (
    <div className="card content-center w-96 lg:w-1/3 mx-auto">{children}</div>
  );
};

export default Card;
