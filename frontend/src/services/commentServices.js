import api from "./api";


export const getComments =
    async (taskId) => {

        const response =
            await api.get(
                `/tasks/${taskId}/comments`
            );

        return response.data;

    };


export const createComment =
    async (taskId, data) => {

        const response =
            await api.post(
                `/tasks/${taskId}/comments`,
                data
            );

        return response.data;

    };


export const deleteComment =
    async (taskId, commentId) => {

        const response =
            await api.delete(
                `/tasks/${taskId}/comments/${commentId}`
            );

        return response.data;

    };