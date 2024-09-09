export const sendToAi = async (inputValue, setResponseText, setShowOptions) => {
    setShowOptions(false);
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const body = JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: inputValue,
                    },
                ],
            },
        ],
    });
    const saveMessagesToLocalStorage = (messages) => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

        if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0]
        ) {
            const responseText =
                data.candidates[0].content.parts[0].text ||
                "No response text available.";
            messages = [
                ...messages,
                { sender: "user", text: inputValue },
                { sender: "bot", text: responseText },
            ];

            saveMessagesToLocalStorage(messages);

            setResponseText(messages);
        } else {
            throw new Error("Unexpected response structure");
        }
    } catch (error) {
        console.error("Error communicating with AI:", error);

        let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

        messages = [
            ...messages,
            { sender: "user", text: inputValue },
            {
                sender: "bot",
                text: "An error occurred while communicating with the AI.",
            },
        ];

        saveMessagesToLocalStorage(messages);

        setResponseText(messages);
    }
};

export const loadMessagesFromLocalStorage = (setResponseText) => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setResponseText(savedMessages);
};





// // open ai
// export const sendToAi = async (inputValue, setResponseText, setShowOptions) => {
//     setShowOptions(false);
//     const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//     const API_URL = `https://api.openai.com/v1/chat/completions`;

//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "user", content: inputValue }
//             ]
//         }),
//     }


//     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//         console.log(data);

//     }).catch((error) => {
//         console.log(error)
//     })
// };
