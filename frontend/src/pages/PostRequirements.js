import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Minus } from 'lucide-react';
// Remove the imports that are causing errors
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/hooks/use-toast';

const PostRequirements = () => {
  const initialRequirements = [
    { id: '1', name: 'Books', quantity: 0, priority: 'medium', notes: '' },
    { id: '2', name: 'Clothes', quantity: 0, priority: 'high', notes: '' },
    { id: '3', name: 'Toys', quantity: 0, priority: 'low', notes: '' },
    { id: '4', name: 'Stationery', quantity: 0, priority: 'medium', notes: '' },
    { id: '5', name: 'Food Items', quantity: 0, priority: 'high', notes: '' },
    { id: '6', name: 'Hygiene Products', quantity: 0, priority: 'high', notes: '' },
    { id: '7', name: 'School Supplies', quantity: 0, priority: 'medium', notes: '' },
    { id: '8', name: 'Medical Supplies', quantity: 0, priority: 'high', notes: '' },
    { id: '9', name: 'Furniture', quantity: 0, priority: 'low', notes: '' },
    { id: '10', name: 'Electronics', quantity: 0, priority: 'low', notes: '' }
  ];

  const [requirements, setRequirements] = useState(initialRequirements);
  const navigate = useNavigate();
  
  const handleIncrement = (id) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, quantity: req.quantity + 1 } : req
    ));
  };
  
  const handleDecrement = (id) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, quantity: Math.max(0, req.quantity - 1) } : req
    ));
  };
  
  const handleChange = (id, field, value) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, [field]: value } : req
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting requirements:', requirements);
    // Replace toast with console.log since we're removing the import
    console.log("Requirements Posted", "Your requirements have been successfully saved.");
    // In a real application, you would send this to a backend
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/admin-options')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 p-4">
            <h1 className="text-2xl font-bold text-white text-center">Post Requirements</h1>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              Specify the items and quantities needed for the orphanage. Set priority levels and add notes as needed.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {requirements.map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="md:flex md:justify-between md:items-center">
                      <div className="mb-4 md:mb-0">
                        <label className="block text-sm font-medium text-gray-700">{req.name}</label>
                        <div className="flex items-center mt-2">
                          <button 
                            type="button"
                            onClick={() => handleDecrement(req.id)}
                            className="p-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={req.quantity}
                            onChange={(e) => handleChange(req.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-16 p-2 text-center border-y"
                            min="0"
                          />
                          <button 
                            type="button"
                            onClick={() => handleIncrement(req.id)}
                            className="p-2 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={req.priority}
                            onChange={(e) => handleChange(req.id, 'priority', e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <input
                            type="text"
                            value={req.notes}
                            onChange={(e) => handleChange(req.id, 'notes', e.target.value)}
                            placeholder="Add notes..."
                            className="w-full p-2 border rounded-md bg-gray-50"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getPriorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow transition-all duration-300"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Requirements
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRequirements;