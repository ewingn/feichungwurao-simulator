import React from 'react';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import { Gender, LanguageAbility, BotPreference } from '../types';

interface ProfileCreationProps {
    playerName: string; setPlayerName: (name: string) => void;
    playerGender: Gender; setPlayerGender: (gender: Gender) => void;
    playerAge: string; setPlayerAge: (age: string) => void;
    playerOccupation: string; setPlayerOccupation: (occupation: string) => void;
    playerInterests: string; setPlayerInterests: (interests: string) => void;
    playerPhoto: File | null;
    playerPhotoBase64: string;
    setPlayerPhoto: (file: File | null) => void;
    setPlayerPhotoBase64: (base64: string) => void;
    handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    botPreference: BotPreference; setBotPreference: (preference: BotPreference) => void;
    playerLanguageAbility: LanguageAbility; setPlayerLanguageAbility: (ability: LanguageAbility) => void;
    handlePlayerProfileSubmit: (e: React.FormEvent) => Promise<void>;
    loading: boolean; message: string;
}

const FormInput: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        {children}
    </div>
);

const ProfileCreation: React.FC<ProfileCreationProps> = ({
    playerName, setPlayerName,
    playerGender, setPlayerGender,
    playerAge, setPlayerAge,
    playerOccupation, setPlayerOccupation,
    playerInterests, setPlayerInterests,
    playerPhoto,
    handlePhotoUpload,
    botPreference, setBotPreference,
    playerLanguageAbility, setPlayerLanguageAbility,
    handlePlayerProfileSubmit,
    loading, message
}) => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">Create Your Profile</h2>
            <p className="text-center text-gray-500 mb-8">Tell us a little about yourself to start the show.</p>
            
            <form onSubmit={handlePlayerProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput label="Your Name (姓名)" id="playerName">
                        <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required 
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Zhang Wei"/>
                    </FormInput>
                    <FormInput label="Age (年龄)" id="playerAge">
                        <input type="number" id="playerAge" value={playerAge} onChange={(e) => setPlayerAge(e.target.value)} required min="18"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 28"/>
                    </FormInput>
                    <FormInput label="Your Gender (您的性别)" id="playerGender">
                        <select id="playerGender" value={playerGender} onChange={(e) => setPlayerGender(e.target.value as Gender)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500">
                            <option value="male">Male (男性)</option>
                            <option value="female">Female (女性)</option>
                            <option value="other">Other (其他)</option>
                            <option value="prefer_not_to_say">Prefer not to say (不想说)</option>
                        </select>
                    </FormInput>
                    <FormInput label="Contestant Preference (嘉宾性别偏好)" id="botPreference">
                        <select id="botPreference" value={botPreference} onChange={(e) => setBotPreference(e.target.value as BotPreference)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500">
                            <option value="female">Female (女性)</option>
                            <option value="male">Male (男性)</option>
                            <option value="mixed">Mixed (混合)</option>
                            <option value="other">Other (其他)</option>
                        </select>
                    </FormInput>
                </div>
                
                <FormInput label="Chinese Ability (中文能力)" id="playerLanguageAbility">
                    <select id="playerLanguageAbility" value={playerLanguageAbility} onChange={(e) => setPlayerLanguageAbility(e.target.value as LanguageAbility)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500">
                        <option value="Beginner (HSK 1-2)">Beginner (HSK 1-2)</option>
                        <option value="Intermediate (HSK 3)">Intermediate (HSK 3)</option>
                        <option value="Intermediate High (HSK 4)">Intermediate High (HSK 4)</option>
                        <option value="Advanced (HSK 5+)">Advanced (HSK 5+)</option>
                    </select>
                </FormInput>

                <FormInput label="Occupation (职业)" id="playerOccupation">
                    <input type="text" id="playerOccupation" value={playerOccupation} onChange={(e) => setPlayerOccupation(e.target.value)} required 
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Software Engineer"/>
                </FormInput>

                <FormInput label="Interests (comma-separated 兴趣爱好)" id="playerInterests">
                    <textarea id="playerInterests" value={playerInterests} onChange={(e) => setPlayerInterests(e.target.value)} required 
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 h-24" placeholder="e.g., hiking, cooking, reading..."/>
                </FormInput>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (上传照片)</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="playerPhoto" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="playerPhoto" name="playerPhoto" type="file" className="sr-only" onChange={handlePhotoUpload} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                     {playerPhoto && (
                        <div className="mt-4 flex items-center space-x-3 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                            <ImageIcon size={20} className="text-indigo-500" />
                            <span className="text-gray-700 text-sm font-medium">{playerPhoto.name}</span>
                        </div>
                    )}
                </div>

                <button type="submit" disabled={loading}
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 disabled:opacity-50">
                    {loading ? 'Processing...' : 'Let the Matching Begin!'}
                </button>
            </form>
        </div>
    );
};

export default ProfileCreation;
