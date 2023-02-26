import { fetchApi } from "./api.js";

export function getAllTypes() {
    return Promise.resolve([
        {
            id: "9df3c179-15d3-4fc2-8d2e-5c01f7c71959",
            name: "Test type"
        }
    ]);
}

export function getAccount(id) {
    return Promise.resolve({
        id: id,
        name: "test",
        description: "Description",
        balance: 52.0,

        transactions: [
            {
                name: "Some transaction",
                description: "The description with how",
                date: "14/05/2023 13h50",
                value: 100000.2,
                typeId: "9df3c179-15d3-4fc2-8d2e-5c01f7c71959"
            },
            {
                name: "Some transaction",
                description: "The description with how",
                date: "14/05/2023 13h50",
                value: -10.2,
                typeId: "9df3c179-15d3-4fc2-8d2e-5c01f7c71959"
            },
            {
                name: "Some transaction",
                description: "The description with how",
                date: "14/05/2023 13h50",
                value: 10.2,
                typeId: "9df3c179-15d3-4fc2-8d2e-5c01f7c71959"
            },
        ]
    });
}