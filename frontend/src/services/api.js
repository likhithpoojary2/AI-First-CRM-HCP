import axios from "axios"

const API = axios.create({
    baseURL: "https://ai-first-crm-hcp-iq0y.onrender.com"
})

export default API