interface Image {
    id: number
    name: string;
    src: string;
    createdById: number;
    createdBy: {
        firstName: string;
        lastName: string;
    };
}