import { getAllTypes, getAccount } from "../../../lib/accountancy.js";

export const load = async () => {
    return {
        types: await getAllTypes(),
        account: await getAccount("id")
    };
};
