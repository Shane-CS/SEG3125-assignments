import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Blog = () => {
  const location = useLocation();
  const [selectedPost, setSelectedPost] = useState(null);

  // Effect to handle URL hash changes
  useEffect(() => {
    if (location.hash) {
      const postId = parseInt(location.hash.replace('#post-', ''));
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
        // Scroll to the post content
        setTimeout(() => {
          const element = document.getElementById(`post-${postId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setSelectedPost(null);
    }
  }, [location.hash]);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Pour-Over Coffee: A Beginner's Guide",
      excerpt: "Learn the fundamentals of pour-over brewing and how to achieve a clean, flavorful cup every time.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      date: "June 15, 2023",
      category: "Brewing Guides",
      author: "Emma Rodriguez",
      featured: true,
      content: `
        <h2>The Art of Pour-Over Coffee: A Beginner's Guide</h2>

        <p>Pour-over coffee brewing has gained immense popularity among coffee enthusiasts for its ability to produce a clean, flavorful cup that highlights the unique characteristics of specialty beans. If you're new to this brewing method, this guide will walk you through the essentials to get you started on your pour-over journey.</p>

        <h3>Why Choose Pour-Over?</h3>

        <p>Pour-over brewing offers several advantages over other methods:</p>

        <ul>
          <li><strong>Control:</strong> You control every variable in the brewing process, from water temperature to pour rate.</li>
          <li><strong>Clarity:</strong> The paper filter removes oils and sediment, resulting in a clean cup that showcases subtle flavor notes.</li>
          <li><strong>Ritual:</strong> The manual process creates a mindful morning ritual that many find rewarding.</li>
        </ul>

        <h3>Essential Equipment</h3>

        <p>To get started with pour-over brewing, you'll need:</p>

        <ul>
          <li>A pour-over dripper (ceramic, plastic, or metal)</li>
          <li>Paper filters designed for your dripper</li>
          <li>A gooseneck kettle for precise pouring</li>
          <li>A coffee grinder (burr grinder recommended)</li>
          <li>A scale for measuring coffee and water</li>
          <li>Fresh, quality coffee beans</li>
        </ul>

        <h3>The Basic Pour-Over Method</h3>

        <h4>Step 1: Preparation</h4>

        <p>Begin by heating water to 195-205°F (90-96°C). While the water heats, grind your coffee beans to a medium-fine consistency, similar to table salt. For a standard cup, use 15-18 grams of coffee (about 2-3 tablespoons) per 8 oz (240ml) of water.</p>

        <h4>Step 2: Filter Preparation</h4>

        <p>Place a paper filter in your dripper and rinse it thoroughly with hot water. This removes any paper taste and preheats your brewing equipment. Discard the rinse water.</p>

        <h4>Step 3: Add Coffee</h4>

        <p>Add your ground coffee to the filter, ensuring the bed is level. Place your dripper on top of your mug or carafe on a scale and tare the scale to zero.</p>

        <h4>Step 4: The Bloom</h4>

        <p>Start your timer and pour just enough water (about twice the weight of your coffee) to saturate all the grounds. This initial pour allows the coffee to "bloom," releasing CO2 and preparing the grounds for extraction. Wait 30-45 seconds.</p>

        <h4>Step 5: The Main Pour</h4>

        <p>Continue pouring water in slow, steady spirals from the center outward, then back to the center. Maintain a consistent flow rate and keep the water level steady. Your total brew time should be between 2:30-3:30 minutes for a standard cup.</p>

        <h3>Troubleshooting Your Brew</h3>

        <p>If your coffee tastes:</p>

        <ul>
          <li><strong>Sour or weak:</strong> Your grind may be too coarse, or your brew time too short. Try a finer grind or slower pour.</li>
          <li><strong>Bitter or harsh:</strong> Your grind may be too fine, or your brew time too long. Try a coarser grind or faster pour.</li>
        </ul>

        <h3>Advancing Your Skills</h3>

        <p>As you become more comfortable with the basics, you can experiment with different variables:</p>

        <ul>
          <li>Coffee-to-water ratios</li>
          <li>Water temperature</li>
          <li>Pouring techniques</li>
          <li>Different coffee origins and roast levels</li>
        </ul>

        <p>Remember, pour-over brewing is both a science and an art. Don't be afraid to experiment and adjust based on your taste preferences. With practice, you'll develop the skills to brew a cup that perfectly suits your palate.</p>

        <p>Happy brewing!</p>
      `
    },
    {
      id: 2,
      title: "Understanding Coffee Origins: Ethiopia vs. Colombia",
      excerpt: "Explore the distinct flavor profiles of Ethiopian and Colombian beans and what makes each region special.",
      image: "https://images.unsplash.com/photo-1595259602106-9b5d5a7c825e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "May 28, 2023",
      category: "Coffee Knowledge",
      author: "Michael Chen",
      content: `
        <h2>Understanding Coffee Origins: Ethiopia vs. Colombia</h2>

        <p>When it comes to specialty coffee, origin matters tremendously. The country, region, and even the specific farm where coffee is grown all contribute to its distinctive flavor profile. Two of the world's most celebrated coffee origins are Ethiopia and Colombia, each offering unique characteristics that appeal to different palates. Let's explore what makes these origins special and how to appreciate their differences.</p>

        <h3>Ethiopia: The Birthplace of Coffee</h3>

        <p>Ethiopia is widely recognized as the birthplace of coffee, with a coffee culture dating back more than a millennium. Legend has it that a goat herder named Kaldi discovered coffee after noticing his goats becoming energetic after eating berries from a certain tree.</p>

        <h4>Growing Regions</h4>

        <p>Ethiopia's main coffee-growing regions include:</p>

        <ul>
          <li><strong>Yirgacheffe:</strong> Known for its floral, citrusy profiles with bright acidity</li>
          <li><strong>Sidamo:</strong> Offers complex, wine-like qualities with berry notes</li>
          <li><strong>Harrar:</strong> Features fruity, wine-like characteristics with a heavy body</li>
          <li><strong>Limu:</strong> Produces balanced coffees with mild, sweet characteristics</li>
        </ul>

        <h4>Flavor Profile</h4>

        <p>Ethiopian coffees are celebrated for their:</p>

        <ul>
          <li>Bright, complex acidity</li>
          <li>Floral and fruity notes (jasmine, bergamot, blueberry)</li>
          <li>Tea-like delicacy and complexity</li>
          <li>Wine-like qualities in natural processed varieties</li>
        </ul>

        <h4>Processing Methods</h4>

        <p>Ethiopia employs both washed and natural processing methods, each creating distinctly different flavor profiles:</p>

        <ul>
          <li><strong>Washed:</strong> Produces cleaner, more floral cups with pronounced acidity</li>
          <li><strong>Natural:</strong> Creates more fruit-forward profiles with berry notes and wine-like qualities</li>
        </ul>

        <h3>Colombia: Consistent Quality and Balance</h3>

        <p>Colombia has been a coffee powerhouse for generations, with a reputation for consistently high-quality beans. The country's unique geography, with its high altitudes and diverse microclimates, creates ideal growing conditions.</p>

        <h4>Growing Regions</h4>

        <p>Colombia's main coffee-growing regions include:</p>

        <ul>
          <li><strong>Huila:</strong> Known for sweet, complex coffees with fruit notes</li>
          <li><strong>Nariño:</strong> Produces bright coffees with citrus notes and caramel sweetness</li>
          <li><strong>Cauca:</strong> Offers balanced cups with chocolate and caramel notes</li>
          <li><strong>Antioquia:</strong> Features nutty, chocolate profiles with medium body</li>
        </ul>

        <h4>Flavor Profile</h4>

        <p>Colombian coffees are celebrated for their:</p>

        <ul>
          <li>Well-balanced character</li>
          <li>Medium to full body</li>
          <li>Caramel sweetness and chocolate notes</li>
          <li>Clean, mild acidity</li>
          <li>Nutty undertones</li>
        </ul>

        <h4>Processing Methods</h4>

        <p>Colombia primarily uses washed processing, which contributes to the clean, consistent profile of its coffees. However, experimental processing methods are becoming more common as farmers explore new flavor possibilities.</p>

        <h3>Side-by-Side Comparison</h3>

        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Characteristic</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Ethiopian Coffee</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Colombian Coffee</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Body</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Light to medium</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Medium to full</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Acidity</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Bright, vibrant</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Balanced, mild</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Flavor Notes</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Floral, fruity, citrus</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Chocolate, caramel, nutty</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Complexity</td>
            <td style="padding: 10px; border: 1px solid #ddd;">High</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Medium</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Best Brewing Methods</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Pour-over, filter</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Versatile (espresso, drip, French press)</td>
          </tr>
        </table>

        <h3>How to Choose Between Them</h3>

        <p>When deciding between Ethiopian and Colombian coffees, consider your taste preferences:</p>

        <ul>
          <li><strong>Choose Ethiopian if:</strong> You enjoy bright, complex coffees with distinctive floral and fruit notes. Ethiopian coffees shine in pour-over and filter brewing methods that highlight their delicate qualities.</li>
          <li><strong>Choose Colombian if:</strong> You prefer balanced, approachable coffees with chocolate and caramel sweetness. Colombian coffees are versatile and work well across various brewing methods, including espresso.</li>
        </ul>

        <p>Of course, the best approach is to try both! Experiencing these distinct origins side by side is the perfect way to develop your palate and discover your preferences in the wonderful world of specialty coffee.</p>
      `
    },
    {
      id: 3,
      title: "How Water Quality Affects Your Brew",
      excerpt: "Discover why water matters so much in coffee brewing and simple ways to improve your water for better coffee.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      date: "May 10, 2023",
      category: "Brewing Tips",
      author: "Sarah Johnson",
      content: `
        <h2>How Water Quality Affects Your Brew</h2>

        <p>When we think about brewing great coffee, we often focus on bean quality, grind size, and brewing technique. However, there's one crucial element that's frequently overlooked: water. Given that coffee is approximately 98% water, the quality of water you use dramatically impacts the flavor of your final cup.</p>

        <h3>Why Water Matters</h3>

        <p>Water isn't just a neutral carrier for coffee flavors—it's an active participant in the extraction process. The mineral content, pH level, and temperature of your water all affect how compounds are extracted from coffee grounds.</p>

        <p>Here's why water quality is so important:</p>

        <ul>
          <li>Water acts as a solvent, extracting flavors from coffee grounds</li>
          <li>Minerals in water bond with coffee compounds, affecting extraction and taste</li>
          <li>Water hardness or softness influences how flavors develop in the cup</li>
          <li>Impurities or strong odors in water can mask or alter coffee flavors</li>
        </ul>

        <h3>The Ideal Water for Coffee</h3>

        <p>The Specialty Coffee Association (SCA) has established standards for water used in coffee brewing:</p>

        <ul>
          <li><strong>Total Dissolved Solids (TDS):</strong> 150 ppm (acceptable range: 75-250 ppm)</li>
          <li><strong>Calcium Hardness:</strong> 50-175 ppm</li>
          <li><strong>Total Alkalinity:</strong> 40 ppm (acceptable range: 40-70 ppm)</li>
          <li><strong>pH:</strong> 7.0 (acceptable range: 6.5-7.5)</li>
          <li><strong>Sodium:</strong> 10 ppm</li>
          <li><strong>Chlorine:</strong> 0 ppm</li>
        </ul>

        <p>These specifications create water that's neither too hard (which can lead to under-extraction and flat flavors) nor too soft (which can cause over-extraction and bitter flavors).</p>

        <h3>Common Water Problems and Their Effects on Coffee</h3>

        <h4>Hard Water (High Mineral Content)</h4>

        <p><strong>Effects on coffee:</strong></p>
        <ul>
          <li>Under-extraction of flavor compounds</li>
          <li>Muted acidity</li>
          <li>Diminished sweetness</li>
          <li>Can lead to scale buildup in equipment</li>
        </ul>

        <h4>Soft Water (Low Mineral Content)</h4>

        <p><strong>Effects on coffee:</strong></p>
        <ul>
          <li>Over-extraction leading to bitterness</li>
          <li>Lack of body and complexity</li>
          <li>Can taste "flat" or "hollow"</li>
        </ul>

        <h4>Chlorinated Water</h4>

        <p><strong>Effects on coffee:</strong></p>
        <ul>
          <li>Imparts chemical taste</li>
          <li>Masks subtle flavor notes</li>
          <li>Can react with coffee compounds, creating off-flavors</li>
        </ul>

        <h3>Simple Solutions for Better Water</h3>

        <p>You don't need to be a water scientist to improve your brewing water. Here are practical solutions for home brewers:</p>

        <h4>1. Filtered Tap Water</h4>

        <p>A simple carbon filter (like Brita or PUR) can remove chlorine and some impurities, making a noticeable improvement in most tap water. This is an affordable starting point for better coffee.</p>

        <h4>2. Bottled Spring Water</h4>

        <p>Not all bottled waters are created equal for coffee brewing. Look for spring waters with a TDS between 75-250 ppm. Avoid distilled water (too few minerals) and mineral water (too many minerals).</p>

        <h4>3. Third Wave Water</h4>

        <p>Products like Third Wave Water provide mineral packets designed to be added to distilled water, creating the ideal mineral balance for coffee extraction.</p>

        <h4>4. Home Water Testing</h4>

        <p>Inexpensive TDS meters can help you understand your water's mineral content, allowing you to make more informed choices about filtration or treatment.</p>

        <h3>Testing Your Water's Impact</h3>

        <p>To experience how water affects your coffee, try this simple experiment:</p>

        <ol>
          <li>Brew the same coffee with three different waters: tap water, filtered water, and a quality bottled spring water</li>
          <li>Keep all other variables constant (coffee amount, grind size, brew time, etc.)</li>
          <li>Taste the coffees side by side, noting differences in flavor, aroma, and mouthfeel</li>
        </ol>

        <p>Most people are surprised by how dramatically water can change the taste of their coffee.</p>

        <h3>Conclusion</h3>

        <p>Improving your water quality is often the most overlooked yet impactful change you can make to your coffee brewing routine. With minimal investment and effort, better water can transform your daily cup, bringing out flavors you never knew existed in your favorite beans.</p>

        <p>Remember: great coffee starts with great water!</p>
      `
    },
    {
      id: 4,
      title: "Sustainable Coffee: From Farm to Cup",
      excerpt: "Learn about the importance of sustainability in the coffee industry and how your choices make a difference.",
      image: "https://images.unsplash.com/photo-1652067871073-d472c02125b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNvZmZlZSUyMG9uJTIwYSUyMGZhcm18ZW58MHwxfDB8fHwy",
      date: "April 22, 2023",
      category: "Sustainability",
      author: "David Nguyen",
      content: `
        <h2>Sustainable Coffee: From Farm to Cup</h2>

        <p>Coffee is one of the world's most beloved beverages, with over 2 billion cups consumed daily. But behind each cup lies a complex global supply chain that impacts millions of people and vast ecosystems around the world. As climate change threatens coffee-growing regions and economic pressures challenge farmer livelihoods, sustainability has become not just an ethical choice but a necessity for the future of coffee.</p>

        <h3>The Coffee Sustainability Crisis</h3>

        <p>The coffee industry faces several critical sustainability challenges:</p>

        <ul>
          <li><strong>Climate Change:</strong> Rising temperatures and changing rainfall patterns are reducing suitable growing areas for arabica coffee, which thrives in specific climate conditions.</li>
          <li><strong>Economic Instability:</strong> Many coffee farmers live below the poverty line, earning as little as $2-4 per day despite coffee's high retail value.</li>
          <li><strong>Deforestation:</strong> As demand grows, forests are cleared for coffee plantations, destroying vital ecosystems.</li>
          <li><strong>Water Usage:</strong> Traditional coffee processing can require up to 40 liters of water per cup.</li>
          <li><strong>Chemical Inputs:</strong> Conventional coffee farming often relies heavily on synthetic fertilizers and pesticides.</li>
        </ul>

        <h3>What Makes Coffee Sustainable?</h3>

        <p>Sustainable coffee addresses environmental, social, and economic concerns throughout the supply chain:</p>

        <h4>Environmental Sustainability</h4>

        <ul>
          <li><strong>Shade-Grown:</strong> Coffee grown under a canopy of trees preserves biodiversity, provides bird habitat, and protects soil.</li>
          <li><strong>Organic Practices:</strong> Avoiding synthetic chemicals protects ecosystems, water sources, and farmer health.</li>
          <li><strong>Water Conservation:</strong> Improved processing methods can reduce water usage by up to 80%.</li>
          <li><strong>Carbon Footprint:</strong> Sustainable practices like agroforestry can help sequester carbon and mitigate climate change.</li>
        </ul>

        <h4>Social Sustainability</h4>

        <ul>
          <li><strong>Fair Labor Practices:</strong> Safe working conditions, fair wages, and prohibition of child labor.</li>
          <li><strong>Community Development:</strong> Investment in education, healthcare, and infrastructure in coffee-growing communities.</li>
          <li><strong>Gender Equity:</strong> Supporting women's participation and leadership in the coffee sector.</li>
        </ul>

        <h4>Economic Sustainability</h4>

        <ul>
          <li><strong>Fair Prices:</strong> Ensuring farmers receive prices that cover production costs and provide living wages.</li>
          <li><strong>Direct Trade:</strong> Shortening supply chains to increase the percentage of revenue reaching farmers.</li>
          <li><strong>Long-term Relationships:</strong> Commitments between buyers and producers that provide stability and allow for planning.</li>
        </ul>

        <h3>Certifications: Understanding the Labels</h3>

        <p>Coffee certifications help consumers identify sustainable options, though each focuses on different aspects of sustainability:</p>

        <ul>
          <li><strong>Fair Trade:</strong> Focuses on ensuring minimum prices for farmers and supporting community development.</li>
          <li><strong>Rainforest Alliance:</strong> Emphasizes environmental protection and biodiversity conservation.</li>
          <li><strong>Organic:</strong> Certifies coffee grown without synthetic pesticides or fertilizers.</li>
          <li><strong>Bird Friendly:</strong> Requires organic certification plus specific shade coverage criteria to protect bird habitats.</li>
          <li><strong>Direct Trade:</strong> Not a formal certification but indicates direct relationships between roasters and farmers.</li>
        </ul>

        <h3>Beyond Certifications: The New Wave of Sustainability</h3>

        <p>While certifications provide valuable frameworks, many industry leaders are going beyond basic requirements:</p>

        <ul>
          <li><strong>Transparency:</strong> Sharing detailed information about pricing, sourcing, and impact.</li>
          <li><strong>Technology:</strong> Using blockchain and other technologies to verify claims and track coffee from farm to cup.</li>
          <li><strong>Regenerative Agriculture:</strong> Implementing practices that actively restore ecosystems and build soil health.</li>
          <li><strong>Climate Resilience:</strong> Developing and distributing coffee varieties that can withstand changing climate conditions.</li>
          <li><strong>Living Income:</strong> Moving beyond minimum prices to ensure farmers can achieve a decent standard of living.</li>
        </ul>

        <h3>How Your Choices Make a Difference</h3>

        <p>As a coffee consumer, your purchasing decisions have real impact. Here's how you can support sustainable coffee:</p>

        <ol>
          <li><strong>Choose Certified or Transparently Sourced Coffee:</strong> Look for credible certifications or roasters who openly share their sourcing practices.</li>
          <li><strong>Pay a Fair Price:</strong> Truly sustainable coffee often costs more, reflecting the true cost of production and fair compensation.</li>
          <li><strong>Reduce Waste:</strong> Use reusable cups, compost coffee grounds, and choose packaging that can be recycled or composted.</li>
          <li><strong>Ask Questions:</strong> Inquire about where your coffee comes from and how it was produced. Consumer demand drives change.</li>
          <li><strong>Support Roasters with Clear Sustainability Commitments:</strong> Many specialty coffee roasters are leading the way in sustainable practices.</li>
        </ol>

        <h3>The Future of Coffee Depends on Sustainability</h3>

        <p>The coffee industry stands at a crossroads. Without significant changes in how coffee is grown, traded, and consumed, we face a future with less coffee diversity, higher prices, and continued environmental degradation. But with conscious choices and industry-wide commitment to sustainability, coffee can continue to thrive as a crop that supports both people and planet.</p>

        <p>Every cup of coffee tells a story. By choosing sustainable coffee, you're helping write a better story for coffee's future—one that includes thriving farmers, healthy ecosystems, and delicious coffee for generations to come.</p>
      `
    },
    {
      id: 5,
      title: "The Perfect Coffee-to-Water Ratio",
      excerpt: "Master the golden ratio for brewing coffee and learn how to adjust it to suit your taste preferences.",
      image: "https://images.unsplash.com/photo-1550048192-f5416a1f132a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      date: "April 5, 2023",
      category: "Brewing Tips",
      author: "Emma Rodriguez",
      content: `
        <h2>The Perfect Coffee-to-Water Ratio</h2>

        <p>Brewing great coffee at home comes down to controlling variables, and perhaps none is more fundamental than the coffee-to-water ratio. This crucial relationship determines the strength, extraction, and overall balance of your cup. Whether you're a brewing beginner or looking to refine your technique, understanding coffee ratios will dramatically improve your daily brew.</p>

        <h3>Why Ratios Matter</h3>

        <p>The coffee-to-water ratio affects three key aspects of your brew:</p>

        <ul>
          <li><strong>Strength:</strong> How intense the coffee tastes and feels in your mouth</li>
          <li><strong>Extraction:</strong> How efficiently flavor compounds are pulled from the coffee grounds</li>
          <li><strong>Balance:</strong> The harmony between different flavor elements (sweetness, acidity, bitterness)</li>
        </ul>

        <p>Using too little coffee results in over-extraction and bitterness. Using too much coffee leads to under-extraction and sour, weak flavors. Finding the right balance is essential for a satisfying cup.</p>

        <h3>The Golden Ratio</h3>

        <p>The Specialty Coffee Association (SCA) recommends a starting ratio of 1:18, meaning 1 gram of coffee for every 18 grams of water. This translates to approximately:</p>

        <ul>
          <li>55 grams of coffee per liter of water</li>
          <li>2 tablespoons of coffee per 6 ounces of water</li>
        </ul>

        <p>This ratio produces a balanced cup that works well for most brewing methods and coffee origins. However, it's meant to be a starting point, not an absolute rule.</p>

        <h3>Common Ratio Ranges by Brewing Method</h3>

        <p>Different brewing methods work best with slightly different ratios:</p>

        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Brewing Method</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Recommended Ratio Range</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Characteristics</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Espresso</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:2 - 1:3</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Concentrated, intense</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Moka Pot</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:7</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Strong, rich</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">French Press</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:12 - 1:15</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Full-bodied, robust</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Pour Over</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:15 - 1:17</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Clean, bright</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Drip Coffee</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:17 - 1:18</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Balanced, approachable</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Cold Brew</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1:5 - 1:8</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Smooth, concentrated</td>
          </tr>
        </table>

        <h3>Measuring for Precision</h3>

        <p>For consistent results, precision matters. Here are the best ways to measure:</p>

        <h4>Weight vs. Volume</h4>

        <p>Measuring by weight (grams) is far more accurate than measuring by volume (tablespoons). Coffee beans vary in density based on origin, roast level, and age, making volume measurements inconsistent.</p>

        <h4>Essential Tools</h4>

        <ul>
          <li><strong>Digital Scale:</strong> Invest in a scale that measures in 0.1g increments for best results</li>
          <li><strong>Graduated Vessel:</strong> For measuring water volume if not using a scale</li>
        </ul>

        <h3>Adjusting to Your Taste</h3>

        <p>While standard ratios provide a starting point, personal preference should guide your final choice. Here's how to adjust based on taste:</p>

        <h4>If Your Coffee Tastes...</h4>

        <ul>
          <li><strong>Too strong/bitter:</strong> Use less coffee (try a higher ratio like 1:19 or 1:20)</li>
          <li><strong>Too weak/sour:</strong> Use more coffee (try a lower ratio like 1:15 or 1:16)</li>
          <li><strong>Balanced but too intense:</strong> Keep the ratio but add hot water after brewing (Americano style)</li>
        </ul>

        <h4>Other Factors That Affect Strength</h4>

        <p>Remember that ratio is just one variable. Your perceived strength is also affected by:</p>

        <ul>
          <li><strong>Grind size:</strong> Finer grinds extract more quickly and can increase strength</li>
          <li><strong>Water temperature:</strong> Hotter water extracts more compounds</li>
          <li><strong>Brew time:</strong> Longer contact between water and grounds increases extraction</li>
          <li><strong>Roast level:</strong> Darker roasts often taste stronger even at the same ratio</li>
        </ul>

        <h3>Practical Examples</h3>

        <p>Here are some common scenarios with the appropriate measurements:</p>

        <h4>Single Cup Pour-Over (1:16 ratio)</h4>
        <ul>
          <li>15g coffee : 240g water</li>
          <li>Approximately 2 tablespoons coffee : 8oz water</li>
        </ul>

        <h4>French Press for Two (1:15 ratio)</h4>
        <ul>
          <li>30g coffee : 450g water</li>
          <li>Approximately 4 tablespoons coffee : 15oz water</li>
        </ul>

        <h4>Drip Coffee Maker (1:17 ratio)</h4>
        <ul>
          <li>60g coffee : 1020g water</li>
          <li>Approximately 8 tablespoons coffee : 34oz water</li>
        </ul>

        <h3>Experimenting Methodically</h3>

        <p>Finding your perfect ratio is a journey of experimentation. Follow these steps for a systematic approach:</p>

        <ol>
          <li>Start with the standard ratio for your brewing method</li>
          <li>Keep all other variables constant (grind size, water temperature, brew time)</li>
          <li>Adjust the ratio in small increments (try changing by 1 point at a time, e.g., from 1:16 to 1:15)</li>
          <li>Take notes on each brew to track your preferences</li>
          <li>Once you find your preferred ratio, you can experiment with other variables</li>
        </ol>

        <h3>Conclusion</h3>

        <p>The perfect coffee-to-water ratio isn't universal—it's personal. By understanding the principles behind coffee ratios and methodically experimenting, you'll discover the precise measurements that create your ideal cup. Remember that different coffees, brewing methods, and even your mood might call for different ratios. Embrace the flexibility to adjust while maintaining the precision that leads to consistently delicious coffee.</p>

        <p>Happy brewing!</p>
      `
    },
    {
      id: 6,
      title: "Choosing Your First Espresso Machine",
      excerpt: "A comprehensive guide to selecting an espresso machine that fits your needs, space, and budget.",
      image: "https://images.unsplash.com/photo-1747852221968-31585f55d046?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "March 18, 2023",
      category: "Equipment",
      author: "Michael Chen",
      content: `
        <h2>Choosing Your First Espresso Machine</h2>

        <p>Bringing espresso-making capabilities into your home is an exciting step in any coffee lover's journey. However, navigating the vast landscape of home espresso machines can be overwhelming. With options ranging from $100 budget models to $5,000+ professional-grade equipment, how do you choose the right machine for your needs, space, and budget?</p>

        <p>This guide will walk you through the key considerations, different types of machines, and what to expect at various price points to help you make an informed decision.</p>

        <h3>Before You Begin: Is an Espresso Machine Right for You?</h3>

        <p>Before investing in an espresso machine, ask yourself these questions:</p>

        <ul>
          <li><strong>How often will you use it?</strong> Daily use justifies a higher investment than occasional weekend brewing.</li>
          <li><strong>What's your preferred drink?</strong> If you mainly enjoy milk-based drinks like lattes, prioritize steam capabilities.</li>
          <li><strong>Do you enjoy the process?</strong> Espresso making is part science, part craft. Some machines require more skill and attention than others.</li>
          <li><strong>What's your budget for the entire setup?</strong> Remember that a quality grinder is as important as the espresso machine itself.</li>
        </ul>

        <h3>The Importance of a Good Grinder</h3>

        <p>Before discussing espresso machines, we must emphasize: <strong>a quality grinder is non-negotiable for good espresso</strong>. Even the most expensive espresso machine will produce disappointing results with an inadequate grinder.</p>

        <p>An espresso-capable grinder needs:</p>
        <ul>
          <li>Burr grinding mechanism (not blade)</li>
          <li>Fine adjustment capabilities</li>
          <li>Consistency in particle size</li>
        </ul>

        <p>Budget at least $200-300 for an entry-level espresso grinder, with better options starting around $400-500.</p>

        <h3>Types of Espresso Machines</h3>

        <h4>1. Manual Lever Machines</h4>

        <p><strong>How they work:</strong> You physically pull a lever to create pressure for extraction.</p>

        <p><strong>Pros:</strong></p>
        <ul>
          <li>Complete control over pressure profiling</li>
          <li>Often beautiful, timeless designs</li>
          <li>Can last decades with minimal maintenance</li>
          <li>No electronics to fail</li>
        </ul>

        <p><strong>Cons:</strong></p>
        <ul>
          <li>Steep learning curve</li>
          <li>Requires physical effort and skill</li>
          <li>Consistency can be challenging</li>
        </ul>

        <p><strong>Price range:</strong> $400-$3,000</p>
        <p><strong>Best for:</strong> Coffee enthusiasts who enjoy the hands-on process and are willing to master a skill.</p>

        <h4>2. Semi-Automatic Machines</h4>

        <p><strong>How they work:</strong> You grind, dose, and tamp the coffee, then start and stop the extraction with a button or switch.</p>

        <p><strong>Pros:</strong></p>
        <ul>
          <li>Good balance of control and convenience</li>
          <li>Wide range of options at different price points</li>
          <li>You control extraction time</li>
          <li>Standard in specialty coffee shops</li>
        </ul>

        <p><strong>Cons:</strong></p>
        <ul>
          <li>Requires learning proper technique</li>
          <li>Quality machines require investment</li>
          <li>Need a good grinder</li>
        </ul>

        <p><strong>Price range:</strong> $300-$3,000+</p>
        <p><strong>Best for:</strong> Most home baristas who want quality espresso and enjoy some involvement in the process.</p>

        <h4>3. Fully Automatic Machines</h4>

        <p><strong>How they work:</strong> Press a button, and the machine grinds, doses, tamps, and extracts automatically.</p>

        <p><strong>Pros:</strong></p>
        <ul>
          <li>Convenience and consistency</li>
          <li>Less skill required</li>
          <li>All-in-one solution</li>
          <li>Often programmable for different drinks</li>
        </ul>

        <p><strong>Cons:</strong></p>
        <ul>
          <li>Less control over variables</li>
          <li>Quality models are expensive</li>
          <li>More components that can fail</li>
          <li>Repairs can be costly</li>
        </ul>

        <p><strong>Price range:</strong> $500-$3,500+</p>
        <p><strong>Best for:</strong> Those who prioritize convenience and consistency over the craft aspect.</p>

        <h4>4. Capsule/Pod Machines</h4>

        <p><strong>How they work:</strong> Insert a pre-packaged coffee capsule and press a button.</p>

        <p><strong>Pros:</strong></p>
        <ul>
          <li>Ultimate convenience</li>
          <li>Consistent results</li>
          <li>Affordable entry point</li>
          <li>Minimal cleanup</li>
        </ul>

        <p><strong>Cons:</strong></p>
        <ul>
          <li>Limited coffee selection and freshness</li>
          <li>Environmental impact of capsules</li>
          <li>Not "true" espresso by purist standards</li>
          <li>Higher cost per cup over time</li>
        </ul>

        <p><strong>Price range:</strong> $100-$700</p>
        <p><strong>Best for:</strong> Those who value convenience above all and don't mind the limitations.</p>

        <h3>Key Features to Consider</h3>

        <h4>Boiler System</h4>

        <ul>
          <li><strong>Single Boiler:</strong> One boiler for both brewing and steaming, requiring temperature adjustment between functions. ($300-800)</li>
          <li><strong>Heat Exchange:</strong> One boiler with a system that allows brewing and steaming at different temperatures. ($800-1,500)</li>
          <li><strong>Dual Boiler:</strong> Separate boilers for brewing and steaming, allowing simultaneous operation. ($1,200+)</li>
        </ul>

        <h4>Pump Type</h4>

        <ul>
          <li><strong>Vibratory Pump:</strong> More common in home machines, slightly louder but less expensive.</li>
          <li><strong>Rotary Pump:</strong> Quieter, more durable, and allows for direct plumbing, but more expensive.</li>
        </ul>

        <h4>PID Controller</h4>

        <p>A PID (Proportional-Integral-Derivative) controller maintains precise temperature stability, resulting in more consistent shots. Worth the investment for serious espresso lovers.</p>

        <h4>Pressure Gauge</h4>

        <p>Helps you monitor extraction pressure, useful for diagnosing issues with grind size or tamping.</p>

        <h4>Pre-Infusion</h4>

        <p>Gently wets the coffee grounds before full pressure is applied, resulting in more even extraction and often better flavor.</p>

        <h4>Steam Wand Quality</h4>

        <p>If you enjoy milk drinks, look for:</p>
        <ul>
          <li>Multi-hole steam tips for better texture</li>
          <li>Full range of motion</li>
          <li>Sufficient power for quick steaming</li>
        </ul>

        <h3>Budget Considerations: What to Expect at Different Price Points</h3>

        <h4>Entry-Level ($300-700)</h4>

        <p><strong>What you get:</strong> Basic semi-automatic machines with single boilers, often with pressurized portafilters to compensate for less precise grinding.</p>

        <p><strong>Limitations:</strong> Temperature stability issues, slower transition between brewing and steaming, typically less durable components, and limited repairability.</p>

        <p><strong>Examples:</strong> Gaggia Classic Pro, Breville Bambino, Flair Pro 2 (manual)</p>

        <h4>Mid-Range ($700-1,500)</h4>

        <p><strong>What you get:</strong> Better temperature stability (often with PID), improved steam power, higher quality components, and better build quality.</p>

        <p><strong>Limitations:</strong> May still have single boilers at the lower end, limiting simultaneous brewing and steaming.</p>

        <p><strong>Examples:</strong> Rancilio Silvia Pro, Breville Barista Express, Lelit Mara</p>

        <h4>Prosumer ($1,500-3,000)</h4>

        <p><strong>What you get:</strong> Heat exchange or dual boiler systems, commercial-grade components, excellent temperature stability, powerful steaming, and machines built to last decades with proper maintenance.</p>

        <p><strong>Limitations:</strong> Significant counter space required, longer warm-up times, higher learning curve.</p>

        <p><strong>Examples:</strong> Rocket Appartamento, Profitec Pro 500, Lelit Bianca</p>

        <h4>Commercial/High-End ($3,000+)</h4>

        <p><strong>What you get:</strong> Commercial-grade everything, maximum temperature stability, pressure profiling capabilities, highest quality materials, and ultimate performance.</p>

        <p><strong>Limitations:</strong> Price, size, electrical requirements (may need dedicated circuit).</p>

        <p><strong>Examples:</strong> La Marzocco Linea Mini, Slayer Single Group, Decent DE1</p>

        <h3>Space and Practical Considerations</h3>

        <p>Before purchasing, consider these practical factors:</p>

        <ul>
          <li><strong>Dimensions:</strong> Measure your available counter space, including height under cabinets.</li>
          <li><strong>Weight:</strong> Heavier machines are typically more stable but harder to move.</li>
          <li><strong>Water Source:</strong> Will you use the reservoir or plumb directly to a water line?</li>
          <li><strong>Electrical Requirements:</strong> Most home machines use standard 120V, but some prosumer models require 220V.</li>
          <li><strong>Warm-up Time:</strong> Larger boilers take longer to heat (15-45 minutes).</li>
          <li><strong>Noise Level:</strong> Consider if noise will be an issue in your household.</li>
        </ul>

        <h3>Long-Term Ownership Considerations</h3>

        <ul>
          <li><strong>Maintenance:</strong> All espresso machines require regular cleaning and occasional descaling.</li>
          <li><strong>Repairability:</strong> Higher-end machines typically have replaceable parts and better repair options.</li>
          <li><strong>Resale Value:</strong> Quality machines from established brands hold value better.</li>
          <li><strong>Upgradability:</strong> Some machines allow for modifications or upgrades over time.</li>
        </ul>

        <h3>Recommendations for Beginners</h3>

        <p>If you're new to espresso and serious about the craft:</p>

        <ol>
          <li>Prioritize a good grinder first (Baratza Sette 270, Eureka Mignon, or similar)</li>
          <li>Consider starting with a Gaggia Classic Pro or Rancilio Silvia for a quality entry point</li>
          <li>Invest in a good tamper, scale, and fresh beans</li>
          <li>Be prepared for a learning curve and some initial frustration</li>
        </ol>

        <p>If convenience is more important than the ultimate cup quality:</p>

        <ol>
          <li>Consider a quality super-automatic like a Jura or mid-range Breville</li>
          <li>Or explore higher-end capsule systems like Nespresso Creatista</li>
        </ol>

        <h3>Conclusion</h3>

        <p>Choosing your first espresso machine is a personal decision that depends on your coffee preferences, budget, space, and how much you enjoy the process of making espresso. There's no single "best" machine—only the best machine for your specific needs.</p>

        <p>Remember that espresso making is a skill that improves with practice. Whichever machine you choose, expect a learning period before you're consistently producing cafe-quality shots. But with patience and the right equipment, you'll soon be enjoying exceptional espresso in the comfort of your home.</p>
      `
    }
  ];

  // Featured post is the first one marked as featured
  const featuredPost = blogPosts.find(post => post.featured);

  // Regular posts exclude the featured one
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 mb-4">The Steep & Bloom Blog</h1>
          <p className="lead">
            Brewing guides, coffee knowledge, and stories from our community.
          </p>
          <hr className="my-4" />
        </Col>
      </Row>

      {/* Featured Post */}
      {featuredPost && (
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm overflow-hidden">
              <Row className="g-0">
                <Col md={6}>
                  <Card.Img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="h-100 object-fit-cover"
                  />
                </Col>
                <Col md={6}>
                  <Card.Body className="p-4 p-lg-5">
                    <Badge bg="primary" className="mb-2 text-white">Featured</Badge>
                    <Card.Title as="h2" className="mb-3">{featuredPost.title}</Card.Title>
                    <Card.Text className="text-muted mb-2">
                      <small>{featuredPost.date} • {featuredPost.category}</small>
                    </Card.Text>
                    <Card.Text className="mb-4">{featuredPost.excerpt}</Card.Text>
                    <Button variant="primary" as={Link} to={`/blog#post-${featuredPost.id}`}>Read More</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}

      {/* Blog Post Grid */}
      <Row className="g-4 mb-5">
        {regularPosts.map(post => (
          <Col md={6} lg={4} key={post.id}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img variant="top" src={post.image} alt={post.title} />
              <Card.Body className="p-4">
                <Card.Text className="text-muted mb-2">
                  <small>{post.date} • {post.category}</small>
                </Card.Text>
                <Card.Title as="h3" className="h5 mb-3">{post.title}</Card.Title>
                <Card.Text className="mb-3">{post.excerpt}</Card.Text>
                <Button variant="outline-primary" size="sm" as={Link} to={`/blog#post-${post.id}`}>Read More</Button>
              </Card.Body>
              <Card.Footer className="bg-transparent border-top-0 text-muted">
                <small>By {post.author}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Selected Blog Post Content */}
      {selectedPost && (
        <Row className="mb-5" id={`post-${selectedPost.id}`}>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-lg-5">
                <Button 
                  variant="outline-secondary" 
                  className="mb-4"
                  onClick={() => {
                    setSelectedPost(null);
                    window.history.pushState({}, '', '/blog');
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to All Posts
                </Button>

                <div className="mb-4">
                  <Badge bg="secondary" className="me-2 text-white">{selectedPost.category}</Badge>
                  <small className="text-muted">{selectedPost.date} • By {selectedPost.author}</small>
                </div>

                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Newsletter Signup */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm newsletter-card">
            <Card.Body className="p-4 p-lg-5 text-center">
              <h3 className="mb-3">Subscribe to Our Blog</h3>
              <p className="mb-4">Get the latest brewing tips, coffee knowledge, and special offers delivered to your inbox.</p>
              <Row className="justify-content-center">
                <Col md={8}>
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Your email address" 
                      aria-label="Email address" 
                    />
                    <Button variant="primary">Subscribe</Button>
                  </div>
                  <small className="text-muted">We respect your privacy and will never share your information.</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
