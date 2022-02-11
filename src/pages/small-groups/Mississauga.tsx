import useDocumentTitle from '../../hooks/useDocumentTitle'

export const Mississauga = () => {
  useDocumentTitle('South Mississauga')
  return (
    <div className="mississauga">
      <section className="mississauga-banner">
        <h1 className="mississauga-banner-title">south mississauga</h1>
      </section>
      <section className="mississauga-intro">
        <div className="mississauga-intro-picture"></div>
        <div className="mississauga-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mississauga-intro-description-contact">
            Contact: Bro Bernard Bersamin{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </div>
      </section>
    </div>
  )
}