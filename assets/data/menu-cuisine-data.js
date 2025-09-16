const cuisineMenuData = {
    all: 'all',
    appetizers: [
        {
            image: 'assets/img/ceviche_chicharron.webp', // URL de la imagen
            emoji: '🧀', // Mantener emoji como fallback
            title: 'Ceviche de Chicharrón',
            description: 'Thinly sliced fried pork belly served with a mix of red onions, sweet peppers, cilantro and lime. Served with a fried arepita.',
            price: '$17.00',
            tags: ['Appetizers', 'Pork']
        },
        {
            image: 'assets/img/patacon_guacamole.webp',
            emoji: '🌮',
            title: 'Patacón con Guacamole y Hogao',
            description: 'Fried green plantains lightly salted served with guacamole and a Colombian sauce made of tomatoes, scallions and butter.',
            price: '$12.00',
            tags: ['Appetizers']
        },
        {
            image: 'assets/img/maduros_crema.webp',
            emoji: '🥗',
            title: 'Maduros con Crema',
            description: 'Sweet plantains with cream and white cheese.',
            price: '$10.20',
            tags: ['Appetizers', 'Classic']
        },
        {
            image: 'assets/img/arepitas_paisas_hogado.webp',
            emoji: '🥗',
            title: 'Arepitas “Paisas” con Guacamole y Hogao',
            description: 'Fried mini Colombian “arepas” with guacamole and a Colombian sauce made of tomatoes, scallions and butter.',
            price: '10.00',
            tags: ['Appetizers', 'Arepas']
        }
    ],
    breakfast: [
        {
            image: 'assets/img/calentado_balcon.webp',
            emoji: '🥩',
            title: 'Calentado El Balcón',
            description: 'Calentado Paisa’ with grilled steak, cuts ‘chicharrón’ (pork belly) and two fried eggs.',
            price: '$20.00',
            tags: ['Breakfast', 'Premium']
        },
        {
            image: 'assets/img/huevos_campesinos.webp',
            emoji: '🍝',
            title: 'Huevos Campesinos',
            description: '3 fried eggs served over pan-fried fresh cheese and bacon, topped with a tomato, onion and portabello sauté.',
            price: '$23.00',
            tags: ['Breakfast', 'Eggs']
        },
        {
            image: 'assets/img/huevos_pericos.webp',
            emoji: '🍳',
            title: 'Huevos Pericos',
            description: 'Scrambled eggs, chopped onions and tomatoes.',
            price: '$18.00',
            tags: ['Breakfast', 'Eggs']
        },
        {
            image: 'assets/img/carne_asada_palomilla.webp',
            emoji: '🥩',
            title: 'Carne Asada (Palomilla)',
            description: 'Grilled steak topped with sautéed onions.',
            price: '$25.00',
            tags: ['Breakfast', 'Steak']
        }
    ],
    lunch: [
        {
            image: 'assets/img/bandeja_paisa.webp',
            emoji: '🥩',
            title: 'Bandeja Paisa',
            description: 'The “paisa” platter combines white rice, red beans, ground beef or top round steak, sweet plantains, fried “chicharrón” (pork belly), ‘arepa’, avocado and a fried egg.',
            price: '$35.00',
            tags: ['Lunch', 'Premium']
        },
        {
            image: 'assets/img/chuleta_calena.webp',
            emoji: '🥩',
            title: 'Chuleta Caleña',
            description: 'A native dish from southwest Colombia famously known as “Valle del Cauca”. Thinly pounded pork tenderloin lightly breaded and fried. Served with white rice, red beans, sweets plantains and salad.',
            price: '$27.00',
            tags: ['Lunch', 'Steak']
        },
        {
            image: 'assets/img/lomo_saltado.webp',
            emoji: '🥩',
            title: 'Lomo Saltado',
            description: 'Tender beef sautéed with onions, tomatoes in a soy sauce marinate. Served with white rice and french fries.',
            price: '$48.000',
            tags: ['Lunch', 'Steak']
        },
        {
            image: 'assets/img/pollo_grill.webp',
            emoji: '🍗',
            title: 'Pollo al Grill',
            description: 'Marinated wood-grilled chicken breast (10oz.), served with white rice, beans and salad.',
            price: '$22.00',
            tags: ['Lunch', 'Steak']
        },
        {
            image: 'assets/img/mojarra.webp',
            emoji: '🐟',
            title: 'Mojarra',
            description: 'A representative dish of Colombian seafood. Whole deep-fried tilapia fish. Served with white rice, green plantains and salad.',
            price: '$48.00',
            tags: ['Lunch', 'Fish']
        }
    ],
    fastFood: [
        {
            image: 'assets/img/pan_bistec.webp',
            emoji: '🥪',
            title: 'Pan con Bistec',
            description: 'Palomilla steak sandwich, grilled with onions, peppers, tomatoes and shoestring potato sticks, put together on a piece of Cuban bread.',
            price: '$17.00',
            tags: ['Fast Food', 'Sandwich']
        },
        {
            image: 'assets/img/hotdog_especial.webp',
            emoji: '🌭',
            title: 'Hotdog Special',
            description: 'Quinoa tricolor, aguacate, tomates cherry, pepino, zanahoria, brotes verdes y vinagreta de limón.',
            price: '$12.00',
            tags: ['Fast Food', 'Hotdog']
        },
        {
            image: 'assets/img/burguer_colombiana.webp',
            emoji: '🍔',
            title: 'Colombian Burger',
            description: '"Colombian-style burger with crispy potato chips, bacon, chorizo, pink sauce, fresh tomato, and lettuce".',
            price: '$20.00',
            tags: ['Fast Food', 'Hamburguer']
        },
        {
            image: 'assets/img/patacon_pollo.webp',
            emoji: '🥪',
            title: 'Patacón con Pollo',
            description: 'Fried green plantains layered with chicken fricassee, melted cheese, topped with fresh tomato salsa.',
            price: '$21.00',
            tags: ['Fast Food', 'Hamburguer']
        }                
    ],
    sides: [
        {
            image: 'assets/img/frijoles_rojos.webp',
            emoji: '🫘',
            title: 'Frijoles Rojos',
            description: 'Colombian red beans.',
            price: '$8.32',
            tags: ['Sides', 'Beans']
        },
        {
            image: 'assets/img/yuca_frita.webp',
            emoji: '🍠',
            title: 'Yuca Frita',
            description: 'Fried yuca.',
            price: '$7.00',
            tags: ['Sides', 'Classic']
        },
        {
            image: 'assets/img/arroz_blanco.webp',
            emoji: '🍚',
            title: 'Arroz Blanco',
            description: 'White rice.',
            price: '$4.00',
            tags: ['Sides', 'Rice']
        },
        {
            image: 'assets/img/pure_papa.webp',
            emoji: '🥔',
            title: 'Puré de Papas',
            description: 'Mashed potatoes.',
            price: '$8.45',
            tags: ['Sides', 'Rice']
        }
    ],
    desserts: [
        {
            image: 'assets/img/flan.webp',
            emoji: '🍰',
            title: 'Flan',
            description: 'Our famously homemade dessert!. Custard dessert with a layer of clear caramel or coconut sauce.',
            price: '9.00',
            tags: ['Desserts', 'Flan']
        },
        {
            image: 'assets/img/tres_leches.webp',
            emoji: '🍮',
            title: 'Tres Leches',
            description: 'Vanilla sponge cake, bathed in a combination of evaporated milk, condensed milk, heavy cream, and topped with whipped chantilly cream topped with a cherry.',
            price: '$12.00',
            tags: ['Desserts', 'Milk']
        },
        {
            image: 'assets/img/molten_chocolate.webp',
            emoji: '🍫',
            title: 'Molten Chocolate',
            description: 'Chocolate cake a molten chocolate center, topped with vanilla ice cream, combines the elements of a flourless chocolate cake and a soufflé!.',
            price: '$12.00',
            tags: ['Desserts', 'Chocalate']
        },
        {
            image: 'assets/img/mousse_maracuya.webp',
            emoji: '🍮',
            title: 'Mousse de Maracuyá',
            description: 'This tropical mousse is deliciously light and creamy. Made with passion fruit, condensed milk, egg whites and sugar.',
            price: '$10.00',
            tags: ['Desserts', 'Passion Fruit']
        }
    ],
    kidsMenu: [
        {
            image: 'assets/img/choripapas.webp',
            emoji: '👑',
            title: 'Choripapitas – Sausages with Fries',
            description: 'Cut of fried Colombian sausages.',
            price: '$20.00',
            tags: ['Kids Menu']
        },
        {
            image: 'assets/img/burguer_kids.webp',
            emoji: '🍾',
            title: 'Hamburguesa - Hamburguer',
            description: 'Traditional children hamburger with a layer of cheese, served with French fries.',
            price: '$22.00',
            tags: ['Kids Menu', 'Hamburguer']
        },
        {
            image: 'assets/img/tiras_pollo.webp',
            emoji: '🍾',
            title: 'Tiritas de Pollo - Chicken Strips',
            description: 'Breaded chicken strips served with French fries.',
            price: '$23.00',
            tags: ['Kids Menu', 'Strips', 'Chicken']
        },
        {
            image: 'assets/img/carne_asada.webp',
            emoji: '🍾',
            title: 'Carne Asada - 1/2 Steak',
            description: 'Children parties of grilled steak served with French fries.',
            price: '$25.00',
            tags: ['Kids Menu', 'Steak']
        }
    ]
};

window.cuisineMenuData = cuisineMenuData;