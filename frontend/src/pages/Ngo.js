import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { getVerifiedNgos } from "../api/adminApi";

const Ngos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNgo, setExpandedNgo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        setLoading(true);
        const data = await getVerifiedNgos();
        setNgos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch NGOs");
        setLoading(false);
      }
    };
    fetchNgos();
  }, []);

  const categories = ["All", ...new Set(ngos.map(ngo => ngo.mission || "Other"))];

  const filteredNgos = ngos.filter(ngo => {
    const nameMatch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const missionMatch = (ngo.mission || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || missionMatch;

    const matchesCategory = selectedCategory === "All" || (ngo.mission === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id) => {
    setExpandedNgo(expandedNgo === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Recommended NGOs</h1>
        </div>
        
        <div className="p-6">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Search NGOs by name or mission..."
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

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading NGOs...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : filteredNgos.length > 0 ? (
            <div className="space-y-4">
              {filteredNgos.map((ngo) => (
                <div 
                  key={ngo.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="p-4 cursor-pointer flex items-start"
                    onClick={() => toggleExpand(ngo.id)}
                  >
                    <div className="mr-4 p-2 bg-amber-50 rounded-full">
                      <MapPin className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-800">{ngo.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {ngo.location}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{ngo.mission || ngo.needs || "No description available"}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="inline-block bg-amber-100 rounded-full px-3 py-1 text-xs font-semibold text-amber-800">
                          {ngo.mission || "Other"}
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
                    <div className="px-4 pb-4 pt-2 bg-amber-50 border-t space-y-3">
                      <h4 className="font-medium text-gray-800">Contact Information:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={ngo.phone ? "tel:" + ngo.phone : "#"} 
                            className="text-gray-700 hover:text-amber-600 hover:underline"
                          >
                            {ngo.phone || "N/A"}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={ngo.email ? "mailto:" + ngo.email : "#"} 
                            className="text-gray-700 hover:text-amber-600 hover:underline"
                          >
                            {ngo.email || "N/A"}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-3 text-amber-600" />
                          <a 
                            href={ngo.website ? (ngo.website.startsWith("http") ? ngo.website : "https://" + ngo.website) : "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:underline"
                          >
                            {ngo.website || "N/A"}
                          </a>
                        </div>
                      </div>

                      {/* Images Section */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">Images:</h4>
                        {ngo.images && ngo.images.length > 0 ? (
                          <div className="flex flex-wrap gap-4">
                            {console.log(ngo.images)}
                            {ngo.images.map((imgUrl, index) => (
                              <img
                                key={index}
                                src={imgUrl.startsWith('http') ? imgUrl : `http://localhost:5000${imgUrl}`}
                                alt={`NGO Image ${index + 1}`}
                                className="w-32 h-32 object-cover rounded-md shadow-md"
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No images available.</p>
                        )}
                      </div>

                      {/* Requirements Section */}
                      <div>
                        <h4 className="font-medium text-gray-800 mt-4 mb-2">Requirements:</h4>
                        {ngo.requirements && ngo.requirements.length > 0 ? (
                          <ul className="list-disc list-inside text-gray-700">
                            {ngo.requirements.map((req, index) => (
                              <li key={index}>
                              
                                {req.name} - Quantity: {req.quantity} {req.priority ? "(Priority: " + req.priority + ")" : ""} {req.notes ? "- Notes: " + req.notes : ""}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No requirements listed.</p>
                        )}
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
              ))}
            </div>
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
  );
};

export default Ngos;
