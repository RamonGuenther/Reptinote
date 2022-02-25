export const optionsGender = [
    'Weiblich',
    'Männlich',
    'Unbekannt',
];

export const optionsSpecies = [
    'Schlange',
    'Echse',
    'Krokodil',
    'Schildkröte',
    'Amphibie',
    'Gliederfüßer',
    'Sonstiges',
]

export const initialValuesReptile = {
    name: "",
    birthday: "",
    type: "",
    morph: "",
    image: ""
};

export const initialValuesFeeding = {
    type: "",
    weight: "",
}

export const initialValuesBreeder = {
    companyName: '',
    firstName: '',
    lastName: '',
    street: '',
    postal: '',
    place: '',
    country: '',
    email: '',
    phone: ''
}


export const reptilesExample = [
    {
        id: 1,
        name: 'Hubert',
        geburtsdatum: 'NZ20',
        geschlecht: optionsGender[1],
        ordnung: optionsSpecies[0],
        art: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic',
        image: "https://i.ibb.co/T1rggYm/Hubert.png",
        feedings: []
    },
    {
        id: 2,
        name: 'Tifa',
        geburtsdatum: 'NZ21',
        geschlecht: optionsGender[0],
        ordnung: optionsSpecies[0],
        art: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard',
        image: 'https://i.ibb.co/109Gkpr/Tifa.jpg',
        feedings: []
    },
    {
        id: 3,
        name: 'Hektor',
        geburtsdatum: 'NZ21',
        geschlecht: optionsGender[1],
        ordnung: optionsSpecies[0],
        art: 'Boa Constrictor Constrictor',
        morph: 'Classic',
        image: 'https://i.ibb.co/BLnjXz7/Hektor.jpg',
        feedings: []
    },
];

export const feedingExample = [
    {
        food: "Specki XL",
        weight: "300",
        date: new Date().toLocaleDateString()
    },
    {
        food: "Specki XL",
        weight: "300",
        date: new Date().toLocaleDateString()

    },
    {
        food: "Specki XL",
        weight: "300",
        date: new Date().toLocaleDateString()

    },
    {
        food: "Specki XL",
        weight: "300",
        date: new Date().toLocaleDateString()

    },
    {
        food: "Specki XL",
        weight: "300",
        date: new Date().toLocaleDateString()

    },

]

export const weightExample = [
    {
        weight: "300",
        date: new Date().toLocaleDateString()
    },
    {
        weight: "320",
        date: new Date().toLocaleDateString()

    },
    {
        weight: "322",
        date: new Date().toLocaleDateString()

    },
    {
        weight: "322",
        date: new Date().toLocaleDateString()

    },
    {
        weight: "340",
        date: new Date().toLocaleDateString()

    },
]

export const noteExample = [
    {
        note: "Das ist eine Notiz",
        date: new Date().toLocaleDateString()
    },
    {
        note: "Das ist eine Notiz",
        date: new Date().toLocaleDateString()

    },
    {
        note: "Das ist eine Notiz",
        date: new Date().toLocaleDateString()

    },
    {
        note: "Das ist eine Notiz",
        date: new Date().toLocaleDateString()

    },
    {
        note: "Das ist eine Notiz",
        date: new Date().toLocaleDateString()

    },
]



export const breedersExample = [
    {
        companyName: '',
        firstName: 'Unbekannt',
        lastName: '',
        street: '',
        postal: '',
        place: '',
        country: '',
        email: '',
        phone: ''
    },
    {
        companyName: 'Reptifit',
        firstName: 'Wilco',
        lastName: 'van Ee',
        street: '',
        postal: '',
        place: 'Apeldoorn',
        country: 'Niederlande',
        email: 'info@reptifit.nl',
        phone: ''
    },
    {
        companyName: 'R & I',
        firstName: 'Ramon',
        lastName: 'Günther',
        street: '',
        postal: '',
        place: 'Apeldoorn',
        country: 'Niederlande',
        email: 'info@ka.de',
        phone: ''
    },
];