import React, { useEffect, useState } from "react";
import Car from "../Car/Car";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./home.css";
const Home = () => {
  let [cars, setCars] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true)
    const response = await fetch("api/cars.json");
    const data = await response.json();
    setCars(data)
    setLoading(false)
  };
  useEffect(() => {
    getData();
  }, []);
 
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  if(value.length > 0) {
    cars = cars.filter((item) => {
      return item.bodyType.toLowerCase().match(value);
    });
  }
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, 
    },
  };
  return (
    <>
    <div>
    <div className='search'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" value={value} onChange={(e)=>handleChange(e)} placeholder="Search ....."/>
    </div>
    </div>
    {loading ? <h2>Loading ....</h2> :(
    <>
    {!cars.length>0 ? <h2>Data Not Found....</h2> : (
    <Carousel
      arrows={false}
      containerClass="container-padding-bottom"
      responsive={responsive}
      customButtonGroup={<CustomButtonGroup cars={cars} />}
    >
      {cars.map((car) => {
        return <Car key={car.id} car={car} />;
      })}
    </Carousel>
     )}
     </>
     )}
    </>
  );
};
const CustomButtonGroup = ({
  next,
  previous,
  goToSlide,
  carouselState,
  ...rest
}) => {
  const {currentSlide, slidesToShow } = carouselState;
  const { cars } = rest;
  const next1 = () => {
    if (currentSlide > cars.length - slidesToShow - 1) {
      return;
    }
    goToSlide(currentSlide + 1);
  };

  const previous1 = () => {
    if (currentSlide < 1) {
      return;
    }
    goToSlide(currentSlide - 1);
  };
  return (
    <div className="custom-button-group">
      <button className="btn swipe" onClick={() => previous1()}>
        &lt;
      </button>
      <button className="btn swipe" onClick={() => next1()}>
        &gt;
      </button>
    </div>
  );
};

export default Home;

