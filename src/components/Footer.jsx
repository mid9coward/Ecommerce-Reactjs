const Footer = () => {
  return (
    <footer
      className="w-full bg-tertiary-500 py-12 absolute b-0 mt-auto"
      aria-labelledby="footer-heading"
    >
      <div className="section-center  flex items-center justify-center">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="text-tertiary-300 section-center">
          <div className="flex flex-wrap items-baseline lg:justify-center">
            <span className="mt-2 text-base font-semibold ">
              Copyright © {new Date().getFullYear()}
              <a
                href="https://www.linkedin.com/in/hieupcmusic/"
                className="mx-2 text-tertiary-100 hover:text-tertiary-300"
                rel="noopener noreferrer"
              >
                @HieuVu
              </a>
              . Since 1999
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
