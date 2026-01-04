'use client';

import { useCVStore } from '@/lib/store';
import { useState } from 'react';

export default function PersonalInfoForm() {
  const { cvData, setPersonalInfo } = useCVStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cvData.personalInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData({ ...formData, profilePhoto: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, profilePhoto: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Personal Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-slate-700/50 backdrop-blur border border-slate-600 p-6 rounded-lg space-y-4">
          {/* Profile Photo Section */}
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Profile Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              {formData.profilePhoto && (
                <div className="relative">
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="block px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 cursor-pointer text-center font-medium transition"
                >
                  {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                </label>
                <p className="text-xs text-slate-400 mt-2">Recommended: Square image (JPG or PNG)</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g., John Smith"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Location/City</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., New York, NY"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1">City and state or country</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Professional Summary</label>
            <textarea
              name="summary"
              placeholder="Brief overview of your professional background, key skills, and career goals. Example: 'Experienced software developer with 5+ years in full-stack development...'"
              value={formData.summary}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1">Keep it concise (2-3 sentences, under 150 words)</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition text-sm sm:text-base"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData(cvData.personalInfo);
              }}
              className="px-4 sm:px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-700/50 backdrop-blur border border-slate-600 p-6 rounded-lg space-y-4">
          <div className="flex items-start gap-6">
            {cvData.personalInfo.profilePhoto && (
              <img
                src={cvData.personalInfo.profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-3 border-blue-500 flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{cvData.personalInfo.fullName || 'Your Name'}</h3>
              <p className="text-slate-300">{cvData.personalInfo.email}</p>
              <p className="text-slate-300">{cvData.personalInfo.phone}</p>
              <p className="text-slate-300">{cvData.personalInfo.location}</p>
              {cvData.personalInfo.summary && (
                <p className="text-slate-200 mt-4">{cvData.personalInfo.summary}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
