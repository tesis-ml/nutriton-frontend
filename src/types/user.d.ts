type Role = "admin" | "user";

type User = {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "role": Role,
    "_count": {
        "foodsEdited": number,
        "imagesCreated": number,
        "dishesEdited": number
    }
}