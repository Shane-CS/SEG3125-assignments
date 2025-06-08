import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="py-5 my-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card retro-border p-5">
              <div className="card-body">
                <span className="material-icons display-1 text-danger mb-4">error_outline</span>
                <h1 className="text-heading display-4 mb-4">404</h1>
                <h2 className="text-heading h3 mb-4">Page Not Found</h2>
                <p className="lead mb-5">
                  The page you are looking for might have been removed, had its name changed, 
                  or is temporarily unavailable.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/" className="btn btn-primary">
                    Go to Home
                  </Link>
                  <Link to="/contact" className="btn btn-outline-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <h3 className="text-heading h5 mb-4">You might be interested in:</h3>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card retro-border h-100">
                    <div className="card-body text-center">
                      <span className="material-icons display-4 mb-3 text-primary">home</span>
                      <h4 className="card-title h6 text-heading">Home Page</h4>
                      <p className="card-text small">
                        Return to our home page to explore all our services.
                      </p>
                      <Link to="/" className="btn btn-sm btn-primary mt-2">
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card retro-border h-100">
                    <div className="card-body text-center">
                      <span className="material-icons display-4 mb-3 text-primary">mic</span>
                      <h4 className="card-title h6 text-heading">Studios</h4>
                      <p className="card-text small">
                        Explore our professional recording spaces.
                      </p>
                      <Link to="/studios" className="btn btn-sm btn-primary mt-2">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card retro-border h-100">
                    <div className="card-body text-center">
                      <span className="material-icons display-4 mb-3 text-primary">event</span>
                      <h4 className="card-title h6 text-heading">Book a Session</h4>
                      <p className="card-text small">
                        Ready to record? Book your session now.
                      </p>
                      <Link to="/booking" className="btn btn-sm btn-primary mt-2">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;