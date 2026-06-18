import { CarrosselLogos } from "@/components/carrossel-logos";
import { FaleComAGente } from "@/components/fale-com-a-gente";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { NavegandoNaPlataforma } from "@/components/navegando-na-plataforma";
// import { NukiLab } from "@/components/nuki-lab";
import { RecursoControleAnalise } from "@/components/recurso-controle-analise";
import { RecursoPersonalizacao } from "@/components/recurso-personalizacao";
import { SobreANuki } from "@/components/sobre-a-nuki";
import { SobrePlataforma } from "@/components/sobre-plataforma";
import { SuaIdentidade } from "@/components/sua-identidade";
import { Topbar } from "@/components/topbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SobrePlataforma />
        <CarrosselLogos />
        <NavegandoNaPlataforma />
        <RecursoPersonalizacao />
        <RecursoControleAnalise />
        <SuaIdentidade />
        {/* <NukiLab /> */}
        <SobreANuki />
        <FaleComAGente />
        <Footer />
      </main>
    </>
  );
}
