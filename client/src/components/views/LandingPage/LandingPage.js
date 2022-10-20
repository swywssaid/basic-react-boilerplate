import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  // get방식으로 /api/hello 로 req 날림,
  // 서버에서 돌아오는 response 콘솔에 찍음.
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      시작 페이지
    </div>
  );
}

export default LandingPage;
