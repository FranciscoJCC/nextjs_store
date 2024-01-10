import { getCustomerOrders } from "app/services/shopify/graphql/customer";

type OrderType = {
    name: string;
    orderNumber: number;
    statusUrl: string
    lineItems: {
      edges: Array<{
        node: {
          currentQuantity: number;
          title: 2
        }
      }>
    }
  }

export default async function MyAccountPage() {
    const ordersInfo = await getCustomerOrders();

    return (
        <div>  
            <section>
                <h2>Orders</h2>
                {ordersInfo.orders?.map((order : OrderType) => (
                    <p key={order.orderNumber}>{order.orderNumber}</p>
                ))}
            </section>
        </div>
    )
}