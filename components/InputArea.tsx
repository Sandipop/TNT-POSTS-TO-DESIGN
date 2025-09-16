import React from 'react';
import { ContentType } from '../types';
import Icon from './Icon';

interface InputAreaProps {
  postText: string;
  setPostText: (text: string) => void;
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  postText,
  setPostText,
  contentType,
  setContentType,
  youtubeUrl,
  setYoutubeUrl,
  onSubmit,
  isLoading,
}) => {
  const isSubmitDisabled = !postText.trim() || isLoading;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <div>
        <label htmlFor="post-text" className="block text-sm font-medium text-gray-700 mb-2">
          Your LinkedIn Post
        </label>
        <textarea
          id="post-text"
          rows={8}
          className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-500"
          placeholder="Paste your LinkedIn post here to generate a visual..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Visual Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setContentType(ContentType.Image)}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
              contentType === ContentType.Image
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon name="image" className="h-5 w-5"/>
            Image
          </button>
          <button
            onClick={() => setContentType(ContentType.Video)}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
              contentType === ContentType.Video
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon name="video" className="h-5 w-5"/>
            Video
          </button>
        </div>
      </div>

      {contentType === ContentType.Video && (
        <div className="transition-all duration-500">
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Reference (Optional)
          </label>
          <input
            type="url"
            id="youtube-url"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-500"
            placeholder="e.g., https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        <Icon name="sparkles" className="h-5 w-5"/>
        {isLoading ? 'Generating...' : 'Generate Visual'}
      </button>
    </div>
  );
};

export default InputArea;