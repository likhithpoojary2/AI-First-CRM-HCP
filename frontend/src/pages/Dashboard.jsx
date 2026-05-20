import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import API from "../services/api"
import { setInteractionData } from "../redux/interactionSlice"

const Dashboard = () => {

    const dispatch = useDispatch()

    const reduxData = useSelector((state) => state.interaction)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        hcp_name: "",
        interaction_type: "Meeting",
        interaction_date: "",
        interaction_time: "",
        attendees: [],
        topics_discussed: [],
        materials_shared: [],
        samples_distributed: [],
        sentiment: "Neutral",
        outcomes: "",
        follow_up_actions: []
    })

    // AUTO POPULATE FROM AI

    useEffect(() => {

        if (reduxData) {

            setFormData((prev) => ({
                ...prev,
                ...reduxData
            }))
        }

    }, [reduxData])

    // HANDLE FORM CHANGES

    const handleChange = (field, value) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    // SEND AI MESSAGE

    const sendMessage = async () => {

        if (!message.trim()) return

        const userMessage = {
            sender: "user",
            text: message
        }

        setMessages((prev) => [...prev, userMessage])

        setLoading(true)

        try {

            const response = await API.post("/chat", {
                message
            })

           // AUTO UPDATE FORM FROM AI RESPONSE

const aiResponse = response.data.response

// MAIN AI AUTOFILL

if (aiResponse.data) {

    dispatch(
        setInteractionData(aiResponse.data)
    )

    setFormData((prev) => ({
        ...prev,
        ...aiResponse.data
    }))
}

// SENTIMENT UPDATE

if (aiResponse.updated_sentiment) {

    setFormData((prev) => ({
        ...prev,
        sentiment: aiResponse.updated_sentiment
    }))
}

// NAME UPDATE

if (aiResponse.updated_hcp_name) {

    setFormData((prev) => ({
        ...prev,
        hcp_name: aiResponse.updated_hcp_name
    }))
}

// INTERACTION TYPE UPDATE

if (aiResponse.updated_interaction_type) {

    setFormData((prev) => ({
        ...prev,
        interaction_type: aiResponse.updated_interaction_type
    }))
}

// HANDLE SENTIMENT UPDATE

if (response.data.response.updated_sentiment) {

    setFormData((prev) => ({
        ...prev,
        sentiment: response.data.response.updated_sentiment
    }))
}

// HANDLE NAME UPDATE

if (response.data.response.updated_hcp_name) {

    setFormData((prev) => ({
        ...prev,
        hcp_name: response.data.response.updated_hcp_name
    }))
}

            const aiMessage = {
                sender: "ai",
                data: response.data.response
            }

            setMessages((prev) => [...prev, aiMessage])

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    data: {
                        message: "Error communicating with backend"
                    }
                }
            ])
        }

        setLoading(false)
        setMessage("")
    }

    return (

        <div className="min-h-screen bg-[#f5f6f8] font-[Inter]">

            {/* PAGE CONTAINER */}

            <div className="w-full h-screen p-5">

                <div className="grid grid-cols-12 gap-5">

                    {/* LEFT PANEL */}

                    <div className="col-span-12 lg:col-span-8">

                        <div className="bg-white border border-gray-200 rounded-md p-5">

                            {/* TITLE */}

                            <h1 className="text-[28px] font-semibold text-black mb-6">
                                Log HCP Interaction
                            </h1>

                            {/* INTERACTION DETAILS */}

                            <div className="mb-4">

                                <h2 className="text-[15px] font-semibold text-black mb-4">
                                    Interaction Details
                                </h2>

                                {/* HCP + TYPE */}

                                <div className="grid grid-cols-2 gap-4 mb-4">

                                    <div>

                                        <label className="block text-[13px] text-black mb-1">
                                            HCP Name
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.hcp_name || ""}
                                            onChange={(e) =>
                                                handleChange("hcp_name", e.target.value)
                                            }
                                            placeholder="Search or select HCP..."
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-[13px] text-black mb-1">
                                            Interaction Type
                                        </label>

                                        <select
                                            value={formData.interaction_type || "Meeting"}
                                            onChange={(e) =>
                                                handleChange("interaction_type", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] bg-white outline-none"
                                        >
                                            <option>Meeting</option>
                                            <option>Online</option>
                                            <option>Email</option>
                                        </select>

                                    </div>

                                </div>

                                {/* DATE + TIME */}

                                <div className="grid grid-cols-2 gap-4 mb-4">

                                    <div>

                                        <label className="block text-[13px] text-black mb-1">
                                            Date
                                        </label>

                                        <input
                                            type="date"
                                            value={formData.interaction_date || ""}
                                            onChange={(e) =>
                                                handleChange("interaction_date", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-[13px] text-black mb-1">
                                            Time
                                        </label>

                                        <input
                                            type="time"
                                            value={formData.interaction_time || ""}
                                            onChange={(e) =>
                                                handleChange("interaction_time", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none"
                                        />

                                    </div>

                                </div>

                                {/* ATTENDEES */}

                                <div className="mb-4">

                                    <label className="block text-[13px] text-black mb-1">
                                        Attendees
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.attendees?.join(", ") || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "attendees",
                                                e.target.value.split(",")
                                            )
                                        }
                                        placeholder="Enter names or search..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none"
                                    />

                                </div>

                                {/* TOPICS */}

                                <div className="mb-4">

                                    <label className="block text-[13px] text-black mb-1">
                                        Topics Discussed
                                    </label>

                                    <textarea
                                        rows="4"
                                        value={formData.topics_discussed?.join(", ") || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "topics_discussed",
                                                e.target.value.split(",")
                                            )
                                        }
                                        placeholder="Enter key discussion points..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] resize-none outline-none"
                                    />

                                </div>

                                {/* MATERIALS */}

                                <div className="border border-gray-200 rounded p-4 mb-4">

                                    <h3 className="text-[13px] font-semibold text-black mb-3">
                                        Materials Shared / Samples Distributed
                                    </h3>

                                    {/* MATERIALS */}

                                    <div className="mb-4">

                                        <div className="flex justify-between items-center mb-2">

                                            <label className="text-[13px] text-black">
                                                Materials Shared
                                            </label>

                                            <button
                                                className="border border-gray-300 px-3 py-1 rounded text-[12px]"
                                            >
                                                Search/Add
                                            </button>

                                        </div>

                                        <textarea
                                            rows="2"
                                            value={formData.materials_shared?.join(", ") || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    "materials_shared",
                                                    e.target.value.split(",")
                                                )
                                            }
                                            placeholder="No materials added."
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] resize-none outline-none"
                                        />

                                    </div>

                                    {/* SAMPLES */}

                                    <div>

                                        <div className="flex justify-between items-center mb-2">

                                            <label className="text-[13px] text-black">
                                                Samples Distributed
                                            </label>

                                            <button
                                                className="border border-gray-300 px-3 py-1 rounded text-[12px]"
                                            >
                                                Add Sample
                                            </button>

                                        </div>

                                        <textarea
                                            rows="2"
                                            value={formData.samples_distributed?.join(", ") || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    "samples_distributed",
                                                    e.target.value.split(",")
                                                )
                                            }
                                            placeholder="No samples added."
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] resize-none outline-none"
                                        />

                                    </div>

                                </div>

                                {/* SENTIMENT */}

                                <div className="mb-4">

                                    <label className="block text-[13px] text-black mb-2">
                                        Observed/Inferred HCP Sentiment
                                    </label>

                                    <div className="flex gap-6">

                                        {["Positive", "Neutral", "Negative"].map((item) => (

                                            <label
                                                key={item}
                                                className="flex items-center gap-2 text-[13px]"
                                            >

                                                <input
                                                    type="radio"
                                                    name="sentiment"
                                                    checked={formData.sentiment === item}
                                                    onChange={() =>
                                                        handleChange("sentiment", item)
                                                    }
                                                />

                                                {item}

                                            </label>
                                        ))}

                                    </div>

                                </div>

                                {/* OUTCOMES */}

                                <div className="mb-4">

                                    <label className="block text-[13px] text-black mb-1">
                                        Outcomes
                                    </label>

                                    <textarea
                                        rows="3"
                                        value={formData.outcomes || ""}
                                        onChange={(e) =>
                                            handleChange("outcomes", e.target.value)
                                        }
                                        placeholder="Key outcomes or agreements..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] resize-none outline-none"
                                    />

                                </div>

                                {/* FOLLOW UP */}

                                <div className="mb-4">

                                    <label className="block text-[13px] text-black mb-1">
                                        Follow-up Actions
                                    </label>

                                    <textarea
                                        rows="3"
                                        value={formData.follow_up_actions?.join(", ") || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "follow_up_actions",
                                                e.target.value.split(",")
                                            )
                                        }
                                        placeholder="Enter next steps or tasks..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] resize-none outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="col-span-12 lg:col-span-4">

                        <div className="bg-white border border-gray-200 rounded-md h-[calc(100vh-40px)] flex flex-col">

                            {/* HEADER */}

                            <div className="border-b border-gray-200 px-4 py-3">

                                <h2 className="text-[18px] font-semibold text-[#2563eb]">
                                    AI Assistant
                                </h2>

                                <p className="text-[12px] text-gray-500">
                                    Log interaction via chat
                                </p>

                            </div>

                            {/* CHAT */}

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                                {/* DEFAULT MESSAGE */}

                                {messages.length === 0 && (

                                    <div className="bg-[#eef8ff] border border-[#d7ecff] rounded p-3 text-[13px] leading-relaxed text-black">

                                        Log interaction details here
                                        (e.g., "Met Dr. Smith, discussed Product X efficacy,
                                        positive sentiment, shared brochure")

                                    </div>
                                )}

                                {/* CHAT ITEMS */}

                                {messages.map((msg, index) => (

                                    <div key={index}>

                                        {/* USER */}

                                        {msg.sender === "user" && (

                                            <div className="bg-gray-100 rounded p-3 text-[13px] text-black mb-2 whitespace-pre-wrap">
                                                {msg.text}
                                            </div>
                                        )}

                                        {/* AI */}

                                        {msg.sender === "ai" && (

                                            <div className="bg-[#e9f8e9] border border-[#b7e5b7] rounded p-3 text-[13px] text-black whitespace-pre-wrap">

                                                {msg.data.message}

                                                {/* HISTORY */}

                                                {msg.data.history && (

                                                    <div className="mt-3 space-y-2">

                                                        {msg.data.history.map((item, i) => (

                                                            <div
                                                                key={i}
                                                                className="border border-gray-200 bg-white rounded p-2"
                                                            >

                                                                <div className="font-semibold">
                                                                    {item.hcp_name}
                                                                </div>

                                                                <div className="mt-1 text-[12px]">
                                                                    Topics:
                                                                    {" "}
                                                                    {Array.isArray(item.topics_discussed)
                                                                        ? item.topics_discussed.join(", ")
                                                                        : item.topics_discussed}
                                                                </div>

                                                                <div className="mt-1 text-[12px]">
                                                                    Sentiment:
                                                                    {" "}
                                                                    {item.sentiment}
                                                                </div>

                                                            </div>
                                                        ))}

                                                    </div>
                                                )}

                                                {/* RECOMMENDATION */}

                                                {msg.data.recommendation && (

                                                    <div className="mt-3">
                                                        {msg.data.recommendation}
                                                    </div>
                                                )}

                                                {/* COMPLIANCE */}

                                                {msg.data.analysis && (

                                                    <div className="mt-3">
                                                        {msg.data.analysis}
                                                    </div>
                                                )}

                                            </div>
                                        )}

                                    </div>
                                ))}

                                {/* LOADING */}

                                {loading && (

                                    <div className="bg-gray-100 rounded p-3 text-[13px]">
                                        AI analyzing interaction...
                                    </div>
                                )}

                            </div>

                            {/* INPUT */}

                            <div className="border-t border-gray-200 p-3 flex gap-2">

                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Describe interaction..."
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-[13px] outline-none"
                                />

                                <button
                                    onClick={sendMessage}
                                    className="bg-gray-700 hover:bg-black text-white px-5 rounded text-[13px]"
                                >
                                    Log
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard