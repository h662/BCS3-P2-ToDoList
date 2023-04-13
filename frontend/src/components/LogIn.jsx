import axios from "axios";
import { useState } from "react";

const LogIn = ({ setAccount }) => {
  const [createAccount, setCreateAccount] = useState("");

  const onSubmitCreateAccount = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: createAccount,
        }
      );

      if (response.status !== 200) {
        alert("계정 생성에 실패하였습니다.");
        return;
      }

      setAccount(response.data.user.account);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form className="flex mt-2 my-16" onSubmit={onSubmitCreateAccount}>
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
          value={createAccount}
          onChange={(e) => setCreateAccount(e.target.value)}
        />
        <input
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 w-24"
          type="submit"
          value="계정 생성"
        />
      </form>
      <form className="flex mt-2 my-16">
        <input
          className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
          type="text"
        />
        <input
          className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 w-24"
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
};
export default LogIn;
