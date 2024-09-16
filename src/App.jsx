import { useEffect, useState } from "react";
import { sendToAi } from "./sendToAi";
import Starting from "./Starting";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [responseText, setResponseText] = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const [triggerSend, setTriggerSend] = useState(false);
  const [showStarting, setShowStarting] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (inputValue === "") {
      return null;
    } else {
      await sendToAi(inputValue, setResponseText, setShowOptions);
    }
    setInputValue("");
    setTriggerSend(false);
  };

  useEffect(() => {
    if (triggerSend) {
      handleSend();
    }
  }, [triggerSend, inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  

  useEffect(() => {
    let index = 1;
    const interval = 30;
    let typingInterval;

    const typeEffect = (fullText) => {
      setTypingText("");
      typingInterval = setInterval(() => {
        setTypingText((prev) => fullText.slice(0, index));
        index++;

        if (index > fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, interval);
    };

    if (
      responseText.length > 0 &&
      responseText[responseText.length - 1].sender === "bot"
    ) {
      setIsTyping(true);
      const botResponse = responseText[responseText.length - 1].text;
      typeEffect(botResponse);
    }

    return () => clearInterval(typingInterval);
  }, [responseText]);


  return (
    <>
      <div className="box-border flex justify-center items-center h-screen md:scale-125 md:ml-12 font-r">
        <div className="relative">
          <AnimatePresence>
            {showStarting && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Starting />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-80 bg-gray-50 rounded-xl shadow-lg p-3 border border-gray-300">
            <div className="flex items-center justify-between mb-4 border-b-2 border-blue-50 pb-4">
              <img src="/junior-logo.jpg" alt="Owl Icon" className="w-8 h-8" />
              <div className="flex items-center space-x-2 flex-grow justify-center">
                <h1 className="text-2xl font-bold text-blue-800">Junior</h1>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer text-blue-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {showOptions ? (
              <div className="bg-gray-100 p-2 rounded-xl">
                <div className="bg-blue-900 rounded-lg p-2 mb-4 w-auto">
                  <p className="text-white">
                    Merhaba, size nasıl yardımcı <br /> olabilirim?
                  </p>
                </div>

                <div className="space-y-2 ">
                  <button
                    onClick={() => {
                      setInputValue("Uçak Bileti Almak İstiyorum");
                      setTriggerSend(true);
                    }}
                    className="w-full flex items-center justify-start space-x-2 bg-blue-200 text-blue-800 rounded-lg p-2"
                  >
                    <img src="/plane-solid.svg" alt="" className="w-3 h-3" />
                    <span className="text-sm">Uçak Bileti Almak İstiyorum</span>
                  </button>

                  <button
                    onClick={() => {
                      setInputValue("Otobüs Bileti Almak İstiyorum");
                      setTriggerSend(true);
                    }}
                    className="w-full flex items-center justify-start space-x-2 bg-blue-200 text-blue-800 rounded-lg p-2"
                  >
                    <img src="/bus-solid.svg" alt="" className="w-3 h-3" />
                    <span className="text-sm">
                      Otobüs Bileti Almak İstiyorum
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setInputValue("Video Dublajı Yapabilir misin?");
                      setTriggerSend(true);
                    }}
                    className="w-full flex items-center justify-start space-x-2 bg-blue-200 text-blue-800 rounded-lg p-2"
                  >
                    <img src="/video-solid.svg" alt="" className="w-3 h-3" />
                    <span className="text-sm">
                      Video Dublajı Yapabilir misin?
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 bg-gray-100 p-4 rounded-xl h-64 overflow-y-scroll">
                <AnimatePresence>
                  {responseText.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-blue-200 text-blue-800 text-xs leading-5"
                            : "bg-blue-900 text-white text-xs leading-5"
                        }`}
                      >
                        {msg.sender === "bot" &&
                        index === responseText.length - 1 &&
                        isTyping
                          ? typingText
                          : msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="form relative">
              <button
                onClick={handleSend}
                className="send-btn bg-blue-900 p-3 text-white rounded-full absolute drop-shadow-2xl active:scale-105 transition-all duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className="size-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>

              <div className="mt-12 border-b-2 border-blue-50 text-blue-800">
                <input
                  onInput={() => {
                    setShowStarting(false);
                  }}
                  onKeyDown={handleKeyPress}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Bir mesaj gir..."
                  className="w-full rounded-lg p-3 outline-none bg-gray-50"
                />
              </div>
            </div>

            <div className="icons flex gap-4 pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-blue-800 font-bold cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="size-5 rotate-45 text-blue-800 cursor-pointer"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
