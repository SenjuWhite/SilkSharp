import axios from 'axios';
const api_url = 'https://netquestionsapi.azurewebsites.net/api'
export const getQuestions = async () => {
    try{
    const response = await axios.get(`${api_url}/Question/get_all`)
    return response;
} catch (error) {
    console.error("Error fetching data:", error);
    throw error;
}

};
export const getQuestionLinks = async (id) => {
    try{
    const response = await axios.get(`${api_url}/Question/get_questionlinks?id=${id}`)
    return response;
} catch (error) {
    console.error("Error fetching data:", error);
    throw error;
}

};
export const getQuestion = async (id) => {
    try{
    const response = await axios.get(`${api_url}/Question/get_question?id=${id}`)
    return response;
} catch (error) {
    console.error("Error fetching questionInfo:", error);
    throw error;
}

};
export const getTimecodes = async (id) => {
    try{
    const response = await axios.get(`${api_url}/Question/get_timecodes?id=${id}`)
    return response;
} catch (error) {
    console.error("Error fetching data:", error);
    throw error;
}
};
export const getInterviews = async () => {
    try{
    const response = await axios.get(`${api_url}/Question/get_interviews`)
    return response;
} catch (error) {
    console.error("Error fetching data:", error);
    throw error;
}
};