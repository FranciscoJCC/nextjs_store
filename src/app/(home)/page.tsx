import { MainProducts } from "app/components/home/MainProducts"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "✨ Future World",
  description: "Welcomen to the future world, an ecommerce from other currency",
  keywords: ["ecommerce", "future", "world"]
}

export default function Home() {
  return (
    <main>
      
      <MainProducts />
    </main>
  )
}
