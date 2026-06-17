import { SolicitarDemoButton } from "@/components/demo-modal";

export function FaleComAGente() {
  return (
    <section className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-nuki-preto">
      <img
        src="/fale-com-a-gente/nuki_quadradinho_pearl 4.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-8 -bottom-32 w-[340px]"
      />
      <img
        src="/fale-com-a-gente/decoracao-quadradinho-pearl.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-12 w-[340px]"
      />

      <div className=" mx-auto flex max-w-360 flex-col items-center justify-center gap-10 px-27 py-15">
        <div className="flex w-[440px] flex-col items-center gap-8">
          <h2 className="w-full text-center text-[48px] font-extrabold leading-[54px] tracking-[0.1px] text-nuki-branco">
            Fale com a gente!
          </h2>

          <p className="w-full text-center text-[20px] font-normal leading-9 tracking-[0.1px] text-nuki-branco">
            Ficou interessado? Nos mande uma mensagem
            <br />
            por e-mail ou nos contate por telefone!
          </p>

          <div className="flex w-full items-center justify-between p-2.5">
            <a
              href="mailto:nuki@email.com"
              className="flex items-start gap-2 text-nuki-branco transition-opacity hover:opacity-80"
            >
              <EmailIcon className="size-5 shrink-0" />
              <span className="whitespace-nowrap text-[20px] font-extrabold leading-5 tracking-[0.1px]">
                nuki@email.com
              </span>
            </a>

            <span
              aria-hidden
              className="w-7 text-center text-[20px] font-normal leading-5 tracking-[0.1px] text-nuki-branco"
            >
              |
            </span>

            <a
              href="tel:0000000000"
              className="flex items-start gap-2 text-nuki-branco transition-opacity hover:opacity-80"
            >
              <PhoneIcon className="size-5 shrink-0" />
              <span className="whitespace-nowrap text-[20px] font-extrabold leading-5 tracking-[0.1px]">
                00 0000.0000
              </span>
            </a>
          </div>
        </div>

        <SolicitarDemoButton
          className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-preto"
        >
          Solicitar demo
        </SolicitarDemoButton>
      </div>
    </section>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 0.3125C4.64613 0.3125 0.3125 4.64527 0.3125 10C0.3125 15.3539 4.64527 19.6875 10 19.6875C11.881 19.6875 13.7243 19.1352 15.2894 18.1163C15.7583 17.811 15.8607 17.1675 15.5062 16.7346L15.1087 16.2489C14.8091 15.8829 14.2814 15.7932 13.8832 16.0486C12.7313 16.7874 11.3795 17.1875 10 17.1875C6.0368 17.1875 2.8125 13.9632 2.8125 10C2.8125 6.0368 6.0368 2.8125 10 2.8125C13.9117 2.8125 17.1875 5.06324 17.1875 9.0625C17.1875 10.5776 16.3636 12.1774 14.9152 12.3318C14.2375 12.314 14.2547 11.8295 14.3888 11.1589L15.3042 6.42809C15.4161 5.84961 14.973 5.3125 14.3838 5.3125H12.6267C12.497 5.3125 12.3718 5.36025 12.275 5.44666C12.1782 5.53306 12.1167 5.65207 12.102 5.78098L12.1016 5.78457C11.5275 5.08531 10.5216 4.93398 9.75902 4.93398C6.84574 4.93398 4.375 7.365 4.375 10.8504C4.375 13.4013 5.81191 14.9859 8.125 14.9859C9.17906 14.9859 10.366 14.3751 11.0543 13.4886C11.4263 14.8207 12.6408 14.8207 13.8164 14.8207C18.0707 14.8207 19.6875 12.0234 19.6875 9.0625C19.6875 3.73645 15.3915 0.3125 10 0.3125ZM9.15313 12.2043C8.28402 12.2043 7.74414 11.594 7.74414 10.6117C7.74414 8.85414 8.94645 7.7707 10.0344 7.7707C10.9052 7.7707 11.425 8.36605 11.425 9.36328C11.425 11.1235 10.1018 12.2043 9.15313 12.2043Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.2739 0.960743L15.2114 0.0232431C14.7699 -0.0783193 14.3168 0.152149 14.1371 0.566212L12.2621 4.94121C12.0981 5.32402 12.2074 5.77324 12.5317 6.03496L14.8989 7.97246C13.4926 10.9686 11.0356 13.4607 7.97698 14.8943L6.03947 12.5271C5.77385 12.2029 5.32854 12.0936 4.94572 12.2576L0.57072 14.1326C0.152751 14.3162 -0.0777182 14.7693 0.0238444 15.2107L0.961345 19.2732C1.059 19.6951 1.434 19.9998 1.87541 19.9998C11.8793 19.9998 20.0004 11.8943 20.0004 1.8748C20.0004 1.43731 19.6996 1.0584 19.2739 0.960743Z" />
    </svg>
  );
}
