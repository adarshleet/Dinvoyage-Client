import axios from "axios";

const Api = axios.create({baseURL:'https://dinevoyage.online',withCredentials:true});

export default Api;