const cocktailsMenuData = {
    all: 'all',
    cocktails: [
        {
            image: 'assets/img/pina_colada.webp', // URL de la imagen
            emoji: '🍹', // Mantener emoji como fallback
            title: 'Piña Colada',
            description: 'White rum liqueur, pineapple juice and coconut cream.',
            price: '20.00',
            tags: ['Cocktails', 'liqueur']
        },
        {
            image: 'assets/img/mojito.webp',
            emoji: '🍹',
            title: 'Mojito',
            description: 'Rum liqueur, sugar and fresh mint leaves.',
            price: '20.00',
            tags: ['Cocktails', 'liqueur']
        },
        {
            image: 'assets/img/margarita.webp', 
            emoji: '🍸',
            title: 'Margarita',
            description: 'Tequila liqueur and freshly-squeezed lime juice.',
            price: '20.00',
            tags: ['Cocktails', 'liqueur']
        },
        {
            image: 'assets/img/michelada.webp', 
            emoji: '🍺',
            title: 'Michelada',
            description: 'Beer, chili-salt blend and freshly-squeezed lime juice.',
            price: '18.00',
            tags: ['Cocktails', 'liqueur']
        }
    ]
};

window.cocktailsMenuData = cocktailsMenuData;