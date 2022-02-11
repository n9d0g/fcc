import useDocumentTitle from '../../hooks/useDocumentTitle'

export const Allan = () => {
  useDocumentTitle('Allan BS')
  return (
    <div className="allan">
      <section className="allan-banner">
        <h1 className="allan-banner-title">bro. allan's bible study</h1>
      </section>
      <section className="allan-intro">
        <div className="allan-intro-picture"></div>
        <div className="allan-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="allan-intro-description-contact">
            Contact: Bro Allan Macasaquit{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </div>
      </section>
    </div>
  )
}