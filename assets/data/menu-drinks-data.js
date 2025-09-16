const drinksMenuData = {
    all: 'all',
    drinks: [
        {
            image: 'assets/img/aguapanela.webp', // URL de la imagen
            emoji: '☕', // Mantener emoji como fallback
            title: 'Agua Panela',
            description: 'Fresh sugar cane juice with lemon.',
            price: '$4.00',
            tags: ['Drinks', 'Lemon']
        },
        {
            image: 'assets/img/limonada.webp',
            emoji: '🧋',
            title: 'Limonada Natural',
            description: 'Freshly squeezed lemonade.',
            price: '5.00',
            tags: ['Drinks', 'lemonade']
        },
        {
            image: 'assets/img/gaseosas.webp',
            emoji: '🥤',
            title: 'Soft Drinks',
            description: 'Colombian Sodas (Bretaña, Colombiana, Manzana, Uva, Piña).',
            price: '$6.00',
            tags: ['Drinks', 'Classic', 'Soda']
        },
        {
            image: 'assets/img/limonada_coco.webp',
            emoji: '🧋',
            title: 'Limonada de Coco',
            description: 'Freshly squeezed lemonade with coconut.',
            price: '8.00',
            tags: ['Drinks', 'Coconut', 'lemonade']
        }
    ]
};

window.drinksMenuData = drinksMenuData;