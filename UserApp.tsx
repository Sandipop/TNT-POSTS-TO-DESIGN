import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import OutputDisplay from './components/OutputDisplay';
import { ContentType, ImageStep } from './types';
import { generateImageFromText, editImage, generateVideo } from './services/geminiService';

interface UserAppProps {
    userEmail: string | null;
    onLogout: () => void;
}

const UserApp: React.FC<UserAppProps> = ({ userEmail, onLogout }) => {
  const [postText, setPostText] = useState<string>('');
  const [contentType, setContentType] = useState<ContentType>(ContentType.Image);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<string[]>(['']);
  const [error, setError] = useState<string | null>(null);
  
  const [imageStep, setImageStep] = useState<ImageStep>(ImageStep.Initial);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const resetOutput = () => {
    setError(null);
    setGeneratedImage(null);
    setEditedImage(null);
    setGeneratedVideo(null);
    setImageStep(ImageStep.Initial);
    setEditPrompt('');
  };

  const handleGenerate = useCallback(async () => {
    resetOutput();
    setIsLoading(true);

    if (contentType === ContentType.Image) {
      setLoadingMessages(['Crafting a prompt...', 'Generating initial image...']);
      try {
        const imageUrl = await generateImageFromText(postText);
        setGeneratedImage(imageUrl);
        setImageStep(ImageStep.Editing);
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred.');
      }
    } else if (contentType === ContentType.Video) {
      setLoadingMessages([
        'Analyzing your post...',
        'Storyboarding the video...',
        'Rendering frames, this can take a few minutes...',
        'Good things are worth the wait!',
        'Almost there...'
      ]);
      try {
        const videoUrl = await generateVideo(postText, youtubeUrl);
        setGeneratedVideo(videoUrl);
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred.');
      }
    }

    setIsLoading(false);
  }, [contentType, postText, youtubeUrl]);

  const handleRefine = useCallback(async () => {
    if (!generatedImage || !editPrompt) return;

    setIsLoading(true);
    setError(null);
    setLoadingMessages(['Applying your edits...', 'Re-imagining the visual...']);

    try {
      const { imageUrl } = await editImage(generatedImage, editPrompt);
      setEditedImage(imageUrl);
      setImageStep(ImageStep.Done);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred during refinement.');
    }
    
    setIsLoading(false);
  }, [generatedImage, editPrompt]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 w-full">
          <Header userEmail={userEmail} onLogout={onLogout} />
          <main className="mt-8">
            <InputArea
              postText={postText}
              setPostText={setPostText}
              contentType={contentType}
              setContentType={(type) => {
                setContentType(type);
                resetOutput();
              }}
              youtubeUrl={youtubeUrl}
              setYoutubeUrl={setYoutubeUrl}
              onSubmit={handleGenerate}
              isLoading={isLoading && imageStep === ImageStep.Initial}
            />

            <OutputDisplay
              isLoading={isLoading}
              loadingMessages={loadingMessages}
              error={error}
              contentType={contentType}
              imageStep={imageStep}
              generatedImage={generatedImage}
              editedImage={editedImage}
              generatedVideo={generatedVideo}
              editPrompt={editPrompt}
              setEditPrompt={setEditPrompt}
              onRefine={handleRefine}
            />
          </main>
          <footer className="text-center text-gray-500 py-8 mt-8">
              <p>Powered by Google Gemini. Built for creators.</p>
          </footer>
        </div>
    </div>
  );
};

export default UserApp;
