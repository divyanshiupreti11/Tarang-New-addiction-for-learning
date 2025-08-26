// STEM Quest Learning Platform - JavaScript

// Global game state
let gameState = {
    player: {
        name: '',
        age: 0,
        class: '',
        school: '',
        coins: 0,
        badges: [],
        level: 1,
        achievements: []
    },
    currentGame: null,
    currentQuiz: {
        subject: '',
        questions: [],
        currentQuestion: 0,
        score: 0,
        answers: []
    },
    mathRush: {
        score: 0,
        streak: 0,
        timeLeft: 60,
        timer: null,
        questions: [],
        currentQuestion: 0
    },
    puzzleLab: {
        score: 0,
        currentPuzzle: 0,
        puzzleType: '',
        puzzles: []
    },
    experiments: {
        completed: [],
        currentExperiment: null
    }
};

// Question database from the provided data
const questionDatabase = {
    physics: {
        class8: [
            {
                question: "Which force always opposes motion?",
                options: ["Gravitational force", "Electrostatic force", "Muscular force", "Friction"],
                correct: 3,
                explanation: "Friction is the force that always opposes the relative motion between surfaces."
            },
            {
                question: "Pressure is defined as:",
                options: ["Force per unit area", "Force per square unit area", "Force", "Force per area"],
                correct: 0,
                explanation: "Pressure is the force applied perpendicular to a surface per unit area."
            },
            {
                question: "When equal and opposite forces are applied to an object, they:",
                options: ["May move the object", "Change shape and move object", "May stop moving object", "Do not move object but may change shape"],
                correct: 3,
                explanation: "Balanced forces don't cause motion but can deform the object."
            },
            {
                question: "Why do leaves fall to the ground when detached?",
                options: ["Muscular force", "Magnetic force", "Gravitational force", "Electrostatic force"],
                correct: 2,
                explanation: "Gravitational force pulls objects toward the Earth."
            },
            {
                question: "Which is an example of contact force?",
                options: ["Magnetic force", "Muscular force", "Electrostatic force", "Gravitational force"],
                correct: 1,
                explanation: "Muscular force requires physical contact between objects."
            },
            {
                question: "The SI unit of pressure is:",
                options: ["Newton", "Pascal", "Joule", "Watt"],
                correct: 1,
                explanation: "Pascal (Pa) is the SI unit of pressure, equal to N/m²."
            },
            {
                question: "Atmospheric pressure is measured by:",
                options: ["Manometer", "Barometer", "Thermometer", "Hygrometer"],
                correct: 1,
                explanation: "Barometer is used to measure atmospheric pressure."
            },
            {
                question: "Force can change:",
                options: ["Speed only", "Direction only", "Shape only", "Speed, direction, and shape"],
                correct: 3,
                explanation: "Force can change the speed, direction, and shape of objects."
            },
            {
                question: "The pressure exerted by air around us is called:",
                options: ["Force", "Atmospheric pressure", "Muscular force", "Friction"],
                correct: 1,
                explanation: "Air around us exerts atmospheric pressure."
            },
            {
                question: "Liquids exert pressure:",
                options: ["Only downward", "Only upward", "Only sideways", "In all directions"],
                correct: 3,
                explanation: "Liquids exert pressure equally in all directions."
            }
        ],
        class9: [
            {
                question: "Newton's first law of motion is also known as:",
                options: ["Law of inertia", "Law of acceleration", "Law of action-reaction", "Law of gravitation"],
                correct: 0,
                explanation: "Newton's first law describes inertia - the tendency to maintain state of motion."
            },
            {
                question: "The SI unit of force is:",
                options: ["Dyne", "Newton", "Pound", "Kilogram"],
                correct: 1,
                explanation: "Newton (N) is the SI unit of force."
            },
            {
                question: "According to Newton's second law, F = ma. If mass doubles and acceleration remains same:",
                options: ["Force becomes half", "Force doubles", "Force remains same", "Force becomes four times"],
                correct: 1,
                explanation: "Force is directly proportional to mass when acceleration is constant."
            },
            {
                question: "The gravitational force between two objects depends on:",
                options: ["Their masses only", "Distance only", "Both mass and distance", "Neither mass nor distance"],
                correct: 2,
                explanation: "Gravitational force depends on both masses and the distance between them."
            },
            {
                question: "The acceleration due to gravity on Earth is approximately:",
                options: ["9.8 m/s", "9.8 m/s²", "98 m/s²", "0.98 m/s²"],
                correct: 1,
                explanation: "Acceleration due to gravity is 9.8 meters per second squared."
            },
            {
                question: "An object at rest will remain at rest unless acted upon by:",
                options: ["Balanced forces", "Unbalanced forces", "Gravitational force", "Magnetic force"],
                correct: 1,
                explanation: "Unbalanced forces are needed to change the state of motion."
            },
            {
                question: "The momentum of an object is:",
                options: ["Mass × velocity", "Mass × acceleration", "Force × time", "Mass × distance"],
                correct: 0,
                explanation: "Momentum is the product of mass and velocity."
            },
            {
                question: "When you walk, you push the ground backward. The ground pushes you forward. This is an example of:",
                options: ["Newton's first law", "Newton's second law", "Newton's third law", "Law of gravitation"],
                correct: 2,
                explanation: "This demonstrates action-reaction pairs from Newton's third law."
            },
            {
                question: "The value of universal gravitational constant G is:",
                options: ["6.67 × 10⁻¹¹ N⋅m²/kg²", "6.67 × 10¹¹ N⋅m²/kg²", "9.8 m/s²", "3 × 10⁸ m/s"],
                correct: 0,
                explanation: "G = 6.67 × 10⁻¹¹ N⋅m²/kg² is the universal gravitational constant."
            },
            {
                question: "The motion of a freely falling object is an example of:",
                options: ["Uniform motion", "Non-uniform motion", "Circular motion", "Random motion"],
                correct: 1,
                explanation: "Free fall has constant acceleration, making it non-uniform motion."
            }
        ],
        class10: [
            {
                question: "The power of a lens is measured in:",
                options: ["Meters", "Centimeters", "Diopters", "Watts"],
                correct: 2,
                explanation: "The power of a lens is measured in diopters (D)."
            },
            {
                question: "A convex lens always forms:",
                options: ["Real images", "Virtual images", "Both real and virtual images", "Neither real nor virtual"],
                correct: 2,
                explanation: "Convex lens can form both real and virtual images depending on object position."
            },
            {
                question: "The human eye can focus on objects at different distances due to:",
                options: ["Accommodation", "Refraction", "Reflection", "Dispersion"],
                correct: 0,
                explanation: "Accommodation is the eye's ability to change focal length."
            },
            {
                question: "Myopia can be corrected using:",
                options: ["Convex lens", "Concave lens", "Cylindrical lens", "Plane mirror"],
                correct: 1,
                explanation: "Concave lens is used to correct myopia (near-sightedness)."
            },
            {
                question: "The phenomenon responsible for the blue color of sky is:",
                options: ["Refraction", "Reflection", "Scattering", "Dispersion"],
                correct: 2,
                explanation: "Rayleigh scattering of sunlight causes the sky to appear blue."
            },
            {
                question: "Electric current is the flow of:",
                options: ["Protons", "Neutrons", "Electrons", "Atoms"],
                correct: 2,
                explanation: "Electric current is the flow of electrons through a conductor."
            },
            {
                question: "Ohm's law states that V = IR. If voltage doubles and resistance remains same:",
                options: ["Current becomes half", "Current doubles", "Current remains same", "Current becomes four times"],
                correct: 1,
                explanation: "Current is directly proportional to voltage when resistance is constant."
            },
            {
                question: "The SI unit of electric current is:",
                options: ["Volt", "Ampere", "Ohm", "Watt"],
                correct: 1,
                explanation: "Ampere (A) is the SI unit of electric current."
            },
            {
                question: "A magnetic field is produced around a:",
                options: ["Stationary charge", "Moving charge", "Neutral object", "Insulator"],
                correct: 1,
                explanation: "Moving electric charges produce magnetic fields."
            },
            {
                question: "The frequency of AC supply in India is:",
                options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
                correct: 0,
                explanation: "The frequency of AC supply in India is 50 Hz."
            }
        ]
    },
    chemistry: {
        class8: [
            {
                question: "Which of the following is a physical change?",
                options: ["Burning of paper", "Rusting of iron", "Melting of ice", "Digestion of food"],
                correct: 2,
                explanation: "Melting of ice is a physical change as no new substance is formed."
            },
            {
                question: "The smallest particle of matter that retains its properties is:",
                options: ["Atom", "Molecule", "Ion", "Electron"],
                correct: 1,
                explanation: "Molecule is the smallest particle that retains the properties of matter."
            },
            {
                question: "Which gas is released when metals react with acids?",
                options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
                correct: 2,
                explanation: "Metals react with acids to produce hydrogen gas."
            },
            {
                question: "The process of changing liquid into vapor is called:",
                options: ["Condensation", "Evaporation", "Sublimation", "Freezing"],
                correct: 1,
                explanation: "Evaporation is the process of liquid changing into vapor."
            },
            {
                question: "Which of the following is a mixture?",
                options: ["Water", "Salt", "Air", "Sugar"],
                correct: 2,
                explanation: "Air is a mixture of various gases like nitrogen, oxygen, etc."
            },
            {
                question: "The chemical formula of methane is:",
                options: ["CH₂", "CH₃", "CH₄", "C₂H₆"],
                correct: 2,
                explanation: "Methane has the chemical formula CH₄."
            },
            {
                question: "Which element is essential for combustion?",
                options: ["Nitrogen", "Carbon dioxide", "Oxygen", "Hydrogen"],
                correct: 2,
                explanation: "Oxygen is essential for combustion to occur."
            },
            {
                question: "The pH of pure water is:",
                options: ["6", "7", "8", "9"],
                correct: 1,
                explanation: "Pure water has a neutral pH of 7."
            },
            {
                question: "Which of the following is an acid?",
                options: ["NaOH", "HCl", "NaCl", "CaCO₃"],
                correct: 1,
                explanation: "HCl (Hydrochloric acid) is an acid."
            },
            {
                question: "The process of separating salt from seawater is called:",
                options: ["Filtration", "Distillation", "Decantation", "Evaporation"],
                correct: 1,
                explanation: "Distillation is used to separate salt from seawater."
            }
        ],
        class9: [
            {
                question: "The atomic number of an element represents:",
                options: ["Number of neutrons", "Number of protons", "Number of electrons", "Mass number"],
                correct: 1,
                explanation: "Atomic number equals the number of protons in an atom."
            },
            {
                question: "Which acid is found in vinegar?",
                options: ["Hydrochloric acid", "Acetic acid", "Citric acid", "Formic acid"],
                correct: 1,
                explanation: "Vinegar contains acetic acid (CH₃COOH)."
            },
            {
                question: "The pH range for acids is:",
                options: ["0-7", "7-14", "0-14", "1-6"],
                correct: 0,
                explanation: "Acids have pH values from 0 to less than 7."
            },
            {
                question: "Which base is found in lime water?",
                options: ["NaOH", "Ca(OH)₂", "KOH", "Mg(OH)₂"],
                correct: 1,
                explanation: "Lime water contains calcium hydroxide Ca(OH)₂."
            },
            {
                question: "The chemical formula of caustic soda is:",
                options: ["NaOH", "KOH", "Ca(OH)₂", "NH₄OH"],
                correct: 0,
                explanation: "Caustic soda is sodium hydroxide (NaOH)."
            },
            {
                question: "Universal indicator shows which color in neutral solution?",
                options: ["Red", "Blue", "Green", "Yellow"],
                correct: 2,
                explanation: "Universal indicator shows green color in neutral solutions."
            },
            {
                question: "Which acid is present in our stomach?",
                options: ["Acetic acid", "Hydrochloric acid", "Citric acid", "Lactic acid"],
                correct: 1,
                explanation: "Our stomach contains hydrochloric acid for digestion."
            },
            {
                question: "When an acid reacts with a base, it forms:",
                options: ["Salt only", "Water only", "Salt and water", "Gas only"],
                correct: 2,
                explanation: "Acid-base reactions produce salt and water (neutralization)."
            },
            {
                question: "Which of the following is used to treat acidity?",
                options: ["HCl", "H₂SO₄", "Mg(OH)₂", "CH₃COOH"],
                correct: 2,
                explanation: "Magnesium hydroxide is used as antacid to treat acidity."
            },
            {
                question: "The strength of acid depends on:",
                options: ["Color", "Taste", "H⁺ ion concentration", "Temperature"],
                correct: 2,
                explanation: "Acid strength depends on the concentration of H⁺ ions."
            }
        ],
        class10: [
            {
                question: "The molecular formula of ethane is:",
                options: ["C₂H₄", "C₂H₆", "C₃H₈", "CH₄"],
                correct: 1,
                explanation: "Ethane has the molecular formula C₂H₆."
            },
            {
                question: "Which element exhibits catenation most prominently?",
                options: ["Silicon", "Carbon", "Germanium", "Tin"],
                correct: 1,
                explanation: "Carbon shows maximum catenation due to its tetravalency."
            },
            {
                question: "The functional group present in alcohols is:",
                options: ["-COOH", "-CHO", "-OH", "-NH₂"],
                correct: 2,
                explanation: "Alcohols contain the hydroxyl (-OH) functional group."
            },
            {
                question: "Soaps are sodium or potassium salts of:",
                options: ["Short chain fatty acids", "Long chain fatty acids", "Amino acids", "Carboxylic acids"],
                correct: 1,
                explanation: "Soaps are salts of long chain fatty acids."
            },
            {
                question: "The process of respiration is:",
                options: ["Anabolic", "Catabolic", "Both", "Neither"],
                correct: 1,
                explanation: "Respiration is a catabolic process that breaks down glucose."
            },
            {
                question: "Which metal is most reactive?",
                options: ["Gold", "Silver", "Potassium", "Copper"],
                correct: 2,
                explanation: "Potassium is the most reactive metal among the options."
            },
            {
                question: "The process of obtaining metals from their ores is called:",
                options: ["Metallurgy", "Alloy formation", "Galvanization", "Electroplating"],
                correct: 0,
                explanation: "Metallurgy is the science of extracting metals from ores."
            },
            {
                question: "Which gas is produced when zinc reacts with hydrochloric acid?",
                options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
                correct: 1,
                explanation: "Zinc reacts with HCl to produce hydrogen gas."
            },
            {
                question: "The chemical name of baking soda is:",
                options: ["Sodium carbonate", "Sodium bicarbonate", "Calcium carbonate", "Potassium carbonate"],
                correct: 1,
                explanation: "Baking soda is sodium bicarbonate (NaHCO₃)."
            },
            {
                question: "Which element is used in making semiconductors?",
                options: ["Carbon", "Silicon", "Sulfur", "Phosphorus"],
                correct: 1,
                explanation: "Silicon is widely used in making semiconductors."
            }
        ]
    },
    mathematics: {
        class8: [
            {
                question: "The value of (-3)² is:",
                options: ["-9", "9", "-6", "6"],
                correct: 1,
                explanation: "(-3)² = (-3) × (-3) = 9"
            },
            {
                question: "Which of the following is a rational number?",
                options: ["√2", "π", "3/7", "√5"],
                correct: 2,
                explanation: "3/7 can be expressed as p/q where p and q are integers."
            },
            {
                question: "The cube root of 125 is:",
                options: ["5", "25", "15", "35"],
                correct: 0,
                explanation: "∛125 = 5 because 5³ = 125"
            },
            {
                question: "If 2x + 3 = 11, then x = ?",
                options: ["3", "4", "5", "6"],
                correct: 1,
                explanation: "2x + 3 = 11 → 2x = 8 → x = 4"
            },
            {
                question: "The area of a square with side 6 cm is:",
                options: ["24 cm²", "36 cm²", "12 cm²", "30 cm²"],
                correct: 1,
                explanation: "Area of square = side² = 6² = 36 cm²"
            },
            {
                question: "The sum of interior angles of a triangle is:",
                options: ["90°", "180°", "270°", "360°"],
                correct: 1,
                explanation: "The sum of interior angles of any triangle is always 180°."
            },
            {
                question: "If a = 2 and b = 3, then a² + b² = ?",
                options: ["13", "12", "25", "5"],
                correct: 0,
                explanation: "a² + b² = 2² + 3² = 4 + 9 = 13"
            },
            {
                question: "The volume of a cube with side 4 cm is:",
                options: ["16 cm³", "48 cm³", "64 cm³", "12 cm³"],
                correct: 2,
                explanation: "Volume of cube = side³ = 4³ = 64 cm³"
            },
            {
                question: "0.25 expressed as a fraction in simplest form is:",
                options: ["1/4", "1/2", "2/8", "25/100"],
                correct: 0,
                explanation: "0.25 = 25/100 = 1/4 in simplest form"
            },
            {
                question: "The multiplicative identity element is:",
                options: ["0", "1", "-1", "∞"],
                correct: 1,
                explanation: "1 is the multiplicative identity as a × 1 = a for any number a."
            }
        ],
        class9: [
            {
                question: "√144 = ?",
                options: ["12", "14", "16", "10"],
                correct: 0,
                explanation: "√144 = 12 because 12² = 144"
            },
            {
                question: "If x + 5 = 12, then x = ?",
                options: ["7", "8", "17", "5"],
                correct: 0,
                explanation: "x + 5 = 12 → x = 12 - 5 = 7"
            },
            {
                question: "The degree of polynomial 3x² + 2x + 1 is:",
                options: ["1", "2", "3", "0"],
                correct: 1,
                explanation: "The highest power of x is 2, so the degree is 2."
            },
            {
                question: "The coordinates of origin are:",
                options: ["(1,0)", "(0,1)", "(0,0)", "(1,1)"],
                correct: 2,
                explanation: "Origin is the point where x-axis and y-axis intersect, i.e., (0,0)."
            },
            {
                question: "In which quadrant does the point (-3, 4) lie?",
                options: ["I", "II", "III", "IV"],
                correct: 1,
                explanation: "Point (-3, 4) has negative x and positive y, so it lies in Quadrant II."
            },
            {
                question: "The area of a triangle with base 8 cm and height 5 cm is:",
                options: ["40 cm²", "20 cm²", "13 cm²", "80 cm²"],
                correct: 1,
                explanation: "Area = ½ × base × height = ½ × 8 × 5 = 20 cm²"
            },
            {
                question: "If a² - b² = 24 and a + b = 8, then a - b = ?",
                options: ["3", "4", "6", "2"],
                correct: 0,
                explanation: "a² - b² = (a+b)(a-b) → 24 = 8(a-b) → a-b = 3"
            },
            {
                question: "The surface area of a sphere with radius r is:",
                options: ["4πr²", "πr²", "2πr²", "πr³"],
                correct: 0,
                explanation: "Surface area of sphere = 4πr²"
            },
            {
                question: "Heron's formula is used to find:",
                options: ["Perimeter of triangle", "Area of triangle", "Volume of triangle", "Angles of triangle"],
                correct: 1,
                explanation: "Heron's formula calculates area of triangle using all three sides."
            },
            {
                question: "The median of 3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29 is:",
                options: ["23", "20", "25", "39"],
                correct: 0,
                explanation: "When arranged in order, the middle value (8th position) is 23."
            }
        ],
        class10: [
            {
                question: "For the quadratic equation ax² + bx + c = 0, the discriminant is:",
                options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "b² - ac"],
                correct: 0,
                explanation: "Discriminant Δ = b² - 4ac determines nature of roots."
            },
            {
                question: "If the discriminant of a quadratic equation is zero, the roots are:",
                options: ["Real and distinct", "Real and equal", "Complex", "Irrational"],
                correct: 1,
                explanation: "When Δ = 0, the quadratic has two equal real roots."
            },
            {
                question: "The arithmetic progression 2, 5, 8, 11, ... has common difference:",
                options: ["2", "3", "4", "5"],
                correct: 1,
                explanation: "Common difference = 5 - 2 = 8 - 5 = 3"
            },
            {
                question: "The nth term of AP with first term 'a' and common difference 'd' is:",
                options: ["a + nd", "a + (n-1)d", "a + (n+1)d", "nd + a"],
                correct: 1,
                explanation: "nth term of AP = a + (n-1)d"
            },
            {
                question: "In a right triangle, if one acute angle is 30°, the other acute angle is:",
                options: ["30°", "45°", "60°", "90°"],
                correct: 2,
                explanation: "Sum of angles in triangle = 180°. So 90° + 30° + ? = 180° → ? = 60°"
            },
            {
                question: "sin² θ + cos² θ = ?",
                options: ["0", "1", "2", "sin θ cos θ"],
                correct: 1,
                explanation: "This is the fundamental trigonometric identity: sin² θ + cos² θ = 1"
            },
            {
                question: "The distance between points (0,0) and (3,4) is:",
                options: ["5", "7", "3", "4"],
                correct: 0,
                explanation: "Distance = √[(3-0)² + (4-0)²] = √[9+16] = √25 = 5"
            },
            {
                question: "The area of a circle with radius 7 cm is:",
                options: ["44 cm²", "154 cm²", "22 cm²", "77 cm²"],
                correct: 1,
                explanation: "Area = πr² = (22/7) × 7² = 22 × 7 = 154 cm²"
            },
            {
                question: "If tan θ = 1, then θ = ?",
                options: ["30°", "45°", "60°", "90°"],
                correct: 1,
                explanation: "tan 45° = 1"
            },
            {
                question: "The probability of getting a head in a single coin toss is:",
                options: ["0", "1/4", "1/2", "1"],
                correct: 2,
                explanation: "There are 2 equally likely outcomes (H,T), so P(H) = 1/2"
            }
        ]
    }
};

// Achievements database
const achievements = [
    {name: "First Steps", description: "Complete your first quiz", icon: "🎯", threshold: 1},
    {name: "Quick Learner", description: "Answer 10 questions correctly", icon: "⚡", threshold: 10},
    {name: "Speed Demon", description: "Complete Math Rush in under 2 minutes", icon: "🏃", threshold: 1},
    {name: "Science Explorer", description: "Complete 5 experiments", icon: "🔬", threshold: 5},
    {name: "Problem Solver", description: "Solve 10 logic puzzles", icon: "🧩", threshold: 10},
    {name: "Knowledge Master", description: "Score 100% in any quiz", icon: "👑", threshold: 1}
];

// Experiments database
const experiments = [
    {
        name: "Chemical Reaction",
        description: "Mix baking soda and vinegar",
        materials: ["Baking Soda", "Vinegar", "Test Tube"],
        result: "Fizzing reaction produces CO₂ gas!",
        coins: 25,
        icon: "🧪"
    },
    {
        name: "Circuit Building", 
        description: "Create a simple electric circuit",
        materials: ["Battery", "Wire", "Light Bulb"],
        result: "⚡ Bulb Lights Up! You completed the circuit!",
        coins: 30,
        icon: "💡"
    },
    {
        name: "Density Test",
        description: "Test density of different liquids",
        materials: ["Oil", "Water", "Honey", "Beaker"],
        result: "Layers form based on density - honey sinks, oil floats!",
        coins: 20,
        icon: "🥤"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing application...');
    
    // Show login page by default
    showPage('loginPage');
    
    // Setup event listeners with error handling
    try {
        setupEventListeners();
        console.log('Event listeners set up successfully');
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
    
    // Initialize drag and drop for science explorer
    initializeDragAndDrop();
    
    // Contest timer update
    updateContestTimer();
    setInterval(updateContestTimer, 1000);
}

function setupEventListeners() {
    // Login form - enhanced error handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            console.log('Login form submitted');
            handleLogin(e);
        });
        
        // Also add click handler to submit button as backup
        const submitButton = loginForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                console.log('Submit button clicked');
                // Let the form submit handler take care of it
            });
        }
    } else {
        console.error('Login form not found');
    }
    
    // Ensure all form inputs are properly enabled
    const formInputs = document.querySelectorAll('#loginForm input, #loginForm select');
    formInputs.forEach(input => {
        input.style.pointerEvents = 'auto';
        input.disabled = false;
        
        // Add focus event handlers to ensure inputs work
        input.addEventListener('focus', function() {
            console.log('Input focused:', input.id);
        });
        
        input.addEventListener('change', function() {
            console.log('Input changed:', input.id, input.value);
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin called');
    
    try {
        const name = document.getElementById('playerName').value?.trim() || '';
        const age = parseInt(document.getElementById('playerAge').value) || 0;
        const playerClass = document.getElementById('playerClass').value || '';
        const school = document.getElementById('schoolName').value?.trim() || '';
        
        console.log('Form values:', { name, age, playerClass, school });
        
        if (!name || !age || !playerClass || !school) {
            alert('Please fill in all fields!');
            return;
        }
        
        if (age < 10 || age > 20) {
            alert('Please enter a valid age between 10 and 20!');
            return;
        }
        
        // Store player data
        gameState.player = {
            name,
            age,
            class: playerClass,
            school,
            coins: 100, // Starting coins
            badges: [],
            level: 1,
            achievements: []
        };
        
        console.log('Player data stored:', gameState.player);
        
        // Update dashboard with player data
        updateDashboard();
        
        // Show dashboard
        showPage('dashboardPage');
        
    } catch (error) {
        console.error('Error in handleLogin:', error);
        alert('An error occurred during login. Please try again.');
    }
}

function updateDashboard() {
    const player = gameState.player;
    console.log('Updating dashboard for player:', player.name);
    
    try {
        // Update player info
        const nameElement = document.getElementById('playerDisplayName');
        if (nameElement) nameElement.textContent = player.name;
        
        const infoElement = document.getElementById('playerInfo');
        if (infoElement) infoElement.textContent = `Class ${player.class} • Age ${player.age}`;
        
        // Update stats
        const coinsElement = document.getElementById('totalCoins');
        if (coinsElement) coinsElement.textContent = player.coins;
        
        const badgesElement = document.getElementById('totalBadges');
        if (badgesElement) badgesElement.textContent = player.badges.length;
        
        const levelElement = document.getElementById('totalLevel');
        if (levelElement) levelElement.textContent = player.level;
        
        // Update coin displays in all games
        const coinElements = ['quizCoins', 'rushCoins', 'explorerCoins', 'puzzleCoins', 'contestCoins'];
        coinElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = player.coins;
        });
        
        // Update achievements display
        updateAchievementsDisplay();
        
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

function updateAchievementsDisplay() {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) return;
    
    achievementsList.innerHTML = '';
    
    // Show earned achievements
    gameState.player.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
            </div>
        `;
        achievementsList.appendChild(achievementCard);
    });
    
    // If no achievements, show placeholder
    if (gameState.player.achievements.length === 0) {
        achievementsList.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center;">Complete activities to earn achievements!</p>';
    }
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    try {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log('Page shown successfully:', pageId);
        } else {
            console.error('Page not found:', pageId);
        }
        
        // Update current game state
        gameState.currentGame = pageId;
        
    } catch (error) {
        console.error('Error showing page:', error);
    }
}

function showGame(gameId) {
    console.log('Showing game:', gameId);
    
    const gamePages = {
        'quizQuest': 'quizQuestPage',
        'puzzleLab': 'puzzleLabPage',
        'scienceExplorer': 'scienceExplorerPage',
        'mathRush': 'mathRushPage',
        'contestArena': 'contestArenaPage'
    };
    
    if (gamePages[gameId]) {
        showPage(gamePages[gameId]);
        
        // Initialize specific game content
        if (gameId === 'scienceExplorer') {
            initializeScienceExplorer();
        }
    } else {
        console.error('Unknown game ID:', gameId);
    }
}

// Quiz Quest Functions
function startQuiz(subject) {
    console.log('Starting quiz for subject:', subject);
    
    const playerClass = gameState.player.class;
    const questions = questionDatabase[subject][`class${playerClass}`];
    
    if (!questions) {
        alert('Questions not available for your class level!');
        return;
    }
    
    // Shuffle questions and take 10
    const shuffledQuestions = shuffleArray([...questions]).slice(0, 10);
    
    gameState.currentQuiz = {
        subject,
        questions: shuffledQuestions,
        currentQuestion: 0,
        score: 0,
        answers: []
    };
    
    // Hide island selection, show quiz
    document.getElementById('islandSelection').classList.add('hidden');
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('quizFeedback').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    
    displayQuestion();
}

function displayQuestion() {
    const quiz = gameState.currentQuiz;
    const question = quiz.questions[quiz.currentQuestion];
    
    // Update progress
    const progress = ((quiz.currentQuestion + 1) / quiz.questions.length) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('questionNumber').textContent = `Question ${quiz.currentQuestion + 1} of ${quiz.questions.length}`;
    document.getElementById('quizScore').textContent = quiz.score;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectAnswer(index);
        optionsGrid.appendChild(optionBtn);
    });
}

function selectAnswer(selectedIndex) {
    const quiz = gameState.currentQuiz;
    const question = quiz.questions[quiz.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // Store answer
    quiz.answers[quiz.currentQuestion] = selectedIndex;
    
    // Update score
    if (isCorrect) {
        quiz.score += 10;
        gameState.player.coins += 5;
    }
    
    // Visual feedback
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    setTimeout(() => {
        showQuizFeedback(isCorrect, question.explanation);
    }, 1000);
}

function showQuizFeedback(isCorrect, explanation) {
    document.getElementById('feedbackIcon').textContent = isCorrect ? '✅' : '❌';
    document.getElementById('feedbackText').textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    document.getElementById('feedbackExplanation').textContent = explanation;
    
    document.getElementById('quizFeedback').classList.remove('hidden');
}

function nextQuestion() {
    const quiz = gameState.currentQuiz;
    
    document.getElementById('quizFeedback').classList.add('hidden');
    
    quiz.currentQuestion++;
    
    if (quiz.currentQuestion < quiz.questions.length) {
        displayQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const quiz = gameState.currentQuiz;
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.answers.filter((answer, index) => 
        answer === quiz.questions[index].correct
    ).length;
    
    const coinsEarned = correctAnswers * 5;
    const bonusCoins = correctAnswers === totalQuestions ? 20 : 0; // Perfect score bonus
    
    gameState.player.coins += bonusCoins;
    
    document.getElementById('finalScore').textContent = `${correctAnswers}/${totalQuestions}`;
    document.getElementById('coinsEarned').textContent = coinsEarned + bonusCoins;
    
    document.getElementById('quizResults').classList.remove('hidden');
    
    // Check for achievements
    checkAchievements('quiz', {correctAnswers, totalQuestions});
    
    updateDashboard();
}

function resetQuiz() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('islandSelection').classList.remove('hidden');
    
    gameState.currentQuiz = {
        subject: '',
        questions: [],
        currentQuestion: 0,
        score: 0,
        answers: []
    };
}

// Math Rush Functions
function startMathRush() {
    gameState.mathRush = {
        score: 0,
        streak: 0,
        timeLeft: 60,
        timer: null,
        questions: [],
        currentQuestion: 0,
        bestStreak: 0
    };
    
    generateMathRushQuestions();
    
    document.getElementById('rushStart').classList.add('hidden');
    document.getElementById('rushGame').classList.remove('hidden');
    document.getElementById('rushResults').classList.add('hidden');
    
    startRushTimer();
    displayRushQuestion();
}

function generateMathRushQuestions() {
    const questions = [];
    for (let i = 0; i < 50; i++) {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        
        let answer;
        let questionText;
        
        switch(op) {
            case '+':
                answer = a + b;
                questionText = `${a} + ${b}`;
                break;
            case '-':
                answer = Math.abs(a - b);
                questionText = `${Math.max(a, b)} - ${Math.min(a, b)}`;
                break;
            case '×':
                answer = a * b;
                questionText = `${a} × ${b}`;
                break;
        }
        
        // Generate options
        const options = [answer];
        while (options.length < 4) {
            const wrongAnswer = answer + Math.floor(Math.random() * 20) - 10;
            if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }
        
        questions.push({
            question: questionText,
            options: shuffleArray(options),
            correct: options.indexOf(answer)
        });
    }
    
    gameState.mathRush.questions = questions;
}

function startRushTimer() {
    gameState.mathRush.timer = setInterval(() => {
        gameState.mathRush.timeLeft--;
        document.getElementById('rushTimer').textContent = gameState.mathRush.timeLeft;
        
        if (gameState.mathRush.timeLeft <= 0) {
            endMathRush();
        }
    }, 1000);
}

function displayRushQuestion() {
    const rush = gameState.mathRush;
    const question = rush.questions[rush.currentQuestion];
    
    document.getElementById('rushQuestionText').textContent = `${question.question} = ?`;
    document.getElementById('rushScore').textContent = rush.score;
    document.getElementById('rushStreak').textContent = rush.streak;
    
    const optionsContainer = document.getElementById('rushOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'rush-option';
        btn.textContent = option;
        btn.onclick = () => selectRushAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function selectRushAnswer(selectedIndex) {
    const rush = gameState.mathRush;
    const question = rush.questions[rush.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        rush.score += 10 + (rush.streak * 2); // Streak bonus
        rush.streak++;
        gameState.player.coins += 2;
        
        if (rush.streak > rush.bestStreak) {
            rush.bestStreak = rush.streak;
        }
    } else {
        rush.streak = 0;
    }
    
    rush.currentQuestion++;
    
    if (rush.currentQuestion < rush.questions.length) {
        displayRushQuestion();
    } else {
        endMathRush();
    }
}

function endMathRush() {
    if (gameState.mathRush.timer) {
        clearInterval(gameState.mathRush.timer);
    }
    
    const rush = gameState.mathRush;
    const coinsEarned = Math.floor(rush.score / 10);
    
    // Speed bonus
    const timeUsed = 60 - rush.timeLeft;
    const speedBonus = timeUsed < 30 ? 50 : 0;
    
    gameState.player.coins += speedBonus;
    
    document.getElementById('finalRushScore').textContent = rush.score;
    document.getElementById('rushCoinsEarned').textContent = coinsEarned + speedBonus;
    document.getElementById('bestStreak').textContent = rush.bestStreak;
    
    document.getElementById('rushGame').classList.add('hidden');
    document.getElementById('rushResults').classList.remove('hidden');
    
    // Check achievements
    if (timeUsed < 120) {
        checkAchievements('speed', {timeUsed});
    }
    
    updateDashboard();
}

function resetMathRush() {
    document.getElementById('rushResults').classList.add('hidden');
    document.getElementById('rushStart').classList.remove('hidden');
}

// Science Explorer Functions
function initializeScienceExplorer() {
    const experimentsGrid = document.getElementById('experimentsGrid');
    if (!experimentsGrid) return;
    
    experimentsGrid.innerHTML = '';
    
    experiments.forEach((experiment, index) => {
        const card = document.createElement('div');
        card.className = 'experiment-card';
        card.innerHTML = `
            <div class="experiment-icon">${experiment.icon}</div>
            <h4>${experiment.name}</h4>
            <p>${experiment.description}</p>
            <button class="btn btn--primary" onclick="startExperiment(${index})">Start Experiment</button>
        `;
        experimentsGrid.appendChild(card);
    });
}

function startExperiment(experimentIndex) {
    const experiment = experiments[experimentIndex];
    gameState.experiments.currentExperiment = experiment;
    
    document.getElementById('labSelection').classList.add('hidden');
    document.getElementById('experimentLab').classList.remove('hidden');
    document.getElementById('experimentResult').classList.add('hidden');
    
    document.getElementById('experimentTitle').textContent = experiment.name;
    document.getElementById('experimentDescription').textContent = experiment.description;
    
    // Setup materials
    const materialsGrid = document.getElementById('materialsGrid');
    materialsGrid.innerHTML = '';
    
    experiment.materials.forEach(material => {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        materialItem.textContent = material;
        materialItem.draggable = true;
        materialItem.addEventListener('dragstart', handleDragStart);
        materialsGrid.appendChild(materialItem);
    });
    
    // Reset drop zone
    document.getElementById('droppedMaterials').innerHTML = '';
    document.getElementById('conductBtn').disabled = true;
}

function initializeDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.closest('.drop-zone').classList.add('drag-over');
}

function handleDragLeave(e) {
    if (!e.target.closest('.drop-zone').contains(e.relatedTarget)) {
        e.target.closest('.drop-zone').classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    dropZone.classList.remove('drag-over');
    
    const materialName = e.dataTransfer.getData('text/plain');
    const droppedMaterials = document.getElementById('droppedMaterials');
    
    // Check if already dropped
    const existingMaterials = Array.from(droppedMaterials.children).map(child => child.textContent);
    if (existingMaterials.includes(materialName)) {
        return;
    }
    
    // Add to dropped materials
    const droppedMaterial = document.createElement('div');
    droppedMaterial.className = 'dropped-material';
    droppedMaterial.textContent = materialName;
    droppedMaterials.appendChild(droppedMaterial);
    
    // Remove dragging class
    document.querySelectorAll('.material-item').forEach(item => {
        item.classList.remove('dragging');
    });
    
    // Check if all materials are added
    const experiment = gameState.experiments.currentExperiment;
    if (existingMaterials.length + 1 >= experiment.materials.length) {
        document.getElementById('conductBtn').disabled = false;
    }
}

function conductExperiment() {
    const experiment = gameState.experiments.currentExperiment;
    
    gameState.player.coins += experiment.coins;
    gameState.experiments.completed.push(experiment.name);
    
    document.getElementById('resultTitle').textContent = 'Success!';
    document.getElementById('resultDescription').textContent = experiment.result;
    document.getElementById('experimentCoins').textContent = experiment.coins;
    
    document.getElementById('experimentResult').classList.remove('hidden');
    
    // Check achievements
    checkAchievements('experiment', {completed: gameState.experiments.completed.length});
    
    updateDashboard();
}

function resetExperiment() {
    document.getElementById('experimentResult').classList.add('hidden');
    document.getElementById('experimentLab').classList.add('hidden');
    document.getElementById('labSelection').classList.remove('hidden');
    
    gameState.experiments.currentExperiment = null;
}

// Puzzle Lab Functions
function startPuzzle(puzzleType) {
    gameState.puzzleLab = {
        score: 0,
        currentPuzzle: 0,
        puzzleType,
        puzzles: generatePuzzles(puzzleType)
    };
    
    document.getElementById('puzzleSelection').classList.add('hidden');
    document.getElementById('puzzleGame').classList.remove('hidden');
    document.getElementById('puzzleFeedback').classList.add('hidden');
    document.getElementById('puzzleResults').classList.add('hidden');
    
    displayPuzzle();
}

function generatePuzzles(type) {
    const puzzles = [];
    
    for (let i = 0; i < 5; i++) {
        let puzzle;
        
        switch (type) {
            case 'sequence':
                puzzle = generateSequencePuzzle();
                break;
            case 'logic':
                puzzle = generateLogicPuzzle();
                break;
            case 'equation':
                puzzle = generateEquationPuzzle();
                break;
        }
        
        puzzles.push(puzzle);
    }
    
    return puzzles;
}

function generateSequencePuzzle() {
    const patterns = [
        {sequence: [2, 4, 6, 8, '?'], answer: 10, pattern: 'Add 2'},
        {sequence: [3, 6, 9, 12, '?'], answer: 15, pattern: 'Add 3'},
        {sequence: [1, 4, 7, 10, '?'], answer: 13, pattern: 'Add 3'},
        {sequence: [5, 10, 15, 20, '?'], answer: 25, pattern: 'Add 5'},
        {sequence: [2, 6, 18, 54, '?'], answer: 162, pattern: 'Multiply by 3'}
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return {
        question: 'What comes next in the sequence?',
        content: pattern.sequence.join(', '),
        answer: pattern.answer.toString(),
        explanation: `Pattern: ${pattern.pattern}`
    };
}

function generateLogicPuzzle() {
    const puzzles = [
        {
            question: 'If all roses are flowers and some flowers are red, can we conclude that some roses are red?',
            content: 'Think about logical relationships...',
            answer: 'no',
            explanation: 'We cannot conclude this without more information.'
        },
        {
            question: 'A farmer has 17 sheep, and all but 9 die. How many are left?',
            content: 'Read carefully...',
            answer: '9',
            explanation: 'All but 9 die means 9 are left alive.'
        }
    ];
    
    return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function generateEquationPuzzle() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = a + b;
    
    return {
        question: 'Solve for x:',
        content: `x + ${a} = ${c}`,
        answer: b.toString(),
        explanation: `x = ${c} - ${a} = ${b}`
    };
}

function displayPuzzle() {
    const lab = gameState.puzzleLab;
    const puzzle = lab.puzzles[lab.currentPuzzle];
    
    document.getElementById('puzzleNumber').textContent = lab.currentPuzzle + 1;
    document.getElementById('puzzleDifficulty').textContent = lab.currentPuzzle < 2 ? 'Easy' : lab.currentPuzzle < 4 ? 'Medium' : 'Hard';
    document.getElementById('puzzleScore').textContent = lab.score;
    
    document.getElementById('puzzleText').textContent = puzzle.question;
    document.getElementById('puzzleContent').textContent = puzzle.content;
    
    document.getElementById('puzzleAnswer').value = '';
}

function checkPuzzleAnswer() {
    const lab = gameState.puzzleLab;
    const puzzle = lab.puzzles[lab.currentPuzzle];
    const userAnswer = document.getElementById('puzzleAnswer').value.trim().toLowerCase();
    const isCorrect = userAnswer === puzzle.answer.toLowerCase();
    
    if (isCorrect) {
        lab.score += 20;
        gameState.player.coins += 10;
    }
    
    document.getElementById('puzzleFeedbackIcon').textContent = isCorrect ? '✅' : '❌';
    document.getElementById('puzzleFeedbackText').textContent = isCorrect ? 'Correct!' : `Incorrect! The answer was: ${puzzle.answer}`;
    
    document.getElementById('puzzleFeedback').classList.remove('hidden');
}

function nextPuzzle() {
    const lab = gameState.puzzleLab;
    
    document.getElementById('puzzleFeedback').classList.add('hidden');
    
    lab.currentPuzzle++;
    
    if (lab.currentPuzzle < lab.puzzles.length) {
        displayPuzzle();
    } else {
        showPuzzleResults();
    }
}

function showPuzzleResults() {
    const lab = gameState.puzzleLab;
    const coinsEarned = Math.floor(lab.score / 2);
    
    document.getElementById('finalPuzzleScore').textContent = lab.score;
    document.getElementById('puzzleCoinsEarned').textContent = coinsEarned;
    
    document.getElementById('puzzleResults').classList.remove('hidden');
    
    // Check achievements
    checkAchievements('puzzle', {solved: 5});
    
    updateDashboard();
}

function resetPuzzleLab() {
    document.getElementById('puzzleResults').classList.add('hidden');
    document.getElementById('puzzleGame').classList.add('hidden');
    document.getElementById('puzzleSelection').classList.remove('hidden');
    
    gameState.puzzleLab = {
        score: 0,
        currentPuzzle: 0,
        puzzleType: '',
        puzzles: []
    };
}

// Contest Arena Functions
function joinContest() {
    alert('🏆 Contest feature coming soon! Join weekly challenges to compete with other students and win amazing prizes!');
}

function updateContestTimer() {
    // Simulate contest countdown
    const now = new Date();
    const nextWeek = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
    const diff = Math.floor((nextWeek - now) / 1000);
    
    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    const seconds = diff % 60;
    
    const timerDisplay = document.getElementById('contestTimer');
    if (timerDisplay) {
        timerDisplay.textContent = `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Achievement System
function checkAchievements(type, data) {
    const newAchievements = [];
    
    switch (type) {
        case 'quiz':
            if (gameState.player.achievements.length === 0) {
                newAchievements.push(achievements[0]); // First Steps
            }
            if (data.correctAnswers === data.totalQuestions) {
                newAchievements.push(achievements[5]); // Knowledge Master
            }
            break;
            
        case 'speed':
            if (data.timeUsed < 120) {
                newAchievements.push(achievements[2]); // Speed Demon
            }
            break;
            
        case 'experiment':
            if (data.completed >= 5) {
                newAchievements.push(achievements[3]); // Science Explorer
            }
            break;
            
        case 'puzzle':
            if (data.solved >= 10) {
                newAchievements.push(achievements[4]); // Problem Solver
            }
            break;
    }
    
    // Add new achievements
    newAchievements.forEach(achievement => {
        if (!gameState.player.achievements.find(a => a.name === achievement.name)) {
            gameState.player.achievements.push(achievement);
            showAchievementNotification(achievement);
        }
    });
}

function showAchievementNotification(achievement) {
    // Create notification (simple alert for now)
    setTimeout(() => {
        alert(`🏆 Achievement Unlocked!\n${achievement.icon} ${achievement.name}\n${achievement.description}`);
    }, 1000);
}

// Utility Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}