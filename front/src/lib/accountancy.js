import { fetchApi } from "./api.js";

export function getAllTypes() {
    return Promise.resolve({
        "9df3c179-15d3-4fc2-8d2e-5c01f7c71959": {
            name: "Test type",
            balance: 20.0,
            iconClass: "gg-c-plus-plus",
            color: "#53D8FB"
        },
        "e96a0d34-78c7-4b42-a5ec-7c197fe18e03": {
            name: "Tax",
            balance: 30.0,
            color: "#DCE1E9"
        },
        "ef77e64c-2b35-40df-8b2a-ca1cab62f2c1": {
            name: "Boup",
            balance: 40.0,
            color: "#D4AFB9"
        }
    });
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
                typeId: "e96a0d34-78c7-4b42-a5ec-7c197fe18e03"
            },
        ]
    });
}