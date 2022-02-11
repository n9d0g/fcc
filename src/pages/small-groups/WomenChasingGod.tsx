import useDocumentTitle from '../../hooks/useDocumentTitle'

export const WomenChasingGod = () => {
  useDocumentTitle('Women Chasing God')
  return (
    <div className="women-chasing-">
      <section className="women-chasing-god-banner">
        <h1 className="women-chasing-god-banner-title">women chasing God</h1>
      </section>
      <section className="women-chasing-god-intro">
        <div className="women-chasing-god-intro-picture"></div>
        <div className="women-chasing-god-intro-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="women-chasing-god-intro-description-contact">
            Contact: Sis Joi Irong{' '}
            <a href="tel:647-523-9361">(???) ???-????</a>
          </p>
        </div>
      </section>
    </div>
  )
}