import Button from '../../components/button/Button'

export const HomeJoin = () => {
  return (
    <section className="home-join">
      <div className="home-join-content">
        <h2 className="home-join-content-header">come join us!</h2>
        <p className="home-join-content-description">
          Due to current COVID-19 restrictions, our services will be online
          through ZOOM until further notice. Come visit us this Sunday at
          10:30am EST!
        </p>
        <Button external location="https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U" text="join now!" />
      </div>
      <div className="home-join-picture"></div>
    </section>
  )
}
