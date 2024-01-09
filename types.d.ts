interface ErrorPageProps {
    error: Error;
    reset: () =>void
}

type ProductType = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    handle: string;
    tags: string;
    gql_id: string;
}

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    merchandiseId: string
}