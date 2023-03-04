import { getAllTypes, getAccount } from "@lib/api/accountancy.js";

export const load = async () => {
    return {
        types: await getAllTypes(),
        account: await getAccount("id")
    };
};
