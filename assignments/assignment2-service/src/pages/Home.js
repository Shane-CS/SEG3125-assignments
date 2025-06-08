import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StudioCard from '../components/StudioCard';
import TestimonialCard from '../components/TestimonialCard';
import { ROOMS, TESTIMONIALS } from '../config';

const Home = () => {
  // Convert rooms object to array for mapping
  const roomsArray = Object.values(ROOMS);
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Professional Recording Studio"
        subtitle="State-of-the-art equipment, experienced engineers, and a creative atmosphere for musicians, podcasters, and voice artists."
        buttonText="Book Now"
        buttonLink="/booking"
        height="80vh"
      />
      
      {/* Introduction Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="text-heading mb-4">Welcome to SoundWave Studios</h2>
              <p className="lead">Where creativity meets technical excellence.</p>
              <p>
                At SoundWave Studios, we provide a professional recording environment 
                with top-tier equipment and experienced engineers to help bring your 
                vision to life. Whether you're recording an album, producing a podcast, 
                or capturing voice-over work, our studios are designed to deliver 
                exceptional results.
              </p>
              <div className="mt-4">
                <Link to="/about-us" className="btn btn-primary me-3">
                  Learn More
                </Link>
                <Link to="/studios" className="btn btn-outline-secondary">
                  Explore Studios
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="retro-border p-2">
                <img 
                  src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Recording studio console" 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Studios Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">Our Studios</h2>
            <p className="lead">Choose the perfect space for your project</p>
          </div>
          
          <div className="row g-4">
            {roomsArray.map((room, index) => (
              <div key={index} className="col-md-4">
                <StudioCard studio={room} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/studios" className="btn btn-primary">
              View All Studios
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">Our Services</h2>
            <p className="lead">Professional audio solutions for every need</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">music_note</span>
                  <h3 className="card-title h5 text-heading">Music Recording</h3>
                  <p className="card-text">
                    From solo artists to full bands, our studios are equipped to 
                    capture your sound with precision and clarity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">mic</span>
                  <h3 className="card-title h5 text-heading">Podcast Production</h3>
                  <p className="card-text">
                    Create professional-sounding podcasts with our dedicated podcast 
                    suite and expert guidance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">graphic_eq</span>
                  <h3 className="card-title h5 text-heading">Mixing & Mastering</h3>
                  <p className="card-text">
                    Polish your recordings to perfection with our professional 
                    mixing and mastering services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">What Our Clients Say</h2>
            <p className="lead">Hear from the artists and creators who've worked with us</p>
          </div>
          
          <div className="row g-4">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="col-md-4">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 retro-gradient text-white">
        <div className="container py-4 text-center">
          <h2 className="text-heading mb-4">Ready to Book Your Session?</h2>
          <p className="lead mb-4">
            Take the first step towards creating something amazing.
          </p>
          <Link to="/booking" className="btn btn-primary btn-lg retro-border">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;