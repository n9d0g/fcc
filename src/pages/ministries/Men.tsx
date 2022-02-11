import useDocumentTitle from '../../hooks/useDocumentTitle'

export const Men = () => {
  useDocumentTitle('Men')
  return (
    <div className="men">
      <section className="men-banner">
        <h1 className="men-banner-title">MEN-istry</h1>
      </section>
      <section className="men-intro">
        <div className="men-intro-picture"></div>
        <div className="men-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="men-intro-description-contact">
            Contact: Bro Nathan Lardizabal{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </div>
      </section>
    </div>
  )
}