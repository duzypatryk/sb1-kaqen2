import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch summaries from the backend
      fetchSummaries();
    }
  }, [isAuthenticated]);

  const fetchSummaries = async () => {
    // This is a mock function. In a real app, you'd call your backend API.
    setLoading(true);
    setTimeout(() => {
      setSummaries([
        { id: 1, title: 'Tech Newsletter Digest', date: '2024-03-15' },
        { id: 2, title: 'Science Weekly Roundup', date: '2024-03-14' },
        { id: 3, title: 'Business Insider Summary', date: '2024-03-13' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDownloadPDF = (id: number) => {
    // Implement PDF download logic
    console.log(`Downloading PDF for summary ${id}`);
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Newsletter Digest</h1>
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
          <Settings className="mr-2" />
          Manage Preferences
        </button>
      </div>
      {loading ? (
        <div>Loading your summaries...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary) => (
            <div key={summary.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{summary.title}</h3>
              <p className="text-gray-600 mb-4">Date: {summary.date}</p>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <FileText className="mr-1" size={18} />
                  View Summary
                </button>
                <button
                  onClick={() => handleDownloadPDF(summary.id)}
                  className="text-green-600 hover:text-green-800 flex items-center"
                >
                  <Download className="mr-1" size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;