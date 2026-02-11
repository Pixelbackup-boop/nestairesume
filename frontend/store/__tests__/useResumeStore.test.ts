import { describe, it, expect, beforeEach } from 'vitest';
import { useResumeStore } from '../useResumeStore';
import type { Experience, Education, Skill, ResumeData } from '../useResumeStore';

// Reset store between tests to avoid state leakage
beforeEach(() => {
  useResumeStore.setState(useResumeStore.getInitialState());
});

describe('useResumeStore', () => {
  describe('initial state', () => {
    it('starts with empty personal info', () => {
      const { resumeData } = useResumeStore.getState();
      expect(resumeData.personalInfo.fullName).toBe('');
      expect(resumeData.personalInfo.email).toBe('');
      expect(resumeData.personalInfo.jobTitle).toBe('');
    });

    it('starts with empty arrays for all sections', () => {
      const { resumeData } = useResumeStore.getState();
      expect(resumeData.experience).toEqual([]);
      expect(resumeData.education).toEqual([]);
      expect(resumeData.skills).toEqual([]);
      expect(resumeData.languages).toEqual([]);
      expect(resumeData.certifications).toEqual([]);
    });

    it('starts with default template and theme', () => {
      const state = useResumeStore.getState();
      expect(state.selectedTemplate).toBe('classic');
      expect(state.selectedTheme).toBe('navy');
      expect(state.selectedTemplateId).toBeNull();
    });

    it('starts with default background settings', () => {
      const { resumeData } = useResumeStore.getState();
      expect(resumeData.background.type).toBe('solid');
      expect(resumeData.background.color).toBe('#ffffff');
      expect(resumeData.background.pattern).toBe('none');
    });
  });

  describe('updatePersonalInfo', () => {
    it('updates a single field', () => {
      useResumeStore.getState().updatePersonalInfo({ fullName: 'Jane Doe' });
      expect(useResumeStore.getState().resumeData.personalInfo.fullName).toBe('Jane Doe');
    });

    it('merges without overwriting other fields', () => {
      const { updatePersonalInfo } = useResumeStore.getState();
      updatePersonalInfo({ fullName: 'Jane Doe', email: 'jane@test.com' });
      updatePersonalInfo({ phone: '555-1234' });

      const { personalInfo } = useResumeStore.getState().resumeData;
      expect(personalInfo.fullName).toBe('Jane Doe');
      expect(personalInfo.email).toBe('jane@test.com');
      expect(personalInfo.phone).toBe('555-1234');
    });
  });

  describe('setResumeData (bulk setter)', () => {
    it('bulk-sets multiple sections', () => {
      const exp: Experience = {
        id: '1', title: 'Dev', company: 'ACME', city: 'NYC',
        country: 'US', startDate: '2020-01', endDate: '2024-01',
        current: false, description: 'Built things',
      };
      useResumeStore.getState().setResumeData({
        experience: [exp],
        personalInfo: { fullName: 'AI User' } as ResumeData['personalInfo'],
      });

      const state = useResumeStore.getState().resumeData;
      expect(state.experience).toHaveLength(1);
      expect(state.personalInfo.fullName).toBe('AI User');
      // Other personal info fields should remain default
      expect(state.personalInfo.email).toBe('');
    });
  });

  describe('experience CRUD', () => {
    const mockExp: Experience = {
      id: 'exp-1', title: 'Engineer', company: 'Tech Co', city: 'SF',
      country: 'US', startDate: '2020-01', endDate: '', current: true,
      description: 'Built stuff',
    };

    it('adds an experience', () => {
      useResumeStore.getState().addExperience(mockExp);
      expect(useResumeStore.getState().resumeData.experience).toHaveLength(1);
      expect(useResumeStore.getState().resumeData.experience[0].title).toBe('Engineer');
    });

    it('updates an experience by id', () => {
      useResumeStore.getState().addExperience(mockExp);
      useResumeStore.getState().updateExperience('exp-1', { title: 'Senior Engineer' });
      expect(useResumeStore.getState().resumeData.experience[0].title).toBe('Senior Engineer');
      expect(useResumeStore.getState().resumeData.experience[0].company).toBe('Tech Co');
    });

    it('removes an experience by id', () => {
      useResumeStore.getState().addExperience(mockExp);
      useResumeStore.getState().addExperience({ ...mockExp, id: 'exp-2', title: 'Designer' });
      useResumeStore.getState().removeExperience('exp-1');

      const exps = useResumeStore.getState().resumeData.experience;
      expect(exps).toHaveLength(1);
      expect(exps[0].id).toBe('exp-2');
    });

    it('moves experience up/down', () => {
      useResumeStore.getState().addExperience({ ...mockExp, id: 'a', title: 'First' });
      useResumeStore.getState().addExperience({ ...mockExp, id: 'b', title: 'Second' });
      useResumeStore.getState().addExperience({ ...mockExp, id: 'c', title: 'Third' });

      // Move "b" up → should swap with "a"
      useResumeStore.getState().moveExperience('b', 'up');
      const afterUp = useResumeStore.getState().resumeData.experience;
      expect(afterUp[0].id).toBe('b');
      expect(afterUp[1].id).toBe('a');
      expect(afterUp[2].id).toBe('c');

      // Move "a" down → should swap with "c"
      useResumeStore.getState().moveExperience('a', 'down');
      const afterDown = useResumeStore.getState().resumeData.experience;
      expect(afterDown[1].id).toBe('c');
      expect(afterDown[2].id).toBe('a');
    });
  });

  describe('education CRUD', () => {
    const mockEdu: Education = {
      id: 'edu-1', school: 'MIT', degree: 'BS CS', city: 'Boston',
      country: 'US', startDate: '2016-09', endDate: '2020-05',
      current: false, description: 'Studied',
    };

    it('adds and removes education', () => {
      useResumeStore.getState().addEducation(mockEdu);
      expect(useResumeStore.getState().resumeData.education).toHaveLength(1);

      useResumeStore.getState().removeEducation('edu-1');
      expect(useResumeStore.getState().resumeData.education).toHaveLength(0);
    });

    it('updates education by id', () => {
      useResumeStore.getState().addEducation(mockEdu);
      useResumeStore.getState().updateEducation('edu-1', { degree: 'MS CS', gpa: '3.9' });

      const edu = useResumeStore.getState().resumeData.education[0];
      expect(edu.degree).toBe('MS CS');
      expect(edu.gpa).toBe('3.9');
      expect(edu.school).toBe('MIT');
    });
  });

  describe('skills CRUD', () => {
    const mockSkill: Skill = { id: 'sk-1', name: 'TypeScript', level: 5 };

    it('adds, updates, and removes skills', () => {
      useResumeStore.getState().addSkill(mockSkill);
      expect(useResumeStore.getState().resumeData.skills).toHaveLength(1);

      useResumeStore.getState().updateSkill('sk-1', { level: 4 });
      expect(useResumeStore.getState().resumeData.skills[0].level).toBe(4);

      useResumeStore.getState().removeSkill('sk-1');
      expect(useResumeStore.getState().resumeData.skills).toHaveLength(0);
    });
  });

  describe('template and theme', () => {
    it('sets template', () => {
      useResumeStore.getState().setTemplate('modern');
      expect(useResumeStore.getState().selectedTemplate).toBe('modern');
    });

    it('sets theme', () => {
      useResumeStore.getState().setTheme('emerald');
      expect(useResumeStore.getState().selectedTheme).toBe('emerald');
    });

    it('sets templateId', () => {
      useResumeStore.getState().setTemplateId('header-dark');
      expect(useResumeStore.getState().selectedTemplateId).toBe('header-dark');
    });

    it('sets custom theme color', () => {
      useResumeStore.getState().setCustomThemeColor('#ff5500');
      expect(useResumeStore.getState().resumeData.customThemeColor).toBe('#ff5500');
    });
  });

  describe('background and fonts', () => {
    it('updates background settings partially', () => {
      useResumeStore.getState().updateBackground({ type: 'gradient', color: '#000' });
      const bg = useResumeStore.getState().resumeData.background;
      expect(bg.type).toBe('gradient');
      expect(bg.color).toBe('#000');
      expect(bg.pattern).toBe('none'); // unchanged
    });

    it('updates font settings partially', () => {
      useResumeStore.getState().updateFonts({ heading: 'Poppins' });
      const fonts = useResumeStore.getState().resumeData.fonts;
      expect(fonts.heading).toBe('Poppins');
      expect(fonts.body).toBe('Inter'); // unchanged
    });
  });

  describe('clearDraft', () => {
    it('resets all data to defaults', () => {
      // Populate some data
      useResumeStore.getState().updatePersonalInfo({ fullName: 'Test User' });
      useResumeStore.getState().addSkill({ id: '1', name: 'JS', level: 5 });
      useResumeStore.getState().setTemplate('modern');

      // Clear
      useResumeStore.getState().clearDraft();

      const state = useResumeStore.getState();
      expect(state.resumeData.personalInfo.fullName).toBe('');
      expect(state.resumeData.skills).toHaveLength(0);
      // Template may or may not reset depending on implementation
    });
  });
});
