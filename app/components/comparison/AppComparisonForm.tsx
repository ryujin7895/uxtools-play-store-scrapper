import { useState } from "react";

interface AppComparisonFormProps {
  onSubmit: (appIds: string[]) => void;
}

export default function AppComparisonForm({ onSubmit }: AppComparisonFormProps) {
  const [appInputs, setAppInputs] = useState<string[]>(['', '']);
  
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...appInputs];
    newInputs[index] = value;
    setAppInputs(newInputs);
  };
  
  const handleAddInput = () => {
    if (appInputs.length < 5) {
      setAppInputs([...appInputs, '']);
    }
  };
  
  const handleRemoveInput = (index: number) => {
    if (appInputs.length > 2) {
      const newInputs = [...appInputs];
      newInputs.splice(index, 1);
      setAppInputs(newInputs);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validAppIds = appInputs.filter(id => id.trim() !== '');
    if (validAppIds.length >= 2) {
      onSubmit(validAppIds);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {appInputs.map((input, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              <label 
                htmlFor={`app-${index}`} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {index === 0 ? "Your App ID" : `Competitor App ID ${index}`}
              </label>
              <input
                id={`app-${index}`}
                type="text"
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="e.g., com.example.app"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                         placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {index >= 2 && (
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                className="mt-6 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                aria-label="Remove app"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddInput}
          disabled={appInputs.length >= 5}
          className={`inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-md text-sm shadow-sm 
                    ${appInputs.length >= 5 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Another App
        </button>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md shadow-sm text-white 
                   bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Compare Apps
        </button>
      </div>
    </form>
  );
}
