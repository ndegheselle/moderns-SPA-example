
export const load = async ({ fetch, params }) => {
    const res = await fetch(`/api/test`);
    const data = await res.json();

    console.log("Loaded", data);
    return data;
};