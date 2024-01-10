import { valideteAccessToken } from "app/utils/auth/validateAccessToken";

export const dynamic = 'force-dynamic'

export default async function MyAccountPage() {
  
  const customer = await valideteAccessToken();
  
  return (
    <div>
      <section>
        <h2>Your info</h2>
        <h1>Bienvenido {customer?.firstName}</h1>
        <p>email: {customer?.email}</p>
      </section>
    </div>
  );
}