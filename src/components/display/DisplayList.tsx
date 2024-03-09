import "./DisplayList.css";

interface Seed {
  common_name: {
    type: String;
    required: true;
  };
  quantity: {
    type: Number;
    required: true;
  };
}

interface Props {
  userSeedData: Array<any>;
}

const DisplayList = (props: Props) => {
  const userSeedDataArr = props.userSeedData;

  for (let i = 0; i < userSeedDataArr.length; i++) {
    delete userSeedDataArr[i]._id;
  }

  const keys = Object.keys(userSeedDataArr[0]);

  return (
    <div className="table content-center md:w-4/5 mx-auto relative overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {keys.map((key) => {
              return <th className="px-6 py-3">{key.replace("_", " ")}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {userSeedDataArr.map((seed: Seed) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{seed.common_name}</td>
                <td className="px-6 py-4">{seed.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayList;
