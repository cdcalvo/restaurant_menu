const bakeryMenuData = {
    all: 'all',
    bakery: [
        {
            image: 'assets/img/pandebonos.webp', // URL de la imagen
            emoji: '🌕', // Mantener emoji como fallback
            title: 'Pandebono',
            description: 'Traditional Colombian cheese roll, soft and fluffy, baked to order.',
            price: '5.00',
            tags: ['Bakery', 'Cheese', 'Classic']
        },
        {
            image: 'assets/img/rosca.webp',
            emoji: '🍩',
            title: 'Rosca de Guayaba',
            description: 'Soft baked dough filled with guava jam, perfect for accompanying with coffee or hot chocolate.',
            price: '$3.00',
            tags: ['Bakery', 'Guava']
        },
        {
            image: 'assets/img/milhojas.webp',
            emoji: '🍰',
            title: 'Milhoja Colombiana',
            description: 'Crispy layers of puff pastry filled with smooth pastry cream and a touch of caramel.',
            price: '$8.00',
            tags: ['Bakery', 'Caramel']
        },
        {
            image: 'assets/img/bunuelos.webp',
            emoji: '🟠',
            title: 'Buñuelos',
            description: 'Crispy on the outside and fluffy on the inside, made with fresh cheese and fried in the traditional Colombian style.',
            price: '$2.00',
            tags: ['Bakery', 'Cheese', 'Classic']
        }
    ]
};

window.bakeryMenuData = bakeryMenuData;