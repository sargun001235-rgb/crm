import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  storeName: string;
  address: string;
  phone: string;
  gstin: string;
  firstName: string;
  lastName: string;
  updateStoreDetails: (details: Partial<SettingsState>) => void;
  updateProfile: (profile: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storeName: "Amritsar Eyewears",
      address: "123 Visionary Ave, Optic City",
      phone: "+91 98765 43210",
      gstin: "27AADCB2230M1Z2",
      firstName: "Admin",
      lastName: "User",
      updateStoreDetails: (details) => set((state) => ({ ...state, ...details })),
      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
    }),
    {
      name: 'optical-crm-settings', // unique name for localStorage key
    }
  )
);
