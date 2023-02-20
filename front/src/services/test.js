import { fetchApi } from "./api.js";

export function getTestData() {
    return fetchApi('/test/get').then((response => {
        return response.decodedBody;
    }));
}