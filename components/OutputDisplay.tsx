import React from 'react';
import { ContentType, ImageStep } from '../types';
import Loader from './Loader';
import Icon from './Icon';

interface OutputDisplayProps {
  isLoading: boolean;
  loadingMessages: string[];
  error: string | null;
  contentType: ContentType;
  imageStep: ImageStep;
  generatedImage: string | null;
  editedImage: string | null;
  generatedVideo: string | null;
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
  onRefine: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  isLoading,
  loadingMessages,
  error,
  contentType,
  imageStep,
  generatedImage,
  editedImage,
  generatedVideo,
  editPrompt,
  setEditPrompt,
  onRefine,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader messages={loadingMessages} />;
    }

    if (error) {
      return (
        <div className="p-8 bg-red-50 border border-red-300 rounded-lg text-center">
          <h3 className="text-xl font-bold text-red-700">An Error Occurred</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      );
    }

    if (contentType === ContentType.Image) {
      if (imageStep === ImageStep.Editing && generatedImage) {
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 text-center">Step 1: Initial Image Generated</h3>
            <img src={generatedImage} alt="Generated visual" className="rounded-lg shadow-lg mx-auto w-full max-w-2xl" />
            <div className="pt-4 space-y-4">
              <label htmlFor="refine-prompt" className="block text-sm font-medium text-gray-700">
                Step 2: Refine Your Image (Optional)
              </label>
              <input
                type="text"
                id="refine-prompt"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-500"
                placeholder="e.g., 'Add a company logo', 'make the background blue'..."
              />
              <button
                onClick={onRefine}
                disabled={!editPrompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Icon name="sparkles" className="h-5 w-5" />
                Refine Image
              </button>
            </div>
          </div>
        );
      }
      if ((imageStep === ImageStep.Done) && editedImage) {
        return (
          <div className="space-y-4">
             <h3 className="text-xl font-semibold text-gray-900 text-center">Final Result</h3>
            <img src={editedImage} alt="Refined visual" className="rounded-lg shadow-lg mx-auto w-full max-w-2xl" />
          </div>
        );
      }
    }

    if (contentType === ContentType.Video && generatedVideo) {
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Generated Video</h3>
          <video controls src={generatedVideo} className="rounded-lg shadow-lg w-full max-w-2xl mx-auto"></video>
        </div>
      );
    }

    return (
      <div className="text-center text-gray-400 py-16">
        <p>Your generated visual will appear here.</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {renderContent()}
    </div>
  );
};

export default OutputDisplay;