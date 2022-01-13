import axios from 'axios'

export const appAxios = axios.create({
    baseURL:'http://localhost:3000'
}) // ! for activating it type in terminal "json-server --watch db.json"