// Mock product data for Steep & Bloom Co.

// Coffee Beans Products
const beanProducts = [
  {
    id: 'bean-1',
    name: 'Ethiopian Yirgacheffe',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'beans',
    description: 'A light roast with bright acidity and complex floral and citrus notes. Perfect for pour-over brewing.',
    featured: true,
    details: {
      roastLevel: 'Light',
      origin: 'Ethiopia',
      brewMethod: 'Pour-Over',
      tastingNotes: ['Floral', 'Citrus', 'Honey'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  },
  {
    id: 'bean-2',
    name: 'Colombian Medium Roast',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'beans',
    description: 'Smooth, balanced coffee with notes of chocolate and citrus. Perfect for drip or pour-over methods.',
    featured: true,
    details: {
      roastLevel: 'Medium',
      origin: 'Colombia',
      brewMethod: 'Pour-Over, Drip',
      tastingNotes: ['Chocolate', 'Citrus', 'Caramel'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  },
  {
    id: 'bean-3',
    name: 'Signature Espresso Blend',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'beans',
    description: 'Our signature espresso blend with rich, bold flavors and a smooth finish. Perfect for espresso machines.',
    featured: false,
    details: {
      roastLevel: 'Medium-Dark',
      origin: 'Brazil, Colombia',
      brewMethod: 'Espresso',
      tastingNotes: ['Chocolate', 'Caramel', 'Nutty'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  },
  {
    id: 'bean-4',
    name: 'Brazil Nutty Roast',
    price: 15.49,
    image: 'https://images.unsplash.com/photo-1677443192176-b0120bcccca1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'beans',
    description: 'A medium roast with nutty flavors and a smooth body. Great for everyday brewing.',
    featured: false,
    details: {
      roastLevel: 'Medium',
      origin: 'Brazil',
      brewMethod: 'French Press, Drip',
      tastingNotes: ['Nutty', 'Chocolate', 'Smooth'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  },
  {
    id: 'bean-5',
    name: 'French Roast Dark',
    price: 14.95,
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'beans',
    description: 'A bold, dark roast with smoky flavors and a full body. Perfect for those who enjoy a strong cup.',
    featured: false,
    details: {
      roastLevel: 'Dark',
      origin: 'Mixed',
      brewMethod: 'French Press, Espresso',
      tastingNotes: ['Smoky', 'Bold', 'Caramelized'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  },
  {
    id: 'bean-6',
    name: 'Kenya Light Roast',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'beans',
    description: 'A bright, fruity light roast with vibrant acidity and notes of blackberry and citrus.',
    featured: false,
    details: {
      roastLevel: 'Light',
      origin: 'Kenya',
      brewMethod: 'Pour-Over, Drip',
      tastingNotes: ['Blackberry', 'Citrus', 'Floral'],
      grindType: 'Whole',
      bagSizes: ['250g', '500g', '1kg']
    }
  }
];

// Coffee Tools Products
const toolProducts = [
  {
    id: 'tool-1',
    name: 'Ceramic Pour-Over Dripper',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544421604-029b2ff95af1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'tools',
    description: 'Handcrafted ceramic pour-over dripper for a clean, flavorful cup. Designed for precision brewing.',
    featured: true,
    details: {
      material: 'Ceramic',
      color: ['White', 'Black', 'Terracotta'],
      capacity: '1-2 cups',
      includes: ['Dripper', 'User Guide'],
      compatibility: 'Standard filters'
    }
  },
  {
    id: 'tool-2',
    name: 'French Press',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1639906512494-dd4a536abc4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'tools',
    description: 'Classic French press with durable glass and stainless steel construction. Makes rich, full-bodied coffee.',
    featured: true,
    details: {
      material: 'Borosilicate Glass, Stainless Steel',
      color: ['Silver', 'Copper', 'Black'],
      capacity: '34 oz (8 cups)',
      includes: ['French Press', 'Measuring Spoon', 'User Guide'],
      dishwasherSafe: true
    }
  },
  {
    id: 'tool-3',
    name: 'Burr Coffee Grinder',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1646346834998-5b610ec21d12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'tools',
    description: 'Precision burr grinder with 15 grind settings for the perfect consistency from fine to coarse.',
    featured: false,
    details: {
      material: 'Stainless Steel, Plastic',
      color: ['Black', 'Silver'],
      capacity: '8 oz beans',
      settings: 15,
      warranty: '1 year'
    }
  },
  {
    id: 'tool-4',
    name: 'Gooseneck Kettle',
    price: 34.95,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'tools',
    description: 'Precision gooseneck kettle for controlled pouring. Essential for pour-over brewing methods.',
    featured: false,
    details: {
      material: 'Stainless Steel',
      color: ['Silver', 'Copper', 'Matte Black'],
      capacity: '1 liter',
      compatible: 'All stovetops',
      features: ['Thermometer', 'Ergonomic Handle']
    }
  },
  {
    id: 'tool-5',
    name: 'Digital Coffee Scale',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1650919031711-3035a0846fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'tools',
    description: 'Precise digital scale with timer function. Measure your coffee and water with accuracy for consistent brewing.',
    featured: false,
    details: {
      material: 'ABS Plastic, Stainless Steel',
      color: ['Black'],
      capacity: '3 kg',
      precision: '0.1g',
      features: ['Timer', 'Tare Function', 'Auto-Off']
    }
  },
  {
    id: 'tool-6',
    name: 'Espresso Tamper',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1599246990878-f090af2d7cca?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'tools',
    description: 'Professional-grade espresso tamper with ergonomic design. Creates the perfect puck for espresso extraction.',
    featured: false,
    details: {
      material: 'Stainless Steel, Wood',
      size: '58mm',
      weight: '1 lb',
      handle: 'Walnut Wood',
      base: 'Polished Stainless Steel'
    }
  }
];

// Combine all products
const allProducts = [...beanProducts, ...toolProducts];

// Filter options for beans
const beanFilters = {
  roastLevel: ['Light', 'Medium', 'Dark'],
  origin: ['Ethiopia', 'Colombia', 'Brazil', 'Kenya', 'Mixed'],
  brewMethod: ['Pour-Over', 'Drip', 'Espresso', 'French Press'],
  tastingNotes: ['Floral', 'Citrus', 'Chocolate', 'Nutty', 'Fruity', 'Caramel', 'Smoky'],
  grindType: ['Whole', 'Ground'],
  bagSize: ['250g', '500g', '1kg']
};

// Filter options for tools
const toolFilters = {
  material: ['Ceramic', 'Glass', 'Stainless Steel', 'Plastic', 'Wood'],
  color: ['White', 'Black', 'Silver', 'Copper', 'Terracotta', 'Matte Black'],
  priceRange: ['Under $20', '$20-$50', 'Over $50'],
  brewingMethod: ['Pour-Over', 'French Press', 'Espresso', 'Drip']
};

export { 
  allProducts, 
  beanProducts, 
  toolProducts, 
  beanFilters, 
  toolFilters 
};
