import { preferencesData } from '@/templates/PreferencesForm/preferencesData';
import { StaticImageData } from 'next/image';
import { create } from 'zustand';

type selectOption = {
  value: string;
  label: string;
  id: string;
  imageURL?: string | StaticImageData;
};

interface FormState {
  step: number;
  userType: string;
  firstName: string;
  preferences: string[];
  additionalPreferences: string[];
  email: string;
  otp: string;
  selectedHearAboutUsOptions: string[];

  // Preferences management
  selectedPreferences: Record<string, string[]>;
  preferencesList: typeof preferencesData;
  newPreference: string;
  selectedCategory: string;
  showInput: boolean;

  // Organization Preferences
  organizations: string[];
  selectedOrganizations: string[];
  selectAll: boolean;
  singleSelectedOption: selectOption | null;
  year: string;
  graduated: string;
  // Actions
  setStep: (step: number) => void;
  setUserType: (type: string) => void;
  setFirstName: (name: string) => void;
  setPreferences: (preferences: string[]) => void;
  setAdditionalPreferences: (preferences: string[]) => void;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;

  setShowInput: (show: boolean) => void;
  setNewPreference: (preference: string) => void;
  setSelectedCategory: (category: string) => void;

  handleValueToggle: (title: string, value: string) => void;
  handlePreferenceToggle: (title: string) => void;
  handleAddPreference: () => void;

  // Organization actions
  setOrganizations: (organizations: string[]) => void;
  setSelectedOrganizations: (selected: string[]) => void;
  toggleOrganizationSelection: (organization: string) => void;
  toggleSelectAllOrganizations: () => void;
  toggleHearAboutUsOption: (option: string) => void;

  setSingleSelectedOption: (option: selectOption | null) => void;
  setYear: (year: string) => void;
  setGraduated: (graduated: string) => void;
}

export const useMultiStepForm = create<FormState>(set => ({
  // Initial form state
  step: 1,
  userType: '',
  firstName: '',
  preferences: [],
  additionalPreferences: [],
  email: '',
  otp: '',
  selectedHearAboutUsOptions: [],

  // Initial preferences state
  selectedPreferences: {},
  preferencesList: preferencesData,
  newPreference: '',
  selectedCategory: '',
  showInput: false,

  // Initial organization state
  organizations: [
    'Woman-Led 👩‍✈️',
    'Artificial Intelligence 🤖',
    'Startups 🚀',
    'Disruptors 🧨',
    'Sustainable 🌳',
    'B Corp Certified ♻️',
    'Tech Unicorns 🚀',
    'Social Impact 🌎',
    'Direct-to-Consumer 🛍️',
    'FinTech 💳',
    'Lifestyle 👟',
    'Subscription-Based 🔄',
    'High Growth 📈',
    'Transformation 🦋',
    'Large Enterprise 🚂',
  ],
  selectedOrganizations: [],
  selectAll: false,

  // Form actions
  setStep: step => set({ step }),
  setUserType: type => set({ userType: type }),
  setFirstName: name => set({ firstName: name }),
  setPreferences: preferences => set({ preferences }),
  setAdditionalPreferences: preferences =>
    set({ additionalPreferences: preferences }),
  setOtp: otp => set({ otp }),

  // Preferences actions
  setShowInput: show => set({ showInput: show }),
  setNewPreference: preference => set({ newPreference: preference }),
  setSelectedCategory: category => set({ selectedCategory: category }),

  handleValueToggle: (title, value) =>
    set(state => {
      const currentValues = new Set(state.selectedPreferences[title] || []);
      if (currentValues.has(value)) {
        currentValues.delete(value);
      } else {
        currentValues.add(value);
      }

      return {
        selectedPreferences: {
          ...state.selectedPreferences,
          [title]: Array.from(currentValues),
        },
      };
    }),

  handlePreferenceToggle: title =>
    set(state => {
      const allSelected =
        state.preferencesList.find(p => p.title === title)?.values || [];
      const currentlySelected = new Set(state.selectedPreferences[title] || []);

      return {
        selectedPreferences: {
          ...state.selectedPreferences,
          [title]:
            currentlySelected.size === allSelected.length ? [] : allSelected,
        },
      };
    }),

  handleAddPreference: () =>
    set(state => {
      if (!state.newPreference.trim()) return state;

      const category = state.selectedCategory || 'Custom';
      const updatedPreferences = [...state.preferencesList];
      const existingCategory = updatedPreferences.find(
        p => p.title === category,
      );

      if (existingCategory) {
        if (!existingCategory.values.includes(state.newPreference)) {
          existingCategory.values.push(state.newPreference);
        }
      } else {
        updatedPreferences.push({
          title: category,
          values: [state.newPreference],
        });
      }

      return {
        preferencesList: updatedPreferences,
        selectedPreferences: {
          ...state.selectedPreferences,
          [category]: [
            ...(state.selectedPreferences[category] || []),
            state.newPreference,
          ],
        },
        newPreference: '',
        selectedCategory: '',
        showInput: false,
      };
    }),

  // Organization actions
  setOrganizations: organizations => set({ organizations }),
  setSelectedOrganizations: selected =>
    set({ selectedOrganizations: selected }),

  toggleOrganizationSelection: organization =>
    set(state => ({
      selectedOrganizations: state.selectedOrganizations.includes(organization)
        ? state.selectedOrganizations.filter(item => item !== organization)
        : [...state.selectedOrganizations, organization],
    })),

  toggleSelectAllOrganizations: () =>
    set(state => ({
      selectAll: !state.selectAll,
      selectedOrganizations: state.selectAll ? [] : [...state.organizations],
    })),

  setEmail: email => set({ email }),

  setSelectedHearAboutUsOptions: (selectedOptions: string[]) =>
    set({ selectedHearAboutUsOptions: selectedOptions }), // <-- New action

  toggleHearAboutUsOption: (option: string) =>
    set(state => ({
      selectedHearAboutUsOptions: state.selectedHearAboutUsOptions.includes(
        option,
      )
        ? state.selectedHearAboutUsOptions.filter(item => item !== option)
        : [...state.selectedHearAboutUsOptions, option],
    })),
  singleSelectedOption: null,
  year: '2025',
  graduated: '',
  setSingleSelectedOption: option => set({ singleSelectedOption: option }),
  setYear: year => set({ year }),
  setGraduated: graduated => set({ graduated }),
}));
