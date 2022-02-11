import useDocumentTitle from '../../hooks/useDocumentTitle'

export const Yumul = () => {
  useDocumentTitle('Yumul')
  return (
    <div className="yumul">
      <section className="yumul-banner">
        <h1 className="yumul-banner-title">yumul bible study</h1>
      </section>
      <section className="yumul-intro">
        <div className="yumul-intro-picture"></div>
        <div className="yumul-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="yumul-intro-description-contact">
            Contact: Bro Roland Yumul{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </div>
      </section>
    </div>
  )
}