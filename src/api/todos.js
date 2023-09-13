import axios from "axios";
import { Cookies } from "react-cookie";
// todos 조회
const getTodos = async () => {
  const cookies = new Cookies();

  const accessToken = cookies.get("accessToken");
  console.log("accessToken:", accessToken);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/Todos`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("오류가 발생했습니다.", error);
  }
};

export { getTodos };
