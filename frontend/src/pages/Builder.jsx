import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { PersonalInfoForm } from '@/components/cv-forms/PersonalInfoForm';
import { ExperienceForm } from '@/components/cv-forms/ExperienceForm';
import { EducationForm } from '@/components/cv-forms/EducationForm';
import { SkillsForm } from '@/components/cv-forms/SkillsForm';
import { DesignForm } from '@/components/cv-forms/DesignForm';
import { PreviewComponent } from '@/components/PreviewComponent';

// This wrapper component tracks the form values for the live preview
function LivePreviewWrapper({ control }) {
  const formValues = useWatch({ control });
  return <PreviewComponent data={formValues} />;
}

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://ats-cv-builder.onrender.com/api';

  const methods = useForm({
    defaultValues: {
      profile: {},
      work_experience: [],
      education: [],
    }
  });

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const res = await axios.get(`${apiUrl}/cv/${id}`);
        methods.reset(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch CV', error);
      }
    };
    fetchCv();
  }, [id, navigate, methods]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${apiUrl}/cv/${id}`, data);
      alert('CV saved successfully!');
    } catch (error) {
      console.error('Failed to save CV', error);
      alert('Error saving CV');
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cv/${id}/export/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Europass_CV_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to export PDF', error);
      alert('Error exporting PDF');
    }
  };

  const handleExportXML = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cv/${id}/export/xml`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Europass_CV_${id}.xml`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to export XML', error);
      alert('Error exporting XML');
    }
  };

  if (loading) return <div className="p-8">Loading CV data...</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50">
      {/* Left Pane - Form Editor */}
      <div className="w-1/2 h-full overflow-y-auto border-e border-slate-200 bg-white p-8 custom-scrollbar">
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/90 backdrop-blur pb-4 z-10 border-b border-slate-100">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">CV Editor</h2>
            <p className="text-sm text-slate-500 mt-1">Fill in your details below</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={methods.handleSubmit(onSubmit)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all rounded-full px-6">Save Changes</Button>
            <Button onClick={handleExportPDF} variant="secondary" className="shadow-sm rounded-full">PDF</Button>
            <Button onClick={handleExportXML} variant="outline" className="shadow-sm rounded-full border-slate-300">XML</Button>
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 pb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="font-bold text-xl text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">✦</span>
                Design & Layout
              </h3>
              <DesignForm />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="font-bold text-xl text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Personal Information
              </h3>
              <PersonalInfoForm />
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="font-bold text-xl text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Work Experience
              </h3>
              <ExperienceForm />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="font-bold text-xl text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Education and Training
              </h3>
              <EducationForm />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="font-bold text-xl text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Skills
              </h3>
              <SkillsForm />
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Right Pane - Live Preview */}
      <div className="w-1/2 h-full overflow-y-auto bg-slate-200/50 p-8 flex justify-center custom-scrollbar shadow-inner">
        <LivePreviewWrapper control={methods.control} />
      </div>
    </div>
  );
}
