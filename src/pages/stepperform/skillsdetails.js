import React, { useState, useEffect } from "react";

export default function SkillsDetails({ formData, setFormData }) {
  const [skills, setSkills] = useState(formData.skills || [""]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    validateSkills(skills);
  }, [skills]);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const validateSkills = (skills) => {
    const newErrors = skills.map(skill =>
      skill.trim() === "" ? "Skill cannot be empty" : ""
    );
    setErrors(newErrors);
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="text-left text-gray-800 text-2xl font-bold mb-6">Skills Details</h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Skills
            </label>

            {skills.map((skill, index) => (
              <div className="flex space-x-6 mb-4" key={index}>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Add Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                  {errors[index] && (
                    <p className="text-red-500 text-xs mt-1 text-left">{errors[index]}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className=" h-[44px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSkill}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
