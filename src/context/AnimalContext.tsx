
'use client';

import React, { createContext, useState, ReactNode } from 'react';

// --- Tür Tanımları ---

export type Animal = {
    id: string;
    tagNumber: string;
    breed: string;
    birthDate: string;
    gender: 'Erkek' | 'Dişi';
};

export type NewAnimal = Omit<Animal, 'id'>;

export type VaccineRecord = {
    id: string;
    animalId: string;
    vaccine: string;
    scheduledDate: string;
    appliedDate: string | null;
    status: 'Bekleniyor' | 'Gecikti' | 'Yapıldı';
};

export type NewVaccineRecord = {
    animalId: string;
    vaccine: string;
    scheduledDate: string;
};


// --- Başlangıç Verileri ---

const initialAnimals: Animal[] = [
    { id: 'TR-34-1234', tagNumber: 'TR-34-1234', breed: 'Simental', birthDate: '2023-01-15', gender: 'Dişi' },
    { id: 'TR-35-5678', tagNumber: 'TR-35-5678', breed: 'Holstein', birthDate: '2023-03-20', gender: 'Dişi' },
    { id: 'TR-06-9012', tagNumber: 'TR-06-9012', breed: 'Angus', birthDate: '2023-02-10', gender: 'Erkek' },
];

const initialVaccineSchedule: VaccineRecord[] = [
    { id: 'v-1', animalId: 'TR-06-9012', vaccine: 'IBR-BVD-PI3-BRSV (Karma 5)', scheduledDate: '2024-08-15', appliedDate: null, status: 'Bekleniyor' },
    { id: 'v-2', animalId: 'TR-35-5678', vaccine: 'Clostridial (Kara Hastalık)', scheduledDate: '2024-07-12', appliedDate: null, status: 'Gecikti' },
    { id: 'v-3', animalId: 'TR-34-1234', vaccine: 'IBR-BVD-PI3-BRSV (Karma 5)', scheduledDate: '2024-08-10', appliedDate: '2024-08-09', status: 'Yapıldı' },
];


// --- Context Arayüzü ---

interface AnimalContextType {
    animals: Animal[];
    addAnimal: (animal: NewAnimal) => void;
    deleteAnimal: (animalId: string) => void;
    vaccineSchedule: VaccineRecord[];
    addVaccineRecord: (record: NewVaccineRecord) => void;
    updateVaccineRecord: (recordId: string, updates: Partial<VaccineRecord>) => void;
    deleteVaccineRecord: (recordId: string) => void;
}

// --- Context Oluşturma ---

export const AnimalContext = createContext<AnimalContextType>({
    animals: [],
    addAnimal: () => {},
    deleteAnimal: () => {},
    vaccineSchedule: [],
    addVaccineRecord: () => {},
    updateVaccineRecord: () => {},
    deleteVaccineRecord: () => {},
});

// --- Provider Bileşeni ---

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
    const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
    const [vaccineSchedule, setVaccineSchedule] = useState<VaccineRecord[]>(initialVaccineSchedule);

    // --- Hayvan Yönetimi Fonksiyonları ---
    const addAnimal = (animalData: NewAnimal) => {
        const newAnimal: Animal = {
            id: animalData.tagNumber, // Küpe numarasını ID olarak kullanıyoruz
            ...animalData,
        };
        setAnimals(prev => [newAnimal, ...prev]);
    };

    const deleteAnimal = (animalId: string) => {
        setAnimals(prev => prev.filter(animal => animal.id !== animalId));
        // İlgili hayvana ait aşı kayıtlarını da sil
        setVaccineSchedule(prev => prev.filter(record => record.animalId !== animalId));
    };

    // --- Aşı Takvimi Fonksiyonları ---
    const addVaccineRecord = (recordData: NewVaccineRecord) => {
        const newRecord: VaccineRecord = {
            id: `v-${Date.now()}`,
            ...recordData,
            appliedDate: null,
            status: new Date(recordData.scheduledDate) < new Date() ? 'Gecikti' : 'Bekleniyor',
        };
        setVaccineSchedule(prev => [newRecord, ...prev].sort((a,b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()));
    };

    const updateVaccineRecord = (recordId: string, updates: Partial<VaccineRecord>) => {
        setVaccineSchedule(prev => 
            prev.map(record => 
                record.id === recordId ? { ...record, ...updates } : record
            )
        );
    };

    const deleteVaccineRecord = (recordId: string) => {
        setVaccineSchedule(prev => prev.filter(record => record.id !== recordId));
    };
    
    return (
        <AnimalContext.Provider value={{ 
            animals, 
            addAnimal, 
            deleteAnimal,
            vaccineSchedule,
            addVaccineRecord,
            updateVaccineRecord,
            deleteVaccineRecord
        }}>
            {children}
        </AnimalContext.Provider>
    );
};
