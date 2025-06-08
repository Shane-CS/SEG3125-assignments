import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StudioCard from '../components/StudioCard';
import { ROOMS } from '../config';

const Studios = () => {
  // Convert rooms object to array for mapping
  const roomsArray = Object.values(ROOMS);

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Our Studios"
        subtitle="Professional spaces designed for exceptional sound"
        backgroundImage="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Studios Overview */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">Choose Your Perfect Space</h2>
              <p className="lead mb-4">Each studio is designed with specific needs in mind</p>
              <p>
                At SoundWave Studios, we offer three distinct recording spaces, each equipped with 
                professional gear and designed for optimal acoustics. Whether you're recording a full 
                band, producing a podcast, or capturing voice-over work, we have the perfect studio 
                for your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studios Detail */}
      <section className="py-5 bg-light">
        <div className="container">
          {roomsArray.map((room, index) => (
            <div key={index} className="row mb-5 align-items-center">
              <div className={`col-lg-6 mb-4 mb-lg-0 ${index % 2 === 1 ? 'order-lg-2' : ''}`}>
                <div className="retro-border p-2">
                  <img 
                    src={getStudioImage(room.name)} 
                    alt={room.name} 
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-1' : ''}`}>
                <h2 className="text-heading mb-3">{room.name}</h2>
                <p className="lead mb-3">{room.description}</p>
                <p className="mb-3">
                  <span className="badge bg-secondary me-2">{room.size}</span>
                </p>

                <h5 className="text-heading mt-4 mb-3">Features:</h5>
                <ul className="mb-4">
                  {room.features.map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="material-icons text-primary me-2 small">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <h5 className="text-heading mt-4 mb-3">Perfect For:</h5>
                <ul className="mb-4">
                  {getPerfectForList(room.name).map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="material-icons text-primary me-2 small">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/booking" className="btn btn-primary mt-3">
                  Book This Studio
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment Highlights */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">Equipment Highlights</h2>
            <p className="lead">Some of the professional gear available in our studios</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body">
                  <h3 className="card-title h5 text-heading">Microphones</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">mic</span>
                      Neumann U87 Condenser Microphone
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">mic</span>
                      AKG C414 Multi-Pattern Condenser
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">mic</span>
                      Shure SM7B Dynamic Microphone
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">mic</span>
                      Royer R-121 Ribbon Microphone
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">mic</span>
                      Sennheiser MD421 Dynamic Microphone
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body">
                  <h3 className="card-title h5 text-heading">Preamps & Processing</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">settings_input_component</span>
                      Neve 1073 Preamp
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">settings_input_component</span>
                      API 512c Preamp
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">settings_input_component</span>
                      Universal Audio LA-2A Compressor
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">settings_input_component</span>
                      1176 FET Compressor
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">settings_input_component</span>
                      SSL G-Series Bus Compressor
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body">
                  <h3 className="card-title h5 text-heading">Instruments & Monitors</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">piano</span>
                      Yamaha C7 Grand Piano
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">piano</span>
                      Fender Rhodes Electric Piano
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">speaker</span>
                      Genelec 8050 Studio Monitors
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">speaker</span>
                      Yamaha NS10 Reference Monitors
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-primary me-2 small">headphones</span>
                      Sennheiser HD650 Headphones
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 retro-gradient text-white">
        <div className="container py-4 text-center">
          <h2 className="text-heading mb-4">Ready to Book Your Session?</h2>
          <p className="lead mb-4">
            Choose the studio that fits your project and start creating.
          </p>
          <Link to="/booking" className="btn btn-primary btn-lg retro-border">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
};

// Helper function to get the correct image for each studio
const getStudioImage = (studioName) => {
  switch(studioName) {
    case 'Studio A':
      return "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    case 'Studio B':
      return "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";
    case 'Podcast Suite':
      return "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80";
    default:
      return "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  }
};

// Helper function to get "Perfect For" list based on studio name
const getPerfectForList = (studioName) => {
  switch(studioName) {
    case 'Studio A':
      return [
        'Full band recordings',
        'Orchestral sessions',
        'Professional album production',
        'Live ensemble recording'
      ];
    case 'Studio B':
      return [
        'Small band recordings',
        'Singer-songwriter sessions',
        'Mixing and production',
        'Vocal tracking'
      ];
    case 'Podcast Suite':
      return [
        'Podcast recording and production',
        'Voice-over work',
        'Audiobook recording',
        'Interview sessions'
      ];
    default:
      return [];
  }
};

export default Studios;
