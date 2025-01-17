import { useAccessToken, useUserInfo } from "@/app/stores/global";
import { login } from "@/lib/api/login";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login({ onClose }: { onClose: () => void }) {
  // const setAccessToken = useSetRecoilState(accessTokenState);
  // const setUserInfo = useSetRecoilState(userInfoState);
  const setAccessToken = useAccessToken((state) => state.setAccessToken);
  const setUserInfo = useUserInfo((state) => state.setUserInfo);
  const setUserID = useUserInfo((state) => state.setUserID);

  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(formData);

      sessionStorage.setItem("UserID", result?.UserID);

      const userInfo = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${result?.UserID}`
      ); // userInfo 정보
      setUserInfo(userInfo?.data);
      setUserID(userInfo?.data.ID);

      if (result.token) {
        setAccessToken(result.token);
        onClose();
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setError(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-6">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2 mb-4">
            <button type="button" className="text-blue-500 hover:underline">
              아이디 찾기
            </button>
            <button type="button" className="text-blue-500 hover:underline">
              비밀번호 찾기
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 bg-white px-4 py-2 rounded mr-2"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              로그인
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
