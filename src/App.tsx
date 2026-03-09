import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchList = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://13.209.114.196:8080/api/members");

      if (!response.ok) {
        throw new Error("서버 호출 실패");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>회원 목록 조회</h1>

      <button onClick={fetchList}>리스트 호출</button>

      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>에러: {error}</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id} / {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;