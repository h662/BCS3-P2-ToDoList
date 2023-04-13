import { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import TodoCard from "./components/TodoCard";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";

function App() {
  const [account, setAccount] = useState("");
  const [todos, setTodos] = useState("");

  const getTodos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );

      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setAccount("");
  };

  useEffect(() => {
    if (!account) return;

    getTodos();
  }, [account]);

  if (!account) {
    return <LogIn setAccount={setAccount} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold flex justify-center items-center">
        {account}님 환영합니다! 🚀
        <button
          className="ml-4 px-2 py-1 text-base border-2 border-pink-200 text-pink-200 rounded-lg hover:border-pink-400 hover:text-pink-400"
          onClick={onClickLogOut}
        >
          로그아웃
        </button>
      </h1>
      <div>
        <div className="mt-8 text-sm font-semibold">
          If I only had an hour to chop down a tree, I would spend the first 45
          minutes sharpening my axe, Abrabam Lincoln
        </div>
        <div className="text-xs">
          나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다,
          에비브러햄 링컨
        </div>
        <CreateTodo account={account} getTodos={getTodos} />
      </div>
      <div className="mt-16 flex flex-col w-1/2">
        {todos &&
          todos.map((v, i) => {
            return <TodoCard key={i} todo={v.todo} isDone={v.isDone} />;
          })}
      </div>
    </div>
  );
}

export default App;
