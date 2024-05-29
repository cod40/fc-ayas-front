import { signUp } from "@/lib/api/signUp";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import crypto from "crypto-js";
import { OnCloseType } from "@/app/stores/app";

export default function SignUpModal({ onClose }: OnCloseType) {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    phone: "",
    verificationCode: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [certification, setCertification] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneMessageColor, setPhoneMessageColor] = useState("text-gray-500");

  const VERIFICATION_TEXT = [
    "감자털",
    "앙기모띠",
    "최승규탈모",
    "김상도탈모",
    "해물볶음",
    "필립보",
    "찬우발닦개",
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleVerificationCodeSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const phonePattern = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!phonePattern.test(formData.phone)) {
      setPhoneMessage("번호를 확인해주세요");
      setPhoneMessageColor("text-red-500");
      return;
    }
    setPhoneMessage("인증번호가 발송됐습니다.");
    setPhoneMessageColor("text-green-500");
    const verificationCode =
      VERIFICATION_TEXT[Math.floor(Math.random() * VERIFICATION_TEXT.length)];
    const encryptionCode = crypto.AES.encrypt(
      verificationCode,
      "fc-ayas"
    ).toString();
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/signup/verify`,
        data: {
          PhoneNumber: formData.phone,
          Word: verificationCode,
        },
      });

      sessionStorage.setItem("encryptionCode", encryptionCode);
      setCertification(verificationCode);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호를 확인해주세요!");
      return;
    }

    const sessionEncryptionCode = sessionStorage.getItem("encryptionCode");

    const decryptedBytes = crypto.AES.decrypt(
      sessionEncryptionCode as string,
      "fc-ayas"
    );
    const decryptedMessage = decryptedBytes.toString(crypto.enc.Utf8);

    if (formData.verificationCode !== decryptedMessage) {
      alert("인증 단어를 확인해주세요!");
      return;
    }

    try {
      const result = await signUp(formData);
      setSuccessMessage("FC아얏스에 온 것을 환영합니다!");
      setTimeout(() => onClose(), 3000);
      sessionStorage.removeItem("encryptionCode");
    } catch (error: any) {
      console.error("SignUp error:", error.message);
      setError(error.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-6">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              minLength={4}
              maxLength={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">4자리를 입력해주세요.</p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              minLength={4}
              maxLength={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              휴대폰 번호
            </label>
            <div className="flex">
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
                placeholder="휴대폰 번호 (-제외)"
                className="mt-1 block w-3/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.phone}
                onChange={handleChange}
              />
              <button
                type="button"
                className="mt-1 ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleVerificationCodeSubmit}
              >
                인증번호 발송
              </button>
            </div>
            {phoneMessage && (
              <p className={`text-xs mt-1 ${phoneMessageColor}`}>
                {phoneMessage}
              </p>
            )}
            <input
              type="verificationCode"
              id="verificationCode"
              name="verificationCode"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.verificationCode}
              placeholder="인증 문자를 적어주세요"
              onChange={handleChange}
            />
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
              가입하기
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}
