import React, { useState } from "react";
import { 
  MapPin, 
  Book, 
  Shirt, 
  HeartPulse, 
  Utensils, 
  Search, 
  Phone, 
  Mail, 
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Ngos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNgo, setExpandedNgo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const ngos = [
    {
      id: 1,
      name: "Literacy Foundation",
      location: "2km away",
      description: "Accepts book donations for underprivileged schools",
      category: "Education",
      contact: {
        phone: "+91 9876543210",
        email: "contact@literacyfoundation.org",
        website: "www.literacyfoundation.org"
      },
      icon: <Book className="h-6 w-6 text-amber-600" />,
    },
    {
      id: 2,
      name: "Clothing Drive",
      location: "5km away", 
      description: "Collects clothes for homeless shelters",
      category: "Clothing",
      contact: {
        phone: "+91 9876543211",
        email: "info@clothingdrive.org",
        website: "www.clothingdrive.org"
      },
      icon: <Shirt className="h-6 w-6 text-orange-500" />,
    },
    {
      id: 3,
      name: "Medical Aid",
      location: "3km away",
      description: "Accepts medical supplies for rural clinics",
      category: "Healthcare",
      contact: {
        phone: "+91 9876543212",
        email: "support@medicalaid.org",
        website: "www.medicalaid.org"
      },
      icon: <HeartPulse className="h-6 w-6 text-amber-700" />,
    },
    {
      id: 4,
      name: "Food Bank",
      location: "7km away",
      description: "Distributes food to low-income families",
      category: "Food",
      contact: {
        phone: "+91 9876543213",
        email: "help@foodbank.org",
        website: "www.foodbank.org"
      },
      icon: <Utensils className="h-6 w-6 text-orange-600" />,
    },
  ];

  const categories = ["All", ...new Set(ngos.map(ngo => ngo.category))];

  const filteredNgos = ngos.filter(ngo => {
    const matchesSearch = 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || ngo.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id) => {
    setExpandedNgo(expandedNgo === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Orange gradient heading */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Recommended NGOs</h1>
        </div>
        
        <div className="p-6">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Search NGOs by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* NGO List */}
          <div className="space-y-4">
            {filteredNgos.length > 0 ? (
              filteredNgos.map((ngo) => (
                <div 
                  key={ngo.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="p-4 cursor-pointer flex items-start"
                    onClick={() => toggleExpand(ngo.id)}
                  >
                    <div className="mr-4 p-2 bg-amber-50 rounded-full">
                      {ngo.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-800">{ngo.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {ngo.location}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{ngo.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="inline-block bg-amber-100 rounded-full px-3 py-1 text-xs font-semibold text-amber-800">
                          {ngo.category}
                        </span>
                        {expandedNgo === ngo.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedNgo === ngo.id && (
                    <div className="px-4 pb-4 pt-2 bg-amber-50 border-t">
                      <h4 className="font-medium text-gray-800 mb-3">Contact Information:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={`tel:${ngo.contact.phone}`} 
                            className="text-gray-700 hover:text-amber-600 hover:underline"
                          >
                            {ngo.contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={`mailto:${ngo.contact.email}`} 
                            className="text-gray-700 hover:text-amber-600 hover:underline"
                          >
                            {ngo.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={`https://${ngo.contact.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:underline"
                          >
                            {ngo.contact.website}
                          </a>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <Link
                          to="/donate"
                          className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-center"
                        >
                          Donate Now
                        </Link>
                        <button className="flex-1 bg-white border border-amber-600 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No NGOs found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 text-amber-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ngos;