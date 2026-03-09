import { useState } from "react";

type Member = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [members, setMembers] = useState([]);

  const loadMembers = async () => {
    try {
      const res = await fetch("http://13.209.114.196:8080/api/members");

      if (!res.ok) {
        throw new Error("API 오류: " + res.status);
      }

      const data = await res.json();
      setMembers(data);

    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  return (
    <div>
      <h2>회원 목록</h2>

      <button onClick={loadMembers}>
        리스트 불러오기
      </button>

      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} ({m.email})
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;