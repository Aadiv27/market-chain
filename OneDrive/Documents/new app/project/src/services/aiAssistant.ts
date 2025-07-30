import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyAuRH8ZpqL_KOs4kLFQm6mdrkl7Vhq-d1M');

// Product database with regional names and synonyms
const productDatabase = {
  'sugar': {
    names: ['chini', 'cheeni', 'sugar', 'shakkar', 'gur', 'gud'],
    category: 'groceries',
    description: 'White refined sugar for daily use',
    brands: ['Tata', 'Dabur', 'Local'],
    units: ['kg', '500g', '1kg']
  },
  'rice': {
    names: ['chawal', 'rice', 'bhaat', 'arwa chawal', 'basmati', 'sella'],
    category: 'groceries',
    description: 'Various types of rice including Basmati, Sella, and local varieties',
    brands: ['Tata', 'India Gate', 'Local'],
    units: ['kg', '25kg', '50kg']
  },
  'oil': {
    names: ['tel', 'oil', 'sarson ka tel', 'mustard oil', 'refined oil', 'groundnut oil'],
    category: 'groceries',
    description: 'Cooking oils including mustard, refined, and groundnut oil',
    brands: ['Fortune', 'Dhara', 'Local'],
    units: ['L', '1L', '5L']
  },
  'flour': {
    names: ['atta', 'flour', 'gehun ka atta', 'wheat flour', 'maida'],
    category: 'groceries',
    description: 'Wheat flour and refined flour for cooking',
    brands: ['Aashirvaad', 'Pillsbury', 'Local'],
    units: ['kg', '10kg', '25kg']
  },
  'tea': {
    names: ['chai', 'tea', 'doodh wali chai', 'black tea', 'green tea'],
    category: 'beverages',
    description: 'Various types of tea including black, green, and herbal',
    brands: ['Taj Mahal', 'Red Label', 'Local'],
    units: ['kg', '500g', '1kg']
  },
  'milk': {
    names: ['doodh', 'milk', 'fresh milk', 'toned milk', 'full cream'],
    category: 'dairy',
    description: 'Fresh milk and dairy products',
    brands: ['Amul', 'Mother Dairy', 'Local'],
    units: ['L', '1L', '500ml']
  },
  'bread': {
    names: ['bread', 'double roti', 'bun', 'pav', 'toast'],
    category: 'bakery',
    description: 'Fresh bread and bakery items',
    brands: ['Britannia', 'Modern', 'Local'],
    units: ['pack', 'loaf', 'pieces']
  },
  'eggs': {
    names: ['anda', 'egg', 'eggs', 'desi anda', 'farm eggs'],
    category: 'dairy',
    description: 'Fresh farm eggs',
    brands: ['Farm Fresh', 'Local'],
    units: ['dozen', 'pieces', 'tray']
  },
  'potato': {
    names: ['aloo', 'potato', 'batata', 'potatoes'],
    category: 'vegetables',
    description: 'Fresh potatoes for cooking',
    brands: ['Local'],
    units: ['kg', '25kg', '50kg']
  },
  'onion': {
    names: ['pyaaz', 'onion', 'kanda', 'onions'],
    category: 'vegetables',
    description: 'Fresh onions',
    brands: ['Local'],
    units: ['kg', '25kg', '50kg']
  },
  'tomato': {
    names: ['tamatar', 'tomato', 'tomatoes'],
    category: 'vegetables',
    description: 'Fresh tomatoes',
    brands: ['Local'],
    units: ['kg', '25kg']
  },
  'soft_drinks': {
    names: ['thanda', 'cold drink', 'soft drink', 'cola', 'pepsi', 'coca cola'],
    category: 'beverages',
    description: 'Cold beverages and soft drinks',
    brands: ['Coca Cola', 'Pepsi', 'Thums Up', 'Sprite'],
    units: ['bottle', 'can', '2L', '500ml']
  }
};

// Regional language mappings
const regionalMappings = {
  'hindi': {
    'cheapest': 'sabse sasta',
    'expensive': 'sabse mehnga',
    'good quality': 'accha quality',
    'fresh': 'taza',
    'old': 'purana',
    'big': 'bada',
    'small': 'chota',
    'show me': 'dikhao',
    'give me': 'do mujhe',
    'need': 'chahiye',
    'want': 'chahta hun'
  },
  'hinglish': {
    'cheapest': 'sabse sasta',
    'expensive': 'sabse mehnga',
    'good quality': 'accha quality',
    'fresh': 'fresh',
    'old': 'purana',
    'big': 'bada',
    'small': 'chota',
    'show me': 'show me',
    'give me': 'give me',
    'need': 'need',
    'want': 'want'
  }
};

export interface AIProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  brands: string[];
  units: string[];
  synonyms: string[];
  price?: string;
  rating?: number;
  availability?: boolean;
}

export interface AISearchResult {
  query: string;
  products: AIProduct[];
  suggestions: string[];
  clarification?: string;
}

class AIAssistant {
  private model: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  // Process natural language query
  async processQuery(query: string, language: 'hindi' | 'hinglish' | 'english' = 'hinglish'): Promise<AISearchResult> {
    try {
      // Normalize query
      const normalizedQuery = this.normalizeQuery(query, language);
      
      // Find matching products
      const matchingProducts = this.findMatchingProducts(normalizedQuery);
      
      // If no direct matches, use AI to understand intent
      if (matchingProducts.length === 0) {
        return await this.getAIUnderstanding(query, language);
      }

      return {
        query: query,
        products: matchingProducts,
        suggestions: this.generateSuggestions(normalizedQuery),
        clarification: undefined
      };
    } catch (error) {
      console.error('AI Assistant Error:', error);
      return {
        query: query,
        products: [],
        suggestions: ['Try searching for: sugar, rice, oil, flour, tea'],
        clarification: 'Could you please rephrase your search?'
      };
    }
  }

  // Normalize query for better matching
  private normalizeQuery(query: string, language: string): string {
    let normalized = query.toLowerCase().trim();
    
    // Remove common filler words
    const fillerWords = ['please', 'kindly', 'can you', 'could you', 'show me', 'give me', 'dikhao', 'do mujhe'];
    fillerWords.forEach(word => {
      normalized = normalized.replace(new RegExp(word, 'gi'), '');
    });

    // Apply regional mappings
    const mappings = regionalMappings[language as keyof typeof regionalMappings] || {};
    Object.entries(mappings).forEach(([english, regional]) => {
      normalized = normalized.replace(new RegExp(english, 'gi'), regional);
    });

    return normalized.trim();
  }

  // Find products based on query
  private findMatchingProducts(query: string): AIProduct[] {
    const results: AIProduct[] = [];
    const queryWords = query.split(' ');

    Object.entries(productDatabase).forEach(([key, product]) => {
      const productNames = [...product.names, key];
      const matches = productNames.some(name => 
        queryWords.some(word => 
          name.includes(word) || word.includes(name)
        )
      );

      if (matches) {
        results.push({
          id: key,
          name: product.description,
          category: product.category,
          description: product.description,
          brands: product.brands,
          units: product.units,
          synonyms: product.names,
          price: this.generatePrice(),
          rating: this.generateRating(),
          availability: true
        });
      }
    });

    return results.slice(0, 5); // Return top 5 matches
  }

  // Use AI to understand complex queries
  private async getAIUnderstanding(query: string, language: string): Promise<AISearchResult> {
    const prompt = `
    You are an AI assistant for MarketChain, a B2B commerce platform for rural retailers in India.
    
    User Query: "${query}"
    Language: ${language}
    
    Available product categories:
    - Groceries: sugar, rice, oil, flour, tea
    - Beverages: tea, soft drinks, milk
    - Dairy: milk, eggs, butter
    - Vegetables: potato, onion, tomato, bottle gourd (lauki)
    - Bakery: bread, biscuits
    
    Please analyze the query and suggest 3-5 relevant products. Consider:
    1. Regional names and synonyms
    2. Intent (cheapest, best quality, fresh, etc.)
    3. Quantity requirements
    4. Brand preferences
    
    Return only the product names that best match the query. If unclear, ask one clarifying question.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse AI response and map to products
      const suggestedProducts = this.parseAIResponse(text);
      
      return {
        query: query,
        products: suggestedProducts,
        suggestions: this.generateSuggestions(query),
        clarification: suggestedProducts.length === 0 ? 'Could you please specify what type of product you are looking for?' : undefined
      };
    } catch (error) {
      console.error('AI Generation Error:', error);
      return {
        query: query,
        products: [],
        suggestions: ['Try searching for: sugar, rice, oil, flour, tea'],
        clarification: 'Could you please rephrase your search?'
      };
    }
  }

  // Parse AI response and map to products
  private parseAIResponse(aiResponse: string): AIProduct[] {
    const products: AIProduct[] = [];
    const lines = aiResponse.toLowerCase().split('\n');
    
    lines.forEach(line => {
      Object.entries(productDatabase).forEach(([key, product]) => {
        if (product.names.some(name => line.includes(name))) {
          products.push({
            id: key,
            name: product.description,
            category: product.category,
            description: product.description,
            brands: product.brands,
            units: product.units,
            synonyms: product.names,
            price: this.generatePrice(),
            rating: this.generateRating(),
            availability: true
          });
        }
      });
    });

    return products.slice(0, 5);
  }

  // Generate suggestions based on query
  private generateSuggestions(query: string): string[] {
    const suggestions = [
      'Try searching for: sugar, rice, oil, flour',
      'Looking for vegetables? Try: potato, onion, tomato',
      'Need beverages? Try: tea, milk, soft drinks',
      'Bakery items: bread, biscuits, cakes'
    ];
    
    if (query.includes('cheap') || query.includes('sasta')) {
      suggestions.unshift('Looking for affordable options? Try local brands');
    }
    
    if (query.includes('fresh') || query.includes('taza')) {
      suggestions.unshift('Fresh products available from local suppliers');
    }
    
    return suggestions.slice(0, 3);
  }

  // Generate mock price
  private generatePrice(): string {
    const prices = ['₹45/kg', '₹85/kg', '₹120/L', '₹180/L', '₹42/kg'];
    return prices[Math.floor(Math.random() * prices.length)];
  }

  // Generate mock rating
  private generateRating(): number {
    return Math.floor(Math.random() * 2) + 4; // 4-5 stars
  }

  // Voice recognition helper
  async processVoiceInput(): Promise<string> {
    // This would integrate with Web Speech API or a third-party service
    // For now, return a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('sabse sasta chawal');
      }, 1000);
    });
  }

  // Get voice synthesis for responses
  speakResponse(text: string, language: 'hindi' | 'english' = 'english') {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }
}

export const aiAssistant = new AIAssistant();
export default aiAssistant; 