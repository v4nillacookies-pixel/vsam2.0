export type Product = {
  id: string;
  slug: string;
  badge: string;
  brand: string;
  name: string;
  price: string;
  oldPrice?: string;
  savings?: string;
  months: string;
  rating?: string;
  fulfillment: string[];
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDetails = {
  description: string;
  highlights: string[];
  specs: ProductSpec[];
};

export type Promo = {
  title: string;
  date: string;
  href: string;
};

const SALE_DISCOUNT_RATE = 0.6;

export const promos: Promo[] = [
  {
    title: "Aun hay tiempo",
    date: "Del 10 de junio al 2 de julio de 2026.",
    href: "#mas-vendido"
  },
  {
    title: "Juega ahora",
    date: "Del 3 al 30 de junio de 2026.",
    href: "#pantallas"
  },
  {
    title: "Tecnologia para facilitar tu vida",
    date: "Del 17 de junio al 2 de julio de 2026.",
    href: "#computo"
  }
];

export const categories = [
  "Pantallas",
  "Audio",
  "Computo",
  "Celulares",
  "Videojuegos",
  "Casa Inteligente",
  "Instrumentos Musicales",
  "Camaras y Drones",
  "Pilas"
];

export const bestSellers: Product[] = [
  {
    id: "981053043",
    slug: "tablet-lenovo-ideatab-fifa-128-gb-silver",
    badge: "MSI",
    brand: "Lenovo",
    name: "Tablet Lenovo IdeaTab FIFA 128 GB Silver",
    price: "$5,625.47",
    months: "Hasta 15 meses sin intereses",
    rating: "5.0 (1)",
    fulfillment: ["Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981040846",
    slug: "pantalla-hisense-98-qled-4k-google-tv-98qd6n",
    badge: "Ahorra 10% extra",
    brand: "Hisense",
    name: "Pantalla Hisense 98\" QLED 4K Google TV 98QD6N",
    price: "$58,616.86",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981050617",
    slug: "pantalla-tcl-98-qled-google-tv-98q73k",
    badge: "Ahorra 10% extra",
    brand: "TCL",
    name: "Pantalla TCL 98\" QLED Google TV 98Q73K",
    price: "$27,153.49",
    oldPrice: "$30,686.92",
    savings: "Ahorra $3,533.43",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981046322",
    slug: "combo-laptop-gaming-msi-cyborg-a15-ai-16-gb-ram-1-tb-ssd-b2hwekg-220mx-backpack",
    badge: "Rebaja",
    brand: "MSI",
    name: "Combo Laptop Gaming MSI Cyborg A15 AI 16 GB RAM/1 TB SSD + Backpack",
    price: "$20,456.93",
    oldPrice: "$27,619.97",
    savings: "Ahorra $7,163.04",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981046092",
    slug: "laptop-hp-intel-core-3-8-gb-ram-512-gb-ssd-15-fd0331la",
    badge: "Precio en linea",
    brand: "HP",
    name: "Laptop HP Intel Core 3/8 GB RAM/512 GB SSD 15-fd0331la",
    price: "$9,717.48",
    oldPrice: "$12,274.98",
    savings: "Ahorra $2,557.50",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981036710",
    slug: "pantalla-tcl-65-qled-google-tv-65q63k",
    badge: "Ahorra 10% extra",
    brand: "TCL",
    name: "Pantalla TCL 65\" QLED Google TV 65Q63K",
    price: "$8,999.00",
    oldPrice: "$10,740.46",
    savings: "Ahorra $1,741.46",
    months: "Hasta 15 meses sin intereses",
    rating: "2.3 (3)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981022749",
    slug: "pantalla-samsung-55-uhd-smart-tv-crystal-un55du8200fxzx",
    badge: "Ahorra 10% extra",
    brand: "Samsung",
    name: "Pantalla Samsung 55\" UHD Smart TV Crystal UN55DU8200FXZX",
    price: "$13,809.46",
    months: "Hasta 15 meses sin intereses",
    rating: "4.0 (2)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981043717",
    slug: "combo-consola-playstation-5-slim-1-tb-astro-bot-gran-turismo-7",
    badge: "Precio en linea",
    brand: "Playstation 5",
    name: "Combo Consola PlayStation 5 Slim 1 TB + Astro Bot + Gran Turismo 7",
    price: "$11,499.00",
    oldPrice: "$14,320.96",
    savings: "Ahorra $2,821.96",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981050848",
    slug: "audifonos-inalambricos-skullcandy-riff-s5prw-p740",
    badge: "Rebaja",
    brand: "Skullcandy",
    name: "Audifonos Inalambricos Skullcandy Riff S5PRW-P740",
    price: "$766.23",
    oldPrice: "$1,019.92",
    savings: "Ahorra $253.69",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981029659",
    slug: "reloj-inteligente-con-gps-garmin-instinct-2x-solar",
    badge: "Precio en linea",
    brand: "Garmin",
    name: "Reloj Inteligente con GPS Garmin Instinct 2X Solar",
    price: "$6,299.00",
    oldPrice: "$8,998.29",
    savings: "Ahorra $2,699.29",
    months: "Hasta 15 meses sin intereses",
    rating: "5.0 (1)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  }
];

export const tvProducts: Product[] = [
  bestSellers[1],
  {
    id: "981036727",
    slug: "pantalla-lg-75-nanocell-ai-4k-smart-tv-75nano80asa",
    badge: "Ahorra 10% extra",
    brand: "LG",
    name: "Pantalla LG 75\" NanoCell AI 4K Smart TV 75NANO80ASA",
    price: "$12,272.93",
    oldPrice: "$22,198.05",
    savings: "Ahorra $9,925.12",
    months: "Hasta 15 meses sin intereses",
    rating: "5.0 (1)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981047101",
    slug: "pantalla-lg-86-qned-smart-tv-86qned73",
    badge: "Promocion",
    brand: "LG",
    name: "Pantalla LG 86\" QNED Smart TV 86QNED73",
    price: "$20,969.45",
    oldPrice: "$28,847.56",
    savings: "Ahorra $7,878.11",
    months: "Hasta 15 meses sin intereses",
    rating: "1.0 (1)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981046543",
    slug: "pantalla-lg-65-qned-smart-tv-65qned73",
    badge: "Ahorra 10% extra",
    brand: "LG",
    name: "Pantalla LG 65\" QNED Smart TV 65QNED73",
    price: "$11,250.95",
    oldPrice: "$14,423.27",
    savings: "Ahorra $3,172.32",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981041127",
    slug: "smartphone-samsung-galaxy-a17-128-gb-black-desbloqueado",
    badge: "MSI",
    brand: "Samsung",
    name: "Smartphone Samsung Galaxy A17 128 GB Black Desbloqueado",
    price: "$4,088.92",
    months: "Hasta 9 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981042056",
    slug: "smartphone-samsung-galaxy-s25-fe-128-gb-navy-desbloqueado",
    badge: "Rebaja",
    brand: "Samsung",
    name: "Smartphone Samsung Galaxy S25 FE 128 GB Navy Desbloqueado",
    price: "$10,097.01",
    oldPrice: "$14,320.97",
    savings: "Ahorra $4,223.96",
    months: "Hasta 9 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  }
];

export const refrigeratorProducts: Product[] = [
  {
    id: "981018672",
    slug: "refrigerador-samsung-14-pies-cubicos-top-mount",
    badge: "MSI",
    brand: "Samsung",
    name: "Refrigerador Samsung 14 Pies Cubicos Top Mount",
    price: "$9,819.78",
    oldPrice: "$12,273.94",
    savings: "Ahorra $2,454.16",
    months: "Hasta 15 meses sin intereses",
    rating: "3.0 (2)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981018673",
    slug: "refrigerador-samsung-19-pies-cubicos-top-mount-rt53dg6758s9em",
    badge: "Precio en linea",
    brand: "Samsung",
    name: "Refrigerador Samsung 19 Pies Cubicos Top Mount RT53DG6758S9EM",
    price: "$16,366.79",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981012034",
    slug: "refrigerador-samsung-31-5-pies-cubicos-french-door-negro-rf32cg5n10b1em",
    badge: "Rebaja",
    brand: "Samsung",
    name: "Refrigerador Samsung 31.5 Pies Cubicos French Door Negro RF32CG5N10B1EM",
    price: "$42,962.92",
    oldPrice: "$51,548.98",
    savings: "Ahorra $8,586.06",
    months: "Hasta 15 meses sin intereses",
    rating: "2.0 (23)",
    fulfillment: ["Club Pickup"]
  },
  {
    id: "980017937",
    slug: "refrigerador-samsung-27-pies-cubicos-duplex-digital-inverter",
    badge: "Promocion",
    brand: "Samsung",
    name: "Refrigerador Samsung 27 Pies Cubicos Duplex Digital Inverter",
    price: "$27,619.97",
    months: "Hasta 15 meses sin intereses",
    rating: "2.9 (17)",
    fulfillment: ["Envio estandar", "Club Pickup"]
  }
];

export const ryzenDesktopProducts: Product[] = [
  {
    id: "981031336",
    slug: "desktop-hp-all-in-one-amd-ryzen-5-16-gb-ram-512-gb-ssd-27-cr0013la",
    badge: "Rebaja",
    brand: "HP",
    name: "Desktop HP All in One AMD Ryzen 5/16 GB RAM/512 GB SSD 27-cr0013la",
    price: "$10,228.98",
    oldPrice: "$18,409.90",
    savings: "Ahorra $8,180.92",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981040239",
    slug: "combo-desktop-hp-all-in-one-amd-ryzen-5-16-gb-ram-512-gb-ssd-27-cr0252la-impresora",
    badge: "Precio en linea",
    brand: "HP",
    name: "Combo Desktop HP All In One AMD Ryzen 5/16 GB RAM/512 GB SSD 27-cr0252la + Impresora",
    price: "$18,106.08",
    oldPrice: "$21,481.96",
    savings: "Ahorra $3,375.88",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981009078",
    slug: "desktop-de-torre-hp-victus-ryzen-5-8-gb-ram-512-gb-ssd",
    badge: "Gaming",
    brand: "HP",
    name: "Desktop de Torre HP Victus Ryzen 5/8 GB RAM/512 GB SSD",
    price: "$17,899.00",
    oldPrice: "$21,999.00",
    savings: "Ahorra $4,100.00",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup"]
  },
  {
    id: "981037130",
    slug: "desktop-lenovo-ideacentre-amd-ryzen-5-8-gb-ram-256-gb-ssd-aio-3-14ald",
    badge: "MSI",
    brand: "Lenovo",
    name: "Desktop Lenovo Ideacentre AMD Ryzen 5/8 GB RAM/256 GB SSD AIO 3-14ALD",
    price: "$12,786.90",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Club Pickup", "Envio en 24 hrs."]
  },
  {
    id: "981022986",
    slug: "combo-desktop-hp-all-in-one-amd-ryzen-3-8-gb-ram-512-gb-ssd-24-cr0019la-office-365",
    badge: "Combo",
    brand: "HP",
    name: "Combo Desktop HP All in One AMD Ryzen 3/8 GB RAM/512 GB SSD 24-cr0019la + Office 365",
    price: "$13,297.98",
    months: "Hasta 15 meses sin intereses",
    fulfillment: ["Envio estandar", "Club Pickup", "Envio en 24 hrs."]
  }
];

export const wideBanners = [
  {
    id: "pantallas",
    image: "/banners/grita-goool.png",
    title: "Grita Gooool!",
    subtitle: "Vive la emocion en alta Definicion"
  },
  {
    id: "garantia",
    image: "/banners/protege-tecnologia.png",
    title: "Protege tu tecnologia",
    subtitle: "Garantia extendida para tus compras"
  }
];

export function productImage(id: string) {
  return `https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/${id}l.jpg?odnBg=FFFFFF&odnHeight=360&odnWidth=360`;
}

export function bannerImage(image: string) {
  if (image.startsWith("/")) {
    return image;
  }

  return `https://images.samsclubresources.com/is/image/samsclub/${image}?wid=1576&hei=220`;
}

export function productUrl(product: Product) {
  return `/ip/${product.slug}/${product.id}`;
}

export function productSalePriceValue(product: Product) {
  return productMoneyValue(product.price) * (1 - SALE_DISCOUNT_RATE);
}

export function productOriginalPriceValue(product: Product) {
  return productMoneyValue(product.price);
}

export function productSalePrice(product: Product) {
  return formatProductMoney(productSalePriceValue(product));
}

export function productOriginalPrice(product: Product) {
  return product.price;
}

export function productSaleSavings(product: Product) {
  return `Ahorra ${formatProductMoney(productOriginalPriceValue(product) - productSalePriceValue(product))}`;
}

export function allProducts() {
  const productsById = new Map<string, Product>();

  [
    ...bestSellers,
    ...tvProducts,
    ...refrigeratorProducts,
    ...ryzenDesktopProducts
  ].forEach((product) => {
    productsById.set(product.id, product);
  });

  return Array.from(productsById.values());
}

export function findProductById(id: string) {
  return allProducts().find((product) => product.id === id);
}

export function relatedProducts(product: Product, limit = 4) {
  return allProducts()
    .filter((candidate) => candidate.id !== product.id)
    .sort((a, b) => {
      if (a.brand === product.brand && b.brand !== product.brand) {
        return -1;
      }

      if (a.brand !== product.brand && b.brand === product.brand) {
        return 1;
      }

      return 0;
    })
    .slice(0, limit);
}

export function productDetails(product: Product): ProductDetails {
  const lowerName = product.name.toLowerCase();

  if (lowerName.includes("pantalla")) {
    const size = product.name.match(/(\d+)"/)?.[1];
    const panel = getTvPanel(product.name);
    const system = getTvSystem(product.name);

    return {
      description: `${product.name} esta pensada para disfrutar peliculas, deportes y videojuegos con una imagen grande, brillante y facil de configurar. Su formato ${size ? `${size} pulgadas` : "de gran tamano"} ayuda a crear una experiencia de cine en casa, mientras que las opciones de envio y pickup permiten elegir como recibirla.`,
      highlights: [
        `${panel} con colores vivos y buen contraste para contenido diario.`,
        `${system} integrado para acceder rapido a tus apps favoritas.`,
        "Compatible con pagos a meses sin intereses para socios participantes.",
        "Disponible con opciones de entrega y Club Pickup segun tu direccion."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Tamano de pantalla", value: size ? `${size} pulgadas` : "No especificado" },
        { label: "Tecnologia", value: panel },
        { label: "Sistema smart", value: system },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("laptop")) {
    const memory = product.name.match(/(\d+\s?GB RAM)/i)?.[1] ?? "Memoria indicada en el modelo";
    const storage = product.name.match(/(\d+\s?(?:GB|TB) SSD)/i)?.[1] ?? "Almacenamiento SSD";

    return {
      description: `${product.name} combina rendimiento portatil y almacenamiento rapido para trabajo, estudio y entretenimiento. Es una opcion practica para socios que buscan un equipo listo para productividad diaria, videollamadas y navegacion fluida.`,
      highlights: [
        `${memory} para trabajar con varias apps abiertas.`,
        `${storage} para iniciar el sistema y cargar archivos con rapidez.`,
        "Diseno portatil para usar en casa, oficina o escuela.",
        "Puede recibirse por envio estandar, pickup o entrega rapida segun disponibilidad."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Memoria", value: memory },
        { label: "Almacenamiento", value: storage },
        { label: "Uso recomendado", value: lowerName.includes("gaming") ? "Gaming y multitarea" : "Productividad diaria" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("desktop")) {
    const memory = product.name.match(/(\d+\s?GB RAM)/i)?.[1] ?? "Memoria indicada en el modelo";
    const storage = product.name.match(/(\d+\s?(?:GB|TB) SSD)/i)?.[1] ?? "Almacenamiento SSD";
    const processor = product.name.match(/AMD Ryzen\s?\d/i)?.[0] ?? "AMD Ryzen";

    return {
      description: `${product.name} ofrece rendimiento de escritorio para trabajo, estudio, videollamadas y entretenimiento en casa. Su procesador ${processor} combina potencia y eficiencia para manejar tareas diarias con fluidez.`,
      highlights: [
        `${processor} para productividad, navegacion y multitarea.`,
        `${memory} para usar varias aplicaciones al mismo tiempo.`,
        `${storage} para arranque rapido y espacio para archivos importantes.`,
        "Formato de escritorio listo para oficina, escuela o uso familiar."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Procesador", value: processor },
        { label: "Memoria", value: memory },
        { label: "Almacenamiento", value: storage },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("refrigerador")) {
    const capacity = product.name.match(/(\d+(?:\.\d+)?\s?Pies Cubicos)/i)?.[1] ?? "Capacidad indicada en el modelo";
    const format = lowerName.includes("french door")
      ? "French Door"
      : lowerName.includes("duplex")
        ? "Duplex"
        : "Top Mount";

    return {
      description: `${product.name} esta disenado para mantener alimentos y bebidas organizados con una capacidad de ${capacity}. Es una opcion de linea blanca para hogares que buscan espacio, eficiencia y entrega flexible.`,
      highlights: [
        `${capacity} para organizar compras familiares y productos frescos.`,
        `Diseno ${format} con distribucion practica para uso diario.`,
        "Tecnologia Samsung enfocada en conservacion y funcionamiento eficiente.",
        "Disponible con opciones de envio o Club Pickup segun cobertura."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Capacidad", value: capacity },
        { label: "Formato", value: format },
        { label: "Categoria", value: "Linea blanca" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("smartphone")) {
    const storage = product.name.match(/(\d+\s?GB)/i)?.[1] ?? "Almacenamiento indicado en el modelo";

    return {
      description: `${product.name} ofrece una experiencia movil completa para llamadas, redes, fotos y entretenimiento. Su almacenamiento ${storage} ayuda a guardar apps, archivos y contenido diario sin complicaciones.`,
      highlights: [
        `${storage} de almacenamiento para tus apps y fotos.`,
        "Equipo desbloqueado para mayor flexibilidad con tu operador.",
        "Pantalla amplia para navegar, comprar y ver contenido.",
        "Opciones de entrega disponibles segun cobertura."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Almacenamiento", value: storage },
        { label: "Condicion", value: "Desbloqueado" },
        { label: "Categoria", value: "Smartphone" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("tablet")) {
    return {
      description: `${product.name} es una tablet ligera para estudiar, navegar, ver contenido y mantenerse conectado. Su capacidad de 128 GB ofrece espacio para apps, archivos y entretenimiento familiar.`,
      highlights: [
        "128 GB de almacenamiento para contenido y aplicaciones.",
        "Formato comodo para lectura, clases y video.",
        "Ideal para uso familiar o movilidad diaria.",
        "Disponible con Club Pickup y envio rapido segun zona."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Almacenamiento", value: "128 GB" },
        { label: "Color", value: "Silver" },
        { label: "Categoria", value: "Tablet" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("playstation")) {
    return {
      description: `${product.name} reune una consola PlayStation 5 Slim con juegos populares para empezar a jugar desde el primer dia. Es una seleccion pensada para entretenimiento familiar, carreras y aventuras.`,
      highlights: [
        "Consola PS5 Slim con 1 TB de almacenamiento.",
        "Incluye Astro Bot y Gran Turismo 7.",
        "Experiencia de nueva generacion con carga rapida.",
        "Disponible con promociones y opciones de entrega para socios."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Almacenamiento", value: "1 TB" },
        { label: "Incluye", value: "Astro Bot, Gran Turismo 7" },
        { label: "Categoria", value: "Consola" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  if (lowerName.includes("audifonos")) {
    return {
      description: `${product.name} son audifonos inalambricos para escuchar musica, llamadas y contenido diario con libertad de movimiento. Su formato es practico para llevarlos al trabajo, escuela o viajes.`,
      highlights: [
        "Conexion inalambrica para uso cotidiano.",
        "Diseno comodo para sesiones prolongadas.",
        "Buen complemento para laptop, smartphone o tablet.",
        "Disponible con entrega rapida o pickup segun zona."
      ],
      specs: [
        { label: "Marca", value: product.brand },
        { label: "Tipo", value: "Inalambricos" },
        { label: "Modelo", value: "Riff S5PRW-P740" },
        { label: "Categoria", value: "Audio" },
        { label: "Financiamiento", value: product.months },
        { label: "Disponibilidad", value: product.fulfillment.join(", ") }
      ]
    };
  }

  return {
    description: `${product.name} es una opcion de tecnologia seleccionada para socios que buscan precio competitivo, disponibilidad flexible y compra sencilla en linea.`,
    highlights: [
      "Producto seleccionado dentro de electronica y computacion.",
      "Precio de socio y promociones visibles en la ficha.",
      "Opciones de entrega disponibles segun direccion.",
      "Compra rapida desde la pagina de detalle."
    ],
    specs: [
      { label: "Marca", value: product.brand },
      { label: "Categoria", value: "Electronica" },
      { label: "Financiamiento", value: product.months },
      { label: "Disponibilidad", value: product.fulfillment.join(", ") }
    ]
  };
}

function getTvPanel(name: string) {
  if (name.includes("QNED")) {
    return "QNED";
  }

  if (name.includes("QLED")) {
    return "QLED";
  }

  if (name.includes("NanoCell")) {
    return "NanoCell";
  }

  if (name.includes("UHD")) {
    return "UHD";
  }

  return "Smart TV";
}

function getTvSystem(name: string) {
  if (name.includes("Google TV")) {
    return "Google TV";
  }

  if (name.includes("Smart TV")) {
    return "Smart TV";
  }

  return "Sistema smart integrado";
}

function productMoneyValue(value: string) {
  return Number(value.replace(/[$,]/g, ""));
}

function formatProductMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency"
  }).format(value);
}
