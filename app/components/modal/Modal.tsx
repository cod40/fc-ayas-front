import React from "react";

export default function Modal(props) {
  function closeModal() {
    props.setIsModalOpen(false);
  }
  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <>
      <div
        className="inset-0 w-[100%] h-[100%] fixed bg-[#000000] opacity-40"
        onClick={closeModal}
      ></div>
      <div
        className="inset-0 fixed flex justify-center items-center"
        onClick={closeModal}
      >
        <div
          className="w-[800px] h-[600px] bg-[#FFFFFF] rounded-lg shadow-lg overflow-hidden z-20 "
          onClick={handleModalClick}
        ></div>

        <button
          type="button"
          className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={closeModal()}
        >
          닫기
        </button>
      </div>
    </>
  );
}
