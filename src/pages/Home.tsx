import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, FileText, Download } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Newsletter Digest</h1>
      <p className="text-xl mb-8">Get summarized digests of your favorite newsletters, all in one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Mail className="w-12 h-12 text-blue-500" />}
          title="Email Integration"
          description="Connect your Gmail account to automatically fetch newsletters."
        />
        <FeatureCard
          icon={<FileText className="w-12 h-12 text-green-500" />}
          title="Smart Summaries"
          description="AI-powered summaries of your newsletters, saving you time."
        />
        <FeatureCard
          icon={<Download className="w-12 h-12 text-purple-500" />}
          title="PDF Export"
          description="Download your digests as PDFs for offline reading."
        />
      </div>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;