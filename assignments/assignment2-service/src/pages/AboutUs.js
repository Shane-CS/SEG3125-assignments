import React from 'react';
import Hero from '../components/Hero';
import { TEAM } from '../config';

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="About SoundWave Studios"
        subtitle="Our story, our team, and our passion for sound"
        backgroundImage="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
      />
      
      {/* Our Story Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">Our Story</h2>
              <p className="lead mb-4">From garage recordings to professional studio</p>
              <p className="mb-4">
                SoundWave Studios was founded in 2010 by a group of passionate musicians and audio engineers 
                who wanted to create a space where artists could bring their creative visions to life. 
                What started as a small recording setup in a converted garage has grown into a 
                state-of-the-art facility with three professional studios.
              </p>
              <p>
                Over the years, we've had the privilege of working with hundreds of talented artists, 
                from local indie bands recording their first EP to established musicians crafting their 
                next hit. We've also expanded our services to include podcast production and voice-over 
                work, embracing the evolving landscape of audio content creation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="retro-border p-2">
                <img 
                  src="https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Recording studio equipment" 
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="text-heading mb-4">Our Mission</h2>
              <p className="lead mb-3">Empowering creativity through sound</p>
              <p>
                At SoundWave Studios, our mission is to provide artists and creators with the tools, 
                environment, and expertise they need to bring their audio projects to life. We believe 
                that everyone has a unique voice and story to tell, and we're committed to helping you 
                share yours with the world.
              </p>
              <p>
                We strive to create a welcoming and inspiring space where creativity can flourish, 
                whether you're a seasoned professional or stepping into a recording studio for the 
                first time. Our team is dedicated to delivering exceptional sound quality and a 
                positive experience for every client.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">Our Values</h2>
            <p className="lead">The principles that guide everything we do</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">high_quality</span>
                  <h3 className="card-title h5 text-heading">Quality</h3>
                  <p className="card-text">
                    We're committed to excellence in everything we do, from the equipment we use 
                    to the service we provide.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">psychology</span>
                  <h3 className="card-title h5 text-heading">Creativity</h3>
                  <p className="card-text">
                    We foster an environment where artistic expression is encouraged and innovation thrives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 retro-border">
                <div className="card-body text-center">
                  <span className="material-icons display-4 mb-3 text-primary">diversity_3</span>
                  <h3 className="card-title h5 text-heading">Community</h3>
                  <p className="card-text">
                    We believe in building relationships and supporting the creative community around us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-heading">Meet Our Team</h2>
            <p className="lead">The talented professionals behind SoundWave Studios</p>
          </div>
          
          <div className="row g-4">
            {TEAM.map((member) => (
              <div key={member.id} className="col-md-4">
                <div className="card h-100 retro-border">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <img 
                        src={`https://randomuser.me/api/portraits/${member.id % 2 === 0 ? 'women' : 'men'}/${member.id}.jpg`} 
                        alt={member.name} 
                        className="rounded-circle img-fluid mx-auto d-block" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                    <h3 className="card-title h5 text-heading">{member.name}</h3>
                    <p className="text-muted mb-3">{member.role}</p>
                    <p className="card-text">{member.bio}</p>
                    <div className="mt-3">
                      <h6 className="text-heading small">Specialties:</h6>
                      <div className="d-flex flex-wrap justify-content-center gap-2">
                        {member.specialties.map((specialty, index) => (
                          <span key={index} className="badge bg-secondary">{specialty}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Equipment Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="text-heading mb-4">Our Equipment</h2>
              <p className="lead mb-3">Professional gear for professional results</p>
              <p>
                We pride ourselves on offering top-of-the-line equipment to ensure your project 
                sounds its absolute best. Our studios feature industry-standard microphones, 
                preamps, compressors, and more from renowned brands like Neumann, API, Universal Audio, 
                and SSL.
              </p>
              <p>
                Whether you're looking for vintage warmth or modern clarity, we have the tools to 
                achieve the sound you're after. And if you're not sure what gear would work best for 
                your project, our experienced engineers are here to guide you.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="retro-border p-2">
                <img 
                  src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Professional audio equipment" 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;