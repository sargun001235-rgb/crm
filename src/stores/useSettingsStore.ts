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
      storeName: "Amritsar Eyeclinic",
      address: "Shahheed Udham Singh Nagar Main Bazar Street No.4",
      phone: "9915930068, 7340710332",
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
