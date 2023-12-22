export default function Layout({ children }: { children: React.ReactNode}){
    return (
        <main>
            <nav>Navegación de las categorias</nav>
            { children }
        </main>
    )
}