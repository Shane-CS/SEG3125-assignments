import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const FAQ = () => {
  // State to track which FAQ item is expanded
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // FAQ data
  const faqItems = [
    {
      category: 'Booking & Scheduling',
      questions: [
        {
          question: 'How far in advance should I book a session?',
          answer: 'We recommend booking at least 2-3 weeks in advance for weekday sessions and 3-4 weeks for weekend sessions. For larger projects requiring multiple days, earlier booking is advised.'
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'Cancellations made more than 48 hours before your session will receive a full refund of any deposit. Cancellations within 48 hours will forfeit the deposit. No-shows will be charged the full session fee.'
        },
        {
          question: 'Can I book multiple sessions for a project?',
          answer: 'Absolutely! Many projects require multiple sessions. You can book consecutive days or schedule sessions across different dates. Contact us for special rates on multi-day bookings.'
        },
        {
          question: 'What are your operating hours?',
          answer: 'We are open Monday through Friday from 9am to 9pm, and Saturday and Sunday from 10am to 6pm. After-hours sessions may be available by special arrangement.'
        }
      ]
    },
    {
      category: 'Studio Facilities',
      questions: [
        {
          question: 'Do you provide instruments or do I need to bring my own?',
          answer: 'We provide several instruments including a Yamaha C7 grand piano, Fender Rhodes, Hammond B3 organ, and a DW drum kit. You are welcome to bring your own instruments as well. Check our Studios page for more details.'
        },
        {
          question: 'Is there parking available?',
          answer: 'Yes, we have a dedicated parking lot with free parking for clients. There is also street parking available nearby.'
        },
        {
          question: 'Do you have a lounge or waiting area?',
          answer: 'Yes, we have a comfortable lounge area with complimentary coffee, tea, and water. The lounge has Wi-Fi, comfortable seating, and a small kitchenette.'
        },
        {
          question: 'Are your studios accessible for people with disabilities?',
          answer: 'Yes, our facility is wheelchair accessible with ramp access, an elevator, and accessible restrooms. Please let us know if you have any specific requirements.'
        }
      ]
    },
    {
      category: 'Technical Questions',
      questions: [
        {
          question: 'What DAW (Digital Audio Workstation) do you use?',
          answer: 'Our primary DAW is Pro Tools, but we also have Logic Pro X and Ableton Live available. If you have a preference, please let us know when booking.'
        },
        {
          question: 'Can I bring my own engineer or producer?',
          answer: 'Yes, you are welcome to bring your own engineer or producer. We can provide as much or as little technical assistance as you need.'
        },
        {
          question: 'Do you offer mixing and mastering services?',
          answer: 'Yes, we offer professional mixing and mastering services. These can be booked as part of your recording session or as separate services.'
        },
        {
          question: 'What file formats do you deliver?',
          answer: 'We typically deliver WAV files (24-bit, 48kHz or 96kHz), but we can accommodate other formats upon request. We can provide stems, full mixes, or both.'
        }
      ]
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'What are your rates?',
          answer: 'Our standard rate is $75/hour for simple bookings and $60/hour plus gear fees for advanced bookings. Discounts are available for longer sessions and multiple bookings. See our booking page for detailed pricing.'
        },
        {
          question: 'Do you require a deposit?',
          answer: 'Yes, we require a $25 deposit for simple bookings. This deposit is applied to your final bill. Advanced bookings require full payment at the time of booking.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and bank transfers. Cash payments are accepted for walk-in services only.'
        },
        {
          question: 'Do you offer any discounts?',
          answer: 'We offer discounts for students, non-profit organizations, and for bulk bookings (8+ hours). Contact us for more information about our discount programs.'
        }
      ]
    },
    {
      category: 'First-Time Clients',
      questions: [
        {
          question: 'I have never recorded in a studio before. Is that okay?',
          answer: 'Absolutely! We welcome clients of all experience levels. Our engineers are patient and happy to guide you through the process. Consider booking our "Simple Mode" option for a more guided experience.'
        },
        {
          question: 'What should I bring to my session?',
          answer: 'Bring your instruments (unless using ours), any reference tracks, lyrics/notes, and a hard drive if you want a copy of the session files. Do not forget water and snacks for longer sessions!'
        },
        {
          question: 'How should I prepare for my recording session?',
          answer: 'Practice your material thoroughly before coming in. For bands, rehearse together to tighten up your performance. For vocalists, rest your voice the day before. Come with a clear idea of what you want to achieve.'
        },
        {
          question: 'Can I visit the studio before booking?',
          answer: 'Yes, we offer studio tours by appointment. This is a great way to see our facilities and ask questions before booking. Contact us to schedule a tour.'
        }
      ]
    }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our studios and booking process"
        backgroundImage="https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
      />
      
      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <p className="lead text-center mb-5">
                Find answers to common questions about our studios, booking process, and services. 
                If you do not see your question here, please <Link to="/contact">contact us</Link>.
              </p>
              
              {/* FAQ Categories */}
              {faqItems.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-5">
                  <h2 className="text-heading mb-4">{category.category}</h2>
                  
                  {/* FAQ Accordion */}
                  <div className="accordion" id={`accordion-${categoryIndex}`}>
                    {category.questions.map((item, itemIndex) => {
                      const index = `${categoryIndex}-${itemIndex}`;
                      const isActive = activeIndex === index;
                      
                      return (
                        <div key={itemIndex} className="card mb-3 retro-border">
                          <div 
                            className={`card-header ${isActive ? 'bg-primary text-white' : ''}`}
                            id={`heading-${index}`}
                            onClick={() => toggleFAQ(index)}
                            style={{ cursor: 'pointer' }}
                          >
                            <h3 className="mb-0 h6 d-flex justify-content-between align-items-center">
                              <span className="text-heading">{item.question}</span>
                              <span className="material-icons">
                                {isActive ? 'remove' : 'add'}
                              </span>
                            </h3>
                          </div>
                          
                          <div 
                            className={`collapse ${isActive ? 'show' : ''}`}
                            id={`collapse-${index}`}
                          >
                            <div className="card-body">
                              <p className="mb-0">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Still Have Questions Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-heading mb-4">Still Have Questions?</h2>
          <p className="lead mb-4">
            We are here to help! Reach out to us and we will get back to you as soon as possible.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default FAQ;