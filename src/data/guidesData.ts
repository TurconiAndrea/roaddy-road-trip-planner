import { TravelGuide } from "@/types/guide";

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: "usa-west-coast-18-days",
    slug: "usa-west-coast-18-days",
    title: {
      en: "USA on the Road",
      it: "USA on the Road",
    },
    subtitle: {
      en: "California, National Parks & Wild West",
      it: "California, grandi parchi e Wild West",
    },
    tagline: {
      en: "18 days. 4,160 km. 4 States. One car. Endless open road ahead.",
      it: "18 giorni. 4.160 km. 4 Stati. Una macchina. E un sacco di strada davanti a noi.",
    },
    featured: true,
    country: {
      en: "United States",
      it: "Stati Uniti",
    },
    countryFlag: "🇺🇸",
    region: {
      en: "West Coast & National Parks",
      it: "West Coast & Grandi Parchi",
    },
    durationDays: 18,
    distanceKm: 4160,
    statesCount: 4,
    statesList: ["California", "Nevada", "Utah", "Arizona"],
    heroImage: "/guides/usa-west-coast.png",
    overviewText: {
      en: [
        "From the waves of California to the glowing neon of Las Vegas, from the giant sequoias of Yosemite to the silent deserts of Death Valley. Then onto Utah and Arizona: canyons, endless highways, Monument Valley, Route 66, and the Grand Canyon.",
        "A journey that transforms every single day, bringing together iconic cities, wild nature, and the very best of American road tripping."
      ],
      it: [
        "Dalle onde della California alle luci di Las Vegas, dai giganti di Yosemite ai deserti della Death Valley. Poi ancora Utah, Arizona, canyon, strade infinite, Monument Valley, Route 66 e il Grand Canyon.",
        "Un viaggio che cambia faccia praticamente ogni giorno e che mette insieme città iconiche, natura selvaggia e il meglio dell'America on the road."
      ]
    },
    highlightsList: {
      en: [
        "Los Angeles",
        "Pacific Coast Highway",
        "San Francisco",
        "Yosemite",
        "Death Valley",
        "Las Vegas",
        "Bryce Canyon",
        "Capitol Reef & Arches",
        "Monument Valley",
        "Antelope Canyon",
        "Grand Canyon",
        "Route 66",
        "Joshua Tree"
      ],
      it: [
        "Los Angeles",
        "Pacific Coast Highway",
        "San Francisco",
        "Yosemite",
        "Death Valley",
        "Las Vegas",
        "Bryce Canyon",
        "Capitol Reef & Arches",
        "Monument Valley",
        "Antelope Canyon",
        "Grand Canyon",
        "Route 66",
        "Joshua Tree"
      ]
    },
    stopsPreview: [
      "Los Angeles",
      "Big Sur",
      "San Francisco",
      "Yosemite",
      "Death Valley",
      "Las Vegas",
      "Bryce Canyon",
      "Arches",
      "Monument Valley",
      "Grand Canyon",
      "Route 66"
    ],
    keyHighlights: [
      {
        title: {
          en: "Pacific Coast Highway & Big Sur",
          it: "Pacific Coast Highway & Big Sur",
        },
        subtitle: {
          en: "Ocean view all the way",
          it: "L'oceano accanto alla strada",
        },
        description: {
          en: "Cliffs soaring above the Pacific Ocean, Bixby Bridge, elephant seals, and postcard-perfect coastal views from LA to San Francisco.",
          it: "Scogliere a picco sul Pacifico, Bixby Bridge, elefanti marini e scorci da cartolina da Los Angeles fino a San Francisco.",
        },
        image: "/guides/usa-west-coast.png",
        tag: {
          en: "California Coast",
          it: "California Coast",
        }
      },
      {
        title: {
          en: "Yosemite National Park",
          it: "Yosemite National Park",
        },
        subtitle: {
          en: "Nature beyond scale",
          it: "Natura fuori scala",
        },
        description: {
          en: "Mariposa Grove and giant sequoias, Yosemite Valley featuring El Capitan and Half Dome, up to the high mountain peaks of Tioga Pass.",
          it: "Mariposa Grove e le sue sequoie gigantesche, la Yosemite Valley con El Capitan e Half Dome, fino alle vette del Tioga Pass.",
        },
        image: "/guides/yosemite.png",
        tag: {
          en: "Nature & Parks",
          it: "Natura & Parchi",
        }
      },
      {
        title: {
          en: "Monument Valley & Wild West",
          it: "Monument Valley & Wild West",
        },
        subtitle: {
          en: "Stepping inside a movie screen",
          it: "Dentro un film americano",
        },
        description: {
          en: "Forrest Gump Point, massive red Mittens sandstone towers, and scenic Navajo dirt tracks in the heart of the desert.",
          it: "Forrest Gump Point, i giganteschi Mittens rossi e le piste sterrate dei Navajos nel cuore del deserto.",
        },
        image: "/guides/monument-valley.png",
        tag: {
          en: "Iconic Wild West",
          it: "Wild West Iconico",
        }
      }
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: {
          en: "Hello, America!",
          it: "Hello, America!",
        },
        subtitle: {
          en: "Landing in Los Angeles & rental car pickup",
          it: "Atterraggio a Los Angeles e ritiro auto",
        },
        location: "Los Angeles",
        icon: "🇺🇸",
        narrative: {
          en: "Here we finally are. We land at LAX, pick up our car, and immediately breathe in that fresh California air. It's only day one, but the feeling is already spot on: this road trip is really happening.",
          it: "Finalmente ci siamo. Atterriamo a Los Angeles, recuperiamo la macchina e iniziamo subito a respirare aria di California. È solo il primo giorno, ma la sensazione è già quella giusta: questa volta il road trip è vero.",
        },
        highlights: {
          en: ["Touchdown at LAX", "Rental car pickup", "First taste of California"],
          it: ["Atterraggio a LAX", "Ritiro auto a noleggio", "Primo assaggio di California"],
        }
      },
      {
        dayNumber: 2,
        title: {
          en: "California Dreaming",
          it: "California Dreaming",
        },
        subtitle: {
          en: "Along the Pacific Coast Highway",
          it: "Lungo la Pacific Coast Highway",
        },
        location: "Pacific Coast Highway",
        icon: "🌊",
        narrative: {
          en: "We leave Los Angeles behind and hit the road. The Pacific Coast Highway guides us along the ocean past Malibu, Santa Barbara, Pismo Beach, Morro Bay, and Cambria. Rugged cliffs, sandy beaches, coastal towns, and the Pacific always right beside us.",
          it: "Lasciamo Los Angeles e ci mettiamo sulla strada. La Pacific Coast Highway ci accompagna lungo l'oceano tra Malibu, Santa Barbara, Pismo Beach, Morro Bay e Cambria. Scogliere, spiagge, piccoli paesi e il Pacifico sempre lì accanto. Il classico panorama da cartolina americana, solo che questa volta siamo noi dentro la cartolina.",
        },
        highlights: {
          en: ["Malibu & Santa Barbara", "Pismo Beach & Morro Bay", "Pacific Ocean coast views"],
          it: ["Malibu & Santa Barbara", "Pismo Beach & Morro Bay", "Panorama sull'Oceano Pacifico"],
        }
      },
      {
        dayNumber: 3,
        title: {
          en: "Big Sur & Bixby Bridge",
          it: "Big Sur & Bixby Bridge",
        },
        subtitle: {
          en: "The best road is the one ahead",
          it: "La strada più bella è quella davanti a noi",
        },
        location: "Big Sur → San Francisco",
        icon: "🐘",
        narrative: {
          en: "The California coastline continues to amaze. We drive through Big Sur, spot wild elephant seals, pause at McWay Falls, and cross the legendary Bixby Bridge. Then Carmel, Monterey, and onward to San Francisco.",
          it: "La costa californiana continua a regalarci spettacolo. Attraversiamo Big Sur, incontriamo gli elefanti marini, ci fermiamo davanti a McWay Falls e attraversiamo il leggendario Bixby Bridge. Poi Carmel, Monterey e ancora strada. Destinazione finale: San Francisco.",
        },
        highlights: {
          en: ["Piedras Blancas Elephant Seals", "McWay Falls", "Iconic Bixby Bridge", "Carmel-by-the-Sea & Monterey"],
          it: ["Elefanti marini a Piedras Blancas", "McWay Falls", "Iconico Bixby Bridge", "Carmel-by-the-Sea & Monterey"],
        }
      },
      {
        dayNumber: 4,
        title: {
          en: "San Francisco",
          it: "San Francisco",
        },
        subtitle: {
          en: "Alcatraz, Golden Gate & skyline",
          it: "Alcatraz, Golden Gate & skyline",
        },
        location: "San Francisco",
        icon: "🌉",
        narrative: {
          en: "Time to explore San Francisco. First, step back in history on Alcatraz Island, then wander through steep city streets, cable cars, and Lombard Street. And then comes the Golden Gate Bridge itself.",
          it: "È tempo di esplorare San Francisco. Prima entriamo nella storia di Alcatraz, poi ci perdiamo tra le strade della città, Lombard Street e i suoi saliscendi infiniti. E naturalmente arriva lui: il Golden Gate. San Francisco è esattamente come ce la aspettavamo. Forse ancora più bella.",
        },
        highlights: {
          en: ["Alcatraz Island Tour", "Lombard Street curviest street", "Golden Gate Bridge at Battery Spencer"],
          it: ["Tour storico di Alcatraz", "Lombard Street", "Golden Gate Bridge & Battery Spencer"],
        }
      },
      {
        dayNumber: 5,
        title: {
          en: "Into the Wild",
          it: "Into the Wild",
        },
        subtitle: {
          en: "From San Francisco towards Sierra Nevada",
          it: "Da San Francisco verso la Sierra Nevada",
        },
        location: "San Francisco → Yosemite",
        icon: "🚗",
        narrative: {
          en: "Saying goodbye to the bay as we head inland. We trade the Pacific coastline for towering mountain ranges. Next stop is one of the main stars of this entire adventure: Yosemite National Park.",
          it: "Salutiamo la città e iniziamo a puntare verso l'interno. Lasciamo il Pacifico alle spalle e ci avviciniamo alle montagne. La prossima tappa è uno dei grandi protagonisti di questo viaggio: Yosemite National Park.",
        },
        highlights: {
          en: ["Coast to mountain transition", "Drive through Gold Country", "Arriving at Yosemite gateway"],
          it: ["Passaggio dalla costa alle montagne", "Guida verso la Sierra Nevada", "Arrivo alle porte di Yosemite"],
        }
      },
      {
        dayNumber: 6,
        title: {
          en: "Yosemite National Park",
          it: "Yosemite National Park",
        },
        subtitle: {
          en: "Giants, granite domes & epic vistas",
          it: "Giganti, montagne e panorami fuori scala",
        },
        location: "Yosemite & Tioga Pass",
        icon: "🌲",
        narrative: {
          en: "Immersed in legendary American wilderness. We start at Mariposa Grove among ancient giant sequoias, enter Yosemite Valley to marvel at El Capitan, Half Dome, and Tunnel View, then drive over scenic Tioga Pass.",
          it: "Una giornata immersi nella natura americana. Partiamo dalle gigantesche sequoie di Mariposa Grove, poi entriamo nella Yosemite Valley, con El Capitan, Half Dome e Tunnel View. Attraversiamo il Tioga Pass e continuiamo verso est, tra montagne e paesaggi alpini.",
        },
        highlights: {
          en: ["Mariposa Grove Giant Sequoias", "El Capitan & Half Dome from Tunnel View", "High alpine Tioga Pass scenic drive"],
          it: ["Sequoie giganti di Mariposa Grove", "El Capitan & Half Dome da Tunnel View", "Strada panoramica del Tioga Pass"],
        }
      },
      {
        dayNumber: 7,
        title: {
          en: "Death Valley → Las Vegas",
          it: "Death Valley → Las Vegas",
        },
        subtitle: {
          en: "From silent desert to the city of lights",
          it: "Dal deserto alla città che non dorme mai",
        },
        location: "Death Valley → Las Vegas",
        icon: "🌵",
        narrative: {
          en: "Early morning start into Death Valley with sand dunes, salt flats, and alien landscapes. Total silence. Then, suddenly, out of the desert darkness emerges Las Vegas: neon lights, giant hotels, and non-stop energy.",
          it: "Si parte presto. La Death Valley ci aspetta con le sue dune, le montagne, i canyon e gli spazi infiniti. Un paesaggio quasi alieno, dove il silenzio sembra occupare tutto. Poi, improvvisamente, cambiamo completamente mondo: nel deserto appare Las Vegas.",
        },
        highlights: {
          en: ["Badwater Basin & Zabriskie Point", "Death Valley Mesquite Flat Sand Dunes", "Evening arrival on Las Vegas Strip"],
          it: ["Badwater Basin & Zabriskie Point", "Dune di sabbia della Death Valley", "Arrivo serale sulle luci di Las Vegas"],
        }
      },
      {
        dayNumber: 8,
        title: {
          en: "Las Vegas",
          it: "Las Vegas",
        },
        subtitle: {
          en: "Everything here is completely over the top",
          it: "Tutto, ma proprio tutto, è esagerato",
        },
        location: "Las Vegas Strip",
        icon: "🎰",
        narrative: {
          en: "No long driving today. We take a full day to experience Las Vegas: Bellagio fountains, themed resort hotels, Venetian gondolas, Eiffel Tower replicas, lights, and fun entertainment in the middle of the desert.",
          it: "Oggi niente grandi trasferimenti. Ci prendiamo una giornata per vivere Las Vegas. Fontane del Bellagio, hotel che sembrano città, canali veneziani, Eiffel Tower, luci e un po' di sana follia. Per qualche ora proveremo a capire come sia possibile costruire tutto questo in mezzo al deserto.",
        },
        highlights: {
          en: ["Walking the Las Vegas Strip", "Bellagio Fountains water show", "Themed hotels & Venetian Canals"],
          it: ["Passeggiata sulla Las Vegas Strip", "Spettacolo delle Fontane del Bellagio", "Hotel tematici & Venetian"],
        }
      },
      {
        dayNumber: 9,
        title: {
          en: "Bryce Canyon",
          it: "Bryce Canyon",
        },
        subtitle: {
          en: "Welcome to Utah",
          it: "Benvenuti nello Utah",
        },
        location: "Valley of Fire → Bryce Canyon",
        icon: "🏜️",
        narrative: {
          en: "Leaving Vegas behind and returning into red rock wilderness. We cross Valley of Fire State Park and cross into Utah to reach Bryce Canyon: thousands of orange hoodoo rock spires carving out a natural amphitheater.",
          it: "Lasciamo Las Vegas e torniamo nel selvaggio West. Attraversiamo la Valley of Fire e arriviamo nello Utah, dove ci aspetta uno dei paesaggi più incredibili del viaggio: Bryce Canyon. Gli hoodoos e le guglie di roccia rendono questo posto unico al mondo.",
        },
        highlights: {
          en: ["Valley of Fire State Park", "Welcome to Utah border", "Bryce Canyon Amphitheater Hoodoos"],
          it: ["Valley of Fire State Park", "Ingresso nello Utah", "Anfiteatro naturale e Hoodoos di Bryce Canyon"],
        }
      },
      {
        dayNumber: 10,
        title: {
          en: "Capitol Reef & Arches",
          it: "Capitol Reef & Arches",
        },
        subtitle: {
          en: "Utah, are you even real?",
          it: "Utah, non hai intenzione di smettere?",
        },
        location: "Scenic Byway 12 → Moab",
        icon: "🪨",
        narrative: {
          en: "Cruising along All-American Scenic Byway 12, one of the most stunning drives in North America. We explore Capitol Reef National Park before continuing to Moab and Arches National Park with Balanced Rock and giant natural stone arches.",
          it: "Oggi attraversiamo la spettacolare Byway 12, una delle strade panoramiche più belle del viaggio. Passiamo da Capitol Reef, tra canyon e formazioni rocciose, e poi continuiamo verso Moab e Arches National Park: Balanced Rock, Windows e giganteschi archi di pietra.",
        },
        highlights: {
          en: ["Driving Scenic Byway 12", "Capitol Reef National Park", "Arches National Park in Moab"],
          it: ["Guida lungo la Scenic Byway 12", "Capitol Reef National Park", "Arches National Park a Moab"],
        }
      },
      {
        dayNumber: 11,
        title: {
          en: "Monument Valley",
          it: "Monument Valley",
        },
        subtitle: {
          en: "Inside a classic Hollywood Western movie",
          it: "Dentro un film americano",
        },
        location: "Moab → Monument Valley",
        icon: "🌅",
        narrative: {
          en: "Driving south from Moab with a stop at Forrest Gump Point: the legendary road view you've seen a thousand times on screen. Then entering Monument Valley with towering red sandstone Mittens and Navajo desert tracks.",
          it: "Lasciamo Moab e puntiamo verso sud. Prima facciamo una sosta a Forrest Gump Point: la strada che conoscete a memoria. Poi arriva uno dei momenti più iconici del viaggio: Monument Valley, le enormi formazioni rocciose dei Mittens e la pista Navajo.",
        },
        highlights: {
          en: ["Forrest Gump Highway Point", "Monument Valley Navajo Tribal Park", "Sunset over the Mittens"],
          it: ["Forrest Gump Point", "Monument Valley Tribal Park", "Tramonto rosso tra i Mittens"],
        }
      },
      {
        dayNumber: 12,
        title: {
          en: "Antelope Canyon & Horseshoe Bend",
          it: "Antelope Canyon & Horseshoe Bend",
        },
        subtitle: {
          en: "The day of impossible photos",
          it: "Il giorno delle foto impossibili",
        },
        location: "Page, Arizona",
        icon: "🌈",
        narrative: {
          en: "Early sunrise over Monument Valley before driving to Page, Arizona. Two world-famous stops await: Horseshoe Bend overlooking the Colorado River, and Antelope Canyon with flowing water-carved slot canyon walls and light beams.",
          it: "Sveglia presto per salutare la Monument Valley con la luce dell'alba. Poi si riparte verso Page. Qui ci aspettano due dei luoghi più incredibili del viaggio: Horseshoe Bend con la curva del Colorado e Antelope Canyon con le sue pareti scolpite e giochi di luce.",
        },
        highlights: {
          en: ["Sunrise at Monument Valley", "Horseshoe Bend Colorado River cliff overlook", "Guided Antelope Slot Canyon tour"],
          it: ["Alba in Monument Valley", "Vista a picco su Horseshoe Bend", "Tour guidato ad Antelope Canyon"],
        }
      },
      {
        dayNumber: 13,
        title: {
          en: "Grand Canyon & Route 66",
          it: "Grand Canyon & Route 66",
        },
        subtitle: {
          en: "Mind-boggling scale. Literally.",
          it: "Una cosa enorme. Letteralmente.",
        },
        location: "Grand Canyon → Route 66",
        icon: "🏔️",
        narrative: {
          en: "Encountering the ultimate landmark of the United States: the Grand Canyon. Standing at the South Rim looking across miles of vast canyon depth. Then rolling onto historic Route 66 through Williams, Seligman, and Hackberry.",
          it: "Oggi incontriamo uno dei simboli assoluti degli Stati Uniti: Grand Canyon. Arriviamo al South Rim e davanti a noi si apre un panorama immenso. Poi si torna sulla strada verso Williams, Seligman e Hackberry per incontrare la leggendaria Route 66.",
        },
        highlights: {
          en: ["Grand Canyon South Rim overlooks", "Historic Williams & Seligman towns", "First stretch on historic Route 66 Mother Road"],
          it: ["Grand Canyon South Rim", "Storica Williams & Seligman", "Primo tratto sulla Mother Road"],
        }
      },
      {
        dayNumber: 14,
        title: {
          en: "Route 66 & Joshua Tree",
          it: "Route 66 & Joshua Tree",
        },
        subtitle: {
          en: "The highway that shaped American history",
          it: "La strada che ha fatto la storia",
        },
        location: "Route 66 → Joshua Tree",
        icon: "🛣️",
        narrative: {
          en: "Vintage neon signs, old gas stations, roadside diners, and wild burros in Oatman. We cross the Mojave Desert and enter Joshua Tree National Park surrounded by surreal trees and desert boulders.",
          it: "Insegne vintage, motel, diner, vecchie stazioni di servizio. Attraversiamo Oatman, incontriamo i suoi asini selvatici e continuiamo attraverso il deserto del Mojave fino a Joshua Tree National Park. E improvvisamente siamo di nuovo in California.",
        },
        highlights: {
          en: ["Oatman ghost town & wild burros", "Mojave Desert driving", "Joshua Tree National Park boulders"],
          it: ["Oatman & gli asini selvatici", "Deserto del Mojave", "Joshua Tree National Park"],
        }
      },
      {
        dayNumber: 15,
        title: {
          en: "Universal Studios Hollywood",
          it: "Universal Studios Hollywood",
        },
        subtitle: {
          en: "Stepping inside the magic of Hollywood cinema",
          it: "Hollywood, questa volta ci entriamo dentro",
        },
        location: "Los Angeles",
        icon: "🎬",
        narrative: {
          en: "After days in wilderness canyons and desert highways, we shift gears into movie magic at Universal Studios Hollywood: studio tours, real movie sets, and blockbusters bringing cinema to life.",
          it: "Dopo giorni di canyon, deserti e parchi nazionali, cambiamo completamente scenario. Oggi si torna nel mondo del cinema con Universal Studios. Attrazioni, set e atmosfera hollywoodiana. Per un giorno niente wilderness, solo magia del cinema.",
        },
        highlights: {
          en: ["Behind the scenes Studio Tour", "The Wizarding World of Harry Potter", "Hollywood movie magic atmosphere"],
          it: ["Studio Tour dietro le quinte", "Attrazioni Wizarding World", "Atmosfera Hollywoodiana"],
        }
      },
      {
        dayNumber: 16,
        title: {
          en: "Los Angeles & Coast",
          it: "Los Angeles & Coast",
        },
        subtitle: {
          en: "California, taking it easy",
          it: "California, prendiamocela comoda",
        },
        location: "Los Angeles",
        icon: "🌴",
        narrative: {
          en: "A relaxing day in LA without long road shifts: Venice Beach, Santa Monica Pier, Venice Canals, The Getty Museum, Echo Park, Little Tokyo, and Rodeo Drive in Beverly Hills.",
          it: "Finalmente una giornata senza grandi trasferimenti. È il momento di vivere Los Angeles con calma: Venice, Santa Monica, Venice Canals, The Getty, Echo Park, Little Tokyo, Rodeo Drive. Palme, oceano e l'energia unica della City of Angels.",
        },
        highlights: {
          en: ["Venice Beach boardwalk & Santa Monica Pier", "Venice Canals stroll", "Rodeo Drive & Beverly Hills"],
          it: ["Venice Beach & Santa Monica Pier", "Venice Canals", "Rodeo Drive & Beverly Hills"],
        }
      },
      {
        dayNumber: 17,
        title: {
          en: "One Last Ride",
          it: "One Last Ride",
        },
        subtitle: {
          en: "The ultimate American evening",
          it: "L'ultimo giorno americano",
        },
        location: "Los Angeles & Anaheim",
        icon: "⚾",
        narrative: {
          en: "Final hours exploring LA neighborhoods, followed by a quintessential American tradition: attending a live Major League Baseball game under stadium lights in Anaheim.",
          it: "Ultime ore per esplorare Los Angeles o concedersi un'ultima deviazione verso la costa. E poi un finale perfettamente americano: si va allo stadio per una serata di baseball ad Anaheim. Perché se dobbiamo chiudere un road trip negli USA, tanto vale farlo come in un film.",
        },
        highlights: {
          en: ["Final LA city neighborhood exploration", "Live Baseball Game experience in Anaheim", "Road trip closing celebration night"],
          it: ["Ultimo giro tra i quartieri di LA", "Partita di Baseball ad Anaheim", "Serata di chiusura del viaggio"],
        }
      },
      {
        dayNumber: 18,
        title: {
          en: "Bye bye, USA",
          it: "Bye bye, USA",
        },
        subtitle: {
          en: "Heading home with lifelong memories",
          it: "Si torna a casa",
        },
        location: "LAX Airport",
        icon: "✈️",
        narrative: {
          en: "Final American morning. One last drive under California palm trees, dropping off the rental car at LAX, and boarding the flight home. The road trip concludes, but the memories stay forever: 'So, when do we leave next?'",
          it: "Ultima mattina americana. Ultimo giro, ultima vista sulle palme, ultimi chilometri. Poi riconsegniamo la macchina e raggiungiamo LAX. Il road trip finisce qui. Ma tra qualche giorno, riguardando le foto, inizieremo probabilmente a pensare: 'Quando si riparte?'",
        },
        highlights: {
          en: ["Rental car drop-off", "Return flight from LAX", "Unforgettable road trip memories"],
          it: ["Riconsegna auto da noleggio", "Volo di rientro da LAX", "Ricordi di un viaggio indimenticabile"],
        }
      }
    ],
    whyThisTrip: {
      progression: "🌊 Ocean → 🌲 Mountains → 🌵 Desert → 🎰 Las Vegas → 🏜️ Canyons → 🌅 Wild West → 🛣️ Route 66 → 🌴 California",
      description: {
        en: "A trip that doesn't just visit America: it drives across it. Built for anyone seeking the true American road trip spirit — car, favorite playlist, open highway, and a completely different horizon every few hours.",
        it: "È un viaggio che non si limita a visitare gli Stati Uniti: li attraversa. Costruito su misura per chi vuole vivere il vero spirito del road trip americano — macchina, playlist preferita, strada aperta e un panorama completamente diverso ogni poche ore.",
      }
    },
    fullGuideFeatures: [
      {
        icon: "🗺️",
        title: {
          en: "Day-by-Day Detailed Itinerary",
          it: "Itinerario Dettagliato Giorno per Giorno",
        },
        description: {
          en: "All daily stops organized with optimal driving schedules and intermediate scenic points.",
          it: "Tutte le tappe organizzate con orari ottimali e tappe intermedie studiate per non perdersi nulla.",
        }
      },
      {
        icon: "🚗",
        title: {
          en: "Driving Times & Route Details",
          it: "Dettagli Trasferimenti & Percorsi",
        },
        description: {
          en: "Precise driving durations, scenic detour recommendations, and driving tips for 4,160 km on the road.",
          it: "Tempi di guida precisi, indicazioni sulle strade panoramiche e gestione dei 4.160 km on the road.",
        }
      },
      {
        icon: "🏜️",
        title: {
          en: "National Parks & Passes Guide",
          it: "Guida ai Parchi Nazionale & Pass",
        },
        description: {
          en: "Complete details for Yosemite, Death Valley, Bryce, Arches, Monument Valley, Antelope, Grand Canyon & America the Beautiful Pass tips.",
          it: "Info complete su Yosemite, Death Valley, Bryce, Arches, Monument Valley, Antelope, Grand Canyon e consigli sul Pass America the Beautiful.",
        }
      },
      {
        icon: "🍔",
        title: {
          en: "Where to Eat: Diners & Food Stops",
          it: "Dove Mangiare: Food Stop & Diner",
        },
        description: {
          en: "Historic Route 66 diners, LA taco trucks, local burger joints, and tested restaurant spots along the entire route.",
          it: "Diner storici lungo la Route 66, food truck di tacos a LA, burger spot locali e ristoranti provati lungo il percorso.",
        }
      },
      {
        icon: "🏨",
        title: {
          en: "Where to Stay: Curated Accommodations",
          it: "Dove Dormire: Alloggi Selezionati",
        },
        description: {
          en: "Iconic roadside motels, park lodges, and hand-picked hotel stays in strategic locations night by night.",
          it: "Motel iconici, lodge dentro i parchi e hotel nelle posizioni più strategicamente provate notte dopo notte.",
        }
      },
      {
        icon: "🎟️",
        title: {
          en: "Advance Reservations & Tickets",
          it: "Prenotazioni & Permessi in Anticipo",
        },
        description: {
          en: "Direct links and practical tips for booking Alcatraz, Antelope Canyon, Universal Studios, and park timed-entry permits.",
          it: "Link diretti e consigli pratici per prenotare Alcatraz, Antelope Canyon, Universal Studios e i permessi di accesso ai parchi.",
        }
      },
      {
        icon: "📍",
        title: {
          en: "Interactive Map & Saved Points",
          it: "Mappa Interattiva & Punti Salvati",
        },
        description: {
          en: "Interactive Google Maps & GPX files ready to download to your phone with categorized pins.",
          it: "Mappa Google Maps / GPX pronte da scaricare sul telefono con tutti i pin salvati divisi per categoria.",
        }
      }
    ],
    priceEur: 2.99,
    originalPriceEur: 19.99
  },
  {
    id: "iceland-ring-road",
    slug: "iceland-ring-road",
    title: {
      en: "Iceland Ring Road",
      it: "Iceland Ring Road",
    },
    subtitle: {
      en: "Waterfalls, volcanoes & fjords on the island of ice and fire",
      it: "Cascate, vulcani e fiordi nell'isola di ghiaccio e fuoco",
    },
    tagline: {
      en: "10 days. 1,332 km. Route 1. Raw nature at every bend.",
      it: "10 giorni. 1.332 km. Strada 1. Natura primordiale ad ogni curva.",
    },
    featured: false,
    isUpcoming: true,
    country: {
      en: "Iceland",
      it: "Islanda",
    },
    countryFlag: "🇮🇸",
    region: {
      en: "Ring Road Circuit",
      it: "Circuito della Ring Road",
    },
    durationDays: 10,
    distanceKm: 1332,
    statesCount: 1,
    statesList: ["Islanda"],
    heroImage: "/landing-preview.png",
    overviewText: {
      en: ["Full island loop along legendary Route 1. Massive waterfalls, black lava beaches, geysers, glaciers, and pristine fjords."],
      it: ["Il giro completo dell'isola lungo la mitica Route 1. Cascate imponenti, spiagge nere di lava, geyser, ghiacciai e fiordi incontaminati."]
    },
    highlightsList: {
      en: ["Reykjavík", "Golden Circle", "Vik Black Beach", "Jökulsárlón", "Myvatn", "East Fjords"],
      it: ["Reykjavík", "Golden Circle", "Spiaggia Nera di Vik", "Jökulsárlón", "Myvatn", "Fiordi dell'Est"]
    },
    stopsPreview: ["Reykjavík", "Vik", "Hafn", "Akureyri"],
    keyHighlights: [],
    itinerary: [],
    whyThisTrip: {
      progression: "🧊 Ice → 🌋 Volcanoes → 🌊 Waterfalls → 🌌 Northern Lights",
      description: {
        en: "A spectacular expedition into raw Arctic nature.",
        it: "Un viaggio spettacolare nella natura pura dell'Atlantico del Nord.",
      }
    },
    fullGuideFeatures: []
  },
  {
    id: "tuscany-hillside-drive",
    slug: "tuscany-hillside-drive",
    title: {
      en: "Tuscany & Val d'Orcia",
      it: "Toscana & Val d'Orcia",
    },
    subtitle: {
      en: "Cypress hills, medieval villages & wine drives",
      it: "Tra colline cipressate, borghi medievali e strade del vino",
    },
    tagline: {
      en: "5 days. 450 km. Chianti, Pienza & Crete Senesi.",
      it: "5 giorni. 450 km. Tra Chianti, Pienza e Crete Senesi.",
    },
    featured: false,
    isUpcoming: true,
    country: {
      en: "Italy",
      it: "Italia",
    },
    countryFlag: "🇮🇹",
    region: {
      en: "Tuscany",
      it: "Toscana",
    },
    durationDays: 5,
    distanceKm: 450,
    statesCount: 1,
    statesList: ["Toscana"],
    heroImage: "/landing-preview.png",
    overviewText: {
      en: ["The iconic Italian road trip through cypress-lined scenic roads, Brunello wine tastings, and timeless hill towns."],
      it: ["Il road trip italiano per eccellenza tra strade panoramiche guidate dai cipressi, degustazioni di Brunello e borghi senza tempo."]
    },
    highlightsList: {
      en: ["Florence", "Chiantigiana", "Siena", "Pienza", "San Quirico d'Orcia", "Montalcino"],
      it: ["Firenze", "Chiantigiana", "Siena", "Pienza", "San Quirico d'Orcia", "Montalcino"]
    },
    stopsPreview: ["Firenze", "Siena", "Val d'Orcia"],
    keyHighlights: [],
    itinerary: [],
    whyThisTrip: {
      progression: "🍷 Vineyards → 🏰 Villages → 🌄 Hills → 🍝 Cuisine",
      description: {
        en: "La dolce vita on four wheels among world-famous hills.",
        it: "La dolce vita su quattro ruote tra le colline più belle del mondo.",
      }
    },
    fullGuideFeatures: []
  }
];

export function getGuideBySlug(slug: string): TravelGuide | undefined {
  return TRAVEL_GUIDES.find(g => g.slug === slug);
}

export function getFeaturedGuide(): TravelGuide {
  return TRAVEL_GUIDES.find(g => g.featured) || TRAVEL_GUIDES[0];
}
