export function Footer() {
  return (
    <footer className="w-full bg-nuki-cinza-claro shadow-[0_10px_20.7px_0_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex h-[228px] max-w-[1440px] items-center justify-between px-[108px]">
        <a href="/" aria-label="Nuki" className="shrink-0">
          <img
            src="/footer/nuki-logo-horizontal-preto.png"
            alt="Nuki"
            width={122}
            height={60}
            className="h-[60px] w-[122px] object-contain"
          />
        </a>

        <div className="flex w-[912px] items-start justify-between">
          <div className="flex items-start gap-[152px]">
            <nav aria-label="Recursos" className="flex flex-col gap-1.5">
              <p className="text-[12px] font-extrabold leading-6 tracking-[0.15px] text-nuki-preto">
                Recursos
              </p>
              <ul className="flex flex-col gap-1.5 text-[12px] font-normal leading-5 tracking-[0.25px] text-nuki-cinza">
                <li>
                  <a href="#" className="transition-colors hover:text-nuki-preto">
                    Personalização
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-nuki-preto">
                    Controle e análise
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Institucional" className="flex flex-col gap-3">
              <a
                href="#"
                className="text-[12px] font-extrabold leading-6 tracking-[0.15px] text-nuki-preto transition-colors hover:text-nuki-verde-02"
              >
                Sobre a Nuki
              </a>
              <a
                href="#"
                className="text-[12px] font-extrabold leading-5 tracking-[0.15px] text-nuki-preto transition-colors hover:text-nuki-verde-02"
              >
                Nuki Lab
              </a>
            </nav>

            <div className="flex items-center gap-[15.25px]">
              <a
                href="#"
                aria-label="Instagram"
                className="text-nuki-preto transition-colors hover:text-nuki-verde-02"
              >
                <InstagramIcon className="size-[22.875px]" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-nuki-preto transition-colors hover:text-nuki-verde-02"
              >
                <LinkedinIcon className="size-[22.875px]" />
              </a>
            </div>
          </div>

          <button
            type="button"
            className="rounded-full bg-nuki-preto px-6 py-[10px] text-[14px] font-bold text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Solicitar demo
          </button>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22.875 22.875"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.63453 20.9688H15.2405V20.9783C18.3953 20.9783 20.9688 18.4048 20.9688 15.25V7.63453C20.9688 4.47016 18.3953 1.90625 15.2405 1.90625H7.63453C4.47016 1.90625 1.90625 4.47016 1.90625 7.63453V15.2405C1.90625 18.4048 4.47969 20.9688 7.63453 20.9688ZM3.69813 7.63453C3.69813 5.46141 5.46141 3.69813 7.63453 3.69813H15.2405C17.4136 3.69813 19.1769 5.47094 19.1769 7.63453V15.25C19.1769 17.4231 17.4136 19.1864 15.2405 19.1864H7.63453C5.46141 19.1864 3.69813 17.4231 3.69813 15.25V7.63453ZM16.4796 5.30897C15.8601 5.30897 15.3645 5.8046 15.3645 6.42413C15.3645 7.04366 15.8696 7.53928 16.4796 7.53928C17.0896 7.53928 17.5948 7.04366 17.5948 6.42413C17.5948 5.8046 17.0896 5.30897 16.4796 5.30897ZM11.5137 6.73866C8.92116 6.73866 6.81475 8.84507 6.81475 11.4376C6.81475 14.0301 8.92116 16.1365 11.5137 16.1365C14.1062 16.1365 16.2126 14.0301 16.2126 11.4376C16.2126 8.84507 14.1062 6.73866 11.5137 6.73866ZM11.5137 14.4399C9.85522 14.4399 8.50178 13.0865 8.50178 11.428C8.50178 9.7696 9.85522 8.42569 11.5137 8.42569C13.1721 8.42569 14.516 9.77913 14.516 11.428C14.516 13.0769 13.1626 14.4399 11.5137 14.4399Z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22.875 22.875"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2.22078 8.235H6.18578V20.9688H2.22078V8.235ZM4.20328 1.90625C5.47094 1.90625 6.50031 2.93563 6.50031 4.20328C6.50031 5.47094 5.47094 6.50031 4.20328 6.50031C2.93563 6.50031 1.90625 5.47094 1.90625 4.20328C1.90625 2.93563 2.93563 1.90625 4.20328 1.90625ZM8.67344 20.9688H12.6289V14.6686C12.6289 13.0102 12.9434 11.3994 15.0022 11.3994C17.0609 11.3994 17.0609 13.2961 17.0609 14.7734V20.9688H21.0164V13.9823C21.0164 10.5511 20.273 7.92047 16.2698 7.92047C14.3445 7.92047 13.0483 8.97844 12.5241 9.97922H12.4764V8.235H8.68297V20.9688H8.67344Z" />
    </svg>
  );
}
