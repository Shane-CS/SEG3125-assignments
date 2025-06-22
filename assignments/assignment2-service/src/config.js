/**
 * Configuration file for SoundWave Studios Booking App
 * Contains static values like rates, mock endpoint URIs, etc.
 */

// API Endpoints
export const API = {
  BOOK: '/api/book',
  GEAR_AVAILABILITY: '/api/gear-availability'
};

// Pricing
export const PRICING = {
  SIMPLE_MODE: {
    HOURLY_RATE: 75,
    DEPOSIT: 25,
    EXTRA_30_MIN: 35
  },
  ADVANCED_MODE: {
    HOURLY_RATE: 60
  }
};

// Booking Options
export const BOOKING = {
  MAX_HOURS: 8,
  MIN_HOURS: 1,
  AVAILABLE_HOURS: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
};

// Studio Rooms
export const ROOMS = {
  ROOM_A: {
    name: 'Studio A',
    description: 'Our flagship studio with premium acoustics and equipment',
    size: 'Large (800 sq ft)',
    features: ['Neve Console', 'Isolated Vocal Booth', 'Drum Room', 'Lounge Area']
  },
  ROOM_B: {
    name: 'Studio B',
    description: 'Mid-sized studio perfect for bands and small ensembles',
    size: 'Medium (500 sq ft)',
    features: ['SSL Console', 'Acoustic Treatment', 'Control Room', 'Kitchenette']
  },
  ROOM_C: {
    name: 'Podcast Suite',
    description: 'Dedicated space for podcast recording and voice work',
    size: 'Small (300 sq ft)',
    features: ['4-Person Setup', 'Soundproof Booth', 'Mixing Console', 'Video Capability']
  }
};

// Team Members
export const TEAM = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Lead Engineer',
    bio: 'Grammy-nominated engineer with 15+ years of experience working with top artists.',
    specialties: ['Mixing', 'Mastering', 'Live Recording']
  },
  {
    id: 2,
    name: 'Jordan Chen',
    role: 'Studio Manager',
    bio: 'Keeps everything running smoothly while also being an accomplished producer.',
    specialties: ['Scheduling', 'Client Relations', 'Production']
  },
  {
    id: 3,
    name: 'Morgan Lee',
    role: 'Assistant Engineer',
    bio: 'Rising talent with a keen ear and expertise in digital workflows.',
    specialties: ['Pro Tools', 'Vocal Production', 'Podcast Editing']
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'The Midnight Echoes',
    type: 'Band',
    quote: 'Recording our EP at SoundWave was the best decision we made. The equipment and expertise took our sound to the next level.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    type: 'Podcaster',
    quote: 'As a first-time podcaster, I was nervous, but the team made the process so easy and fun. My show sounds professional!',
    rating: 5
  },
  {
    id: 3,
    name: 'Marcus Williams',
    type: 'Voice Actor',
    quote: 'The acoustic quality in Studio C is perfect for voice work. I\'ve recorded three audiobooks here and will be back for more.',
    rating: 4
  }
];

export default {
  API,
  PRICING,
  BOOKING,
  ROOMS,
  TEAM,
  TESTIMONIALS
};