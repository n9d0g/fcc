import useDocumentTitle from '../../hooks/useDocumentTitle'

export const YA = () => {
  useDocumentTitle('YA')
  return (
    <div className="ya">
      <section className="ya-banner">
        <h1 className="ya-banner-title">young adults</h1>
      </section>
      <section className="ya-intro">
        <div className="ya-intro-picture"></div>
        <div className="ya-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="ya-intro-description-contact">
            Contact: Bro Ian Irong{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </div>
      </section>
    </div>
  )
}