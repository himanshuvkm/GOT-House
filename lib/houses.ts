export type HouseId = 'stark' | 'lannister' | 'targaryen' | 'tyrell' | 'baratheon' | 'greyjoy';

export type House = {
    id: HouseId;
    name: string;
    quote: string;
    description: string;
    sigil: string;
    colors: {
        primary: string;
        secondary: string;
    };
};

export const houses: Record<HouseId, House> = {
    stark: {
        id: 'stark',
        name: 'House Stark',
        quote: 'Winter is Coming',
        description: 'Honor, loyalty, self-sacrifice, and moral consistency define you.',
        sigil: '/assets/sigils/stark.png',
        colors: { primary: '#F5F5F5', secondary: '#2F4F4F' }
    },
    lannister: {
        id: 'lannister',
        name: 'House Lannister',
        quote: 'A Lannister always pays his debts',
        description: 'You value control, ambition, pragmatism, and power over emotion.',
        sigil: '/assets/sigils/lannister.png',
        colors: { primary: '#D4AF37', secondary: '#8B0000' }
    },
    targaryen: {
        id: 'targaryen',
        name: 'House Targaryen',
        quote: 'Fire and Blood',
        description: 'Destiny, intensity, emotional extremes, and risk-taking drive you.',
        sigil: '/assets/sigils/targaryen.png',
        colors: { primary: '#000000', secondary: '#8B0000' }
    },
    tyrell: {
        id: 'tyrell',
        name: 'House Tyrell',
        quote: 'Growing Strong',
        description: 'Diplomacy, influence, subtle manipulation, and social intelligence.',
        sigil: '/assets/sigils/tyrell.png',
        colors: { primary: '#228B22', secondary: '#D4AF37' }
    },
    baratheon: {
        id: 'baratheon',
        name: 'House Baratheon',
        quote: 'Ours is the Fury',
        description: 'Impulse, strength, boldness, and emotional honesty.',
        sigil: '/assets/sigils/baratheon.png',
        colors: { primary: '#FFD700', secondary: '#000000' }
    },
    greyjoy: {
        id: 'greyjoy',
        name: 'House Greyjoy',
        quote: 'We Do Not Sow',
        description: 'Independence, rebellion, self-reliance, and emotional distance.',
        sigil: '/assets/sigils/greyjoy.png',
        colors: { primary: '#FFD700', secondary: '#000000' } // Placeholder colors
    }
};
