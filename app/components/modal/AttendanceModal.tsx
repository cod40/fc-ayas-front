import { useUserInfo } from "@/app/stores/global";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type AttendanceModalProps = {
  isModalOpen?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  attendList?: string[];
  day: number;
};

export default function AttendanceModal(props: AttendanceModalProps) {
  // console.log(props);
  const { userID } = useUserInfo(); // zustand

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/comment/${props.formattedDate}${props.time}`,
    fetcher
  );
  console.log(data);
  function closeModal() {
    props.setIsModalOpen(false);
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  //   const postComment = async (payload) => {
  //     const commentPayload = {
  //       content: "string (ex. 저는 10시부터 가능해요)",
  //       timeBlockID: timeBlockID,
  //       userID
  //   };

  //     try {
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(payload)
  //         });
  //         const data = await response.json();
  //         return data;
  //     } catch (error) {
  //         console.error("Error posting comment:", error);
  //     }
  // }

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
        >
          {/* 모달 헤더 */}
          <div className="px-6 py-4 border-b border-gray-200">
            {props.day}일
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              참가자 명단
            </h3>
          </div>

          {/* 모달 바디 */}
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {props.attendList?.map((participant, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-900">
                      {participant}
                    </div>
                    {/* 참가자별 추가 정보가 있다면 여기에 표시 */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div></div>

          {/* 모달 푸터 */}
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              onClick={closeModal}
              type="button"
              className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
