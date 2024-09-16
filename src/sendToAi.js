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
            let responseText =
                data.candidates[0].content.parts[0].text ||
                "No response text available.";

            responseText = responseText.replace(/\*\*/g, '').replace(/##/g, '');

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




