import { useAccessToken, useUserInfo } from "@/app/stores/global";
import { fetcher } from "@/lib/fetcher";
import { elapsedTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface Comment {
  Content: string;
  CreatedAt: string;
  ID: number;
  UserID: number;
  Name: string;
  Replies?: Comment[];
}

type AttendanceModalProps = {
  isModalOpen?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  attendList?: string[];
  day: number;
  formattedDate: string;
  time: string;
};

export default function AttendanceModal(props: AttendanceModalProps) {
  const { userID } = useUserInfo(); // zustand
  const [commentContent, setCommentContent] = useState("");
  const [commentEdit, setCommentEdit] = useState(false);
  const [sortedComments, setSortedComments] = useState<Comment[]>([]);
  const { accessToken } = useAccessToken();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${props.formattedDate}${props.time}`,
    fetcher
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );
      setSortedComments(sorted);
    }
  }, [data]);

  function closeModal() {
    props.setIsModalOpen(false);
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  const handleSubmitComment = async () => {
    const payload = {
      content: commentContent,
      parentID: 0,
      timeBlockID: `${props.formattedDate}${props.time}`,
      userID: Number(userID),
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      setCommentContent("");

      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${props.formattedDate}${props.time}`
      );

      return data;
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDeleteComment = async (commentID: Number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok!!!!");
      }
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${props.formattedDate}${props.time}`
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const splitList = (list) => {
    const firstColumn = list.slice(0, 10);
    const secondColumn = list.slice(10);
    return [firstColumn, secondColumn];
  };

  const [firstColumn, secondColumn] = splitList(props.attendList || []);

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
          className="w-[800px] h-[800px] bg-[#FFFFFF] rounded-lg shadow-lg overflow-y-auto z-20 flex flex-col"
          onClick={handleModalClick}
        >
          {/* 모달 헤더 */}
          <div className="px-6 py-4 border-b border-gray-200 relative flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {props.day}일 참가자 명단
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              닫기
            </button>
          </div>

          {/* 모달 바디 */}
          <div className="flex w-full h-[436px] p-[24px] ">
            <div className="flex w-[273px] border-r-[1px] border-gray-900 ">
              <ul className="list-none flex-1">
                {firstColumn.map((participant, index) => (
                  <li
                    key={index}
                    className="py-2 flex items-center text-gray-900"
                  >
                    <span>{index + 1}. </span>
                    <span className="pl-1">{participant}</span>
                  </li>
                ))}
              </ul>
              <ul className="list-none flex-1">
                {secondColumn.map((participant, index) => (
                  <li
                    key={index}
                    className="py-2 flex items-center text-gray-900"
                  >
                    <span>{index + 11}.</span>
                    <span className="pl-1">{participant}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[calc(100%-273px)] flex justify-center items-center">
              크롤링
            </div>
          </div>

          {/* 댓글 */}
          <div className="text-gray-900 px-6">
            <div className="py-[6px] px-[10px] border border-[#999797] text-[11px] rounded-[12px] mb-[20px]">
              댓글
              <span className="text-[19px]">
                {data?.length ? data?.length : "0"}
              </span>{" "}
              개
            </div>

            {/* 댓글 작성 필드 */}
            <div className="w-full py-4 border-t border-gray-200 flex">
              <div className=" flex flex-col gap-[5px] w-full pt-[12px] px-[16px] pb-[12px] border border-[#999797] text-[15px] rounded-[12px] bg-[#f9f9f9]">
                {accessToken ? (
                  <>
                    <div className="text-[15px]">댓글쓰기</div>
                    <div className="flex">
                      <textarea
                        className="w-[600px] h-[85px] flex-1 border rounded px-4 py-2 border border-[#999797] resize-none"
                        placeholder="댓글을 입력하세요..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                      <button
                        onClick={handleSubmitComment}
                        type="button"
                        className="ml-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                      >
                        등록
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-[30px]">
                    댓글 작성 하시려면 로그인을 해주세요.
                  </div>
                )}
              </div>
            </div>

            <div className=" flex flex-col overflow-y-auto">
              {sortedComments?.map((comment, index) => (
                <div
                  className={`mb-[10px] pt-[2px] pb-2 px-2 ${
                    index !== data.length - 1
                      ? "border-b-[1px] border-gray-400"
                      : ""
                  }`}
                  key={comment.ID}
                >
                  <div className="flex justify-between pb-[12px]">
                    <div className="w-[130px] flex items-end gap-x-[6px]">
                      <div className="text-[#444444] font-black">
                        {comment.Name}
                      </div>
                      <div className="text-[#888888] text-[12px]">
                        {elapsedTime(comment.CreatedAt)}
                      </div>
                    </div>
                    <div className="flex text-[14px] gap-[8px]">
                      {comment.UserID === Number(userID) ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setCommentEdit(true)}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(comment.ID)}
                          >
                            삭제
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="">{comment.Content}</div>

                  {comment.Replies && (
                    <div className="ml-4 mt-2">
                      {comment.Replies.map((reply, idx) => (
                        <div key={idx} className="flex">
                          <span className="rotate-180 pt-[5px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="#cccccc"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                            </svg>
                          </span>
                          <div className="p-1">
                            {reply.Name}: {reply.Content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
