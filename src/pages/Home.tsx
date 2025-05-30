export default function Home() {
    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-[var(--color-text)] mb-8 text-center">
                        AvvanTI
                    </h2>
                    <p className="text-lg text-[var(--color-text-light)] mb-12">
                        Esta é uma página inicial simples e elegante, projetada para ser responsiva
                        e adaptável ao tema claro e escuro do seu sistema.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[var(--color-background-dark)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-primary)]/10">
                            <h3 className="text-xl font-semibold text-[var(--color-primary-light)] mb-4">
                                Recursos
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Explore os recursos incríveis que temos para oferecer.
                            </p>
                        </div>
                        <div className="bg-[var(--color-background-dark)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-secondary)]/10">
                            <h3 className="text-xl font-semibold text-[var(--color-primary-light)] mb-4">
                                Sobre
                            </h3>
                            <p className="text-[var(--color-text-light)]">
                                Conheça mais sobre nossa história e missão.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}