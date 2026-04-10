/**
 * Quiz Question Bank
 * Categories: Java, Python, JavaScript, HTML/CSS, General Knowledge,
 *             Data Structures, SQL, React, Git, Cyber Security
 */

const questions = [

  // ══════════════════════════════════════════════════════
  //  JAVA  (20 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "Java",
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    answer: "extends",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "What is the default value of an int variable in Java?",
    options: ["null", "0", "undefined", "-1"],
    answer: "0",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "Which of the following is NOT a Java primitive type?",
    options: ["int", "boolean", "String", "double"],
    answer: "String",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "What does JVM stand for?",
    options: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Module", "Java Version Manager"],
    answer: "Java Virtual Machine",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "Which method is the entry point of a Java application?",
    options: ["start()", "run()", "main()", "init()"],
    answer: "main()",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "What is the output of: System.out.println(10 / 3);",
    options: ["3.33", "3", "3.0", "Compilation error"],
    answer: "3",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "Which interface must be implemented to create a thread in Java?",
    options: ["Threadable", "Runnable", "Executable", "Callable"],
    answer: "Runnable",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "What is the purpose of the 'finally' block in Java?",
    options: [
      "To catch exceptions",
      "To execute code regardless of whether an exception occurred",
      "To throw exceptions",
      "To define the last method in a class",
    ],
    answer: "To execute code regardless of whether an exception occurred",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "Which collection does NOT allow duplicate elements?",
    options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
    answer: "HashSet",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "What is method overloading in Java?",
    options: [
      "Overriding a parent class method",
      "Multiple methods with the same name but different parameters",
      "Having more than one return type",
      "Using the super keyword",
    ],
    answer: "Multiple methods with the same name but different parameters",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "Which access modifier makes a member accessible only within the same class?",
    options: ["protected", "public", "default", "private"],
    answer: "private",
    difficulty: "easy",
  },
  {
    category: "Java",
    question: "What does the 'static' keyword mean when applied to a method?",
    options: [
      "The method cannot be changed",
      "The method belongs to the class, not instances",
      "The method runs only once",
      "The method is always synchronized",
    ],
    answer: "The method belongs to the class, not instances",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "Which Java keyword is used to prevent a class from being subclassed?",
    options: ["static", "abstract", "final", "sealed"],
    answer: "final",
    difficulty: "medium",
  },
  {
    category: "Java",
    question: "What is autoboxing in Java?",
    options: [
      "Automatic conversion between primitive types and their wrapper classes",
      "Automatically importing packages",
      "Boxing data inside arrays",
      "Serializing objects automatically",
    ],
    answer: "Automatic conversion between primitive types and their wrapper classes",
    difficulty: "hard",
  },
  {
    category: "Java",
    question: "Which Java 8 feature allows passing behavior as a method argument?",
    options: ["Generics", "Lambda Expressions", "Annotations", "Enums"],
    answer: "Lambda Expressions",
    difficulty: "hard",
  },

  // ══════════════════════════════════════════════════════
  //  PYTHON  (20 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "Python",
    question: "Which of the following is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    answer: "def",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What data type is the result of: type([])?",
    options: ["tuple", "list", "array", "set"],
    answer: "list",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "Which Python method is used to add an element to the end of a list?",
    options: ["add()", "insert()", "append()", "push()"],
    answer: "append()",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is the correct way to create a dictionary in Python?",
    options: ['[1: "a", 2: "b"]', '(1: "a", 2: "b")', '{1: "a", 2: "b"}', '<1: "a", 2: "b">'],
    answer: '{1: "a", 2: "b"}',
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What does 'PEP 8' refer to?",
    options: [
      "A Python version",
      "Python's style guide for code",
      "A Python security standard",
      "A Python error code",
    ],
    answer: "Python's style guide for code",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is the output of: print(type(3.14))?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'decimal'>"],
    answer: "<class 'float'>",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "Which keyword is used to handle exceptions in Python?",
    options: ["catch", "except", "handle", "error"],
    answer: "except",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is a lambda function in Python?",
    options: [
      "A recursive function",
      "A built-in function",
      "An anonymous one-line function",
      "A function that returns None",
    ],
    answer: "An anonymous one-line function",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What does the 'self' keyword represent in a Python class?",
    options: [
      "The class itself",
      "The parent class",
      "The current instance of the class",
      "A global variable",
    ],
    answer: "The current instance of the class",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "Which module in Python is used for regular expressions?",
    options: ["regex", "re", "regexp", "pattern"],
    answer: "re",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is a list comprehension?",
    options: [
      "A method to sort lists",
      "A concise way to create lists using a single line",
      "A way to delete list elements",
      "A way to copy a list",
    ],
    answer: "A concise way to create lists using a single line",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is the difference between a list and a tuple in Python?",
    options: [
      "Lists are ordered; tuples are not",
      "Lists are mutable; tuples are immutable",
      "Tuples can have duplicates; lists cannot",
      "There is no difference",
    ],
    answer: "Lists are mutable; tuples are immutable",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "Which function is used to get user input in Python 3?",
    options: ["raw_input()", "scan()", "input()", "read()"],
    answer: "input()",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What does the '__init__' method do in a Python class?",
    options: [
      "Destroys the object",
      "Initializes a new object when the class is instantiated",
      "Inherits from the parent class",
      "Defines class variables only",
    ],
    answer: "Initializes a new object when the class is instantiated",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is a generator in Python?",
    options: [
      "A function that returns a list",
      "A function that uses 'yield' to produce values lazily",
      "A class that generates random numbers",
      "A tool to generate documentation",
    ],
    answer: "A function that uses 'yield' to produce values lazily",
    difficulty: "hard",
  },

  // ══════════════════════════════════════════════════════
  //  JAVASCRIPT  (20 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "JavaScript",
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "const", "Both let and const"],
    answer: "Both let and const",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is the output of: typeof null?",
    options: ["null", "undefined", "object", "string"],
    answer: "object",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "Which method converts a JSON string to a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.objectify()"],
    answer: "JSON.parse()",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is a closure in JavaScript?",
    options: [
      "A function with no return value",
      "A function that has access to its outer scope even after the outer function has returned",
      "A way to close the browser",
      "A method to end a loop",
    ],
    answer: "A function that has access to its outer scope even after the outer function has returned",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "What does === check in JavaScript?",
    options: [
      "Only value equality",
      "Only type equality",
      "Both value and type equality",
      "Object reference equality",
    ],
    answer: "Both value and type equality",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "Which array method creates a new array with all elements that pass a test?",
    options: ["map()", "find()", "filter()", "reduce()"],
    answer: "filter()",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is the purpose of 'async/await' in JavaScript?",
    options: [
      "To create synchronous code",
      "To handle asynchronous operations more cleanly",
      "To define class methods",
      "To declare variables",
    ],
    answer: "To handle asynchronous operations more cleanly",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What does 'event delegation' mean in JavaScript?",
    options: [
      "Attaching events to each element individually",
      "Using a parent element to handle events for its children",
      "Preventing events from firing",
      "Delegating events to the server",
    ],
    answer: "Using a parent element to handle events for its children",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "Which keyword is used to define a class in JavaScript (ES6)?",
    options: ["define", "class", "object", "prototype"],
    answer: "class",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is the spread operator in JavaScript?",
    options: [
      "...",
      "**",
      "->",
      "=>",
    ],
    answer: "...",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is a Promise in JavaScript?",
    options: [
      "A guarantee that code will work",
      "An object representing the eventual completion or failure of an async operation",
      "A type of loop",
      "A function declaration",
    ],
    answer: "An object representing the eventual completion or failure of an async operation",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What does 'hoisting' mean in JavaScript?",
    options: [
      "Moving code to the server",
      "JavaScript's default behavior of moving declarations to the top of the scope",
      "Uploading files asynchronously",
      "Increasing variable priority",
    ],
    answer: "JavaScript's default behavior of moving declarations to the top of the scope",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "Which method is used to add an element at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is the 'this' keyword in JavaScript?",
    options: [
      "Always refers to the global object",
      "Refers to the object that is currently executing the code",
      "Refers to the parent class",
      "Refers to the current function",
    ],
    answer: "Refers to the object that is currently executing the code",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is destructuring in JavaScript?",
    options: [
      "Deleting object properties",
      "Extracting values from arrays or properties from objects into distinct variables",
      "Converting objects to strings",
      "Breaking a function into smaller parts",
    ],
    answer: "Extracting values from arrays or properties from objects into distinct variables",
    difficulty: "medium",
  },

  // ══════════════════════════════════════════════════════
  //  HTML & CSS  (20 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "HTML/CSS",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<style>", "<script>", "<link>"],
    answer: "<style>",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "What is the correct HTML for creating a hyperlink?",
    options: [
      '<a url="http://example.com">Link</a>',
      '<a href="http://example.com">Link</a>',
      '<link href="http://example.com">Link</link>',
      '<a>http://example.com</a>',
    ],
    answer: '<a href="http://example.com">Link</a>',
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "foreground-color"],
    answer: "color",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "Which CSS property controls the space between elements' borders?",
    options: ["spacing", "padding", "margin", "border-spacing"],
    answer: "margin",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "What is the CSS box model made up of?",
    options: [
      "Content, margin, border, padding",
      "Content, padding, border, margin",
      "Padding, content, margin, border",
      "Border, content, padding, margin",
    ],
    answer: "Content, padding, border, margin",
    difficulty: "medium",
  },
  {
    category: "HTML/CSS",
    question: "Which HTML5 element is used to define navigation links?",
    options: ["<nav>", "<header>", "<menu>", "<navigation>"],
    answer: "<nav>",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "What does the CSS 'flexbox' layout primarily help with?",
    options: [
      "3D animations",
      "Distributing space among items in a container and aligning them",
      "Creating grids only",
      "Managing z-index",
    ],
    answer: "Distributing space among items in a container and aligning them",
    difficulty: "medium",
  },
  {
    category: "HTML/CSS",
    question: "Which attribute is used to specify an alternative text for an image?",
    options: ["title", "src", "alt", "name"],
    answer: "alt",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "What is a CSS pseudo-class?",
    options: [
      "A class that inherits styles",
      "A selector that specifies a special state of an element",
      "A class used only in JavaScript",
      "A fake CSS class for testing",
    ],
    answer: "A selector that specifies a special state of an element",
    difficulty: "medium",
  },
  {
    category: "HTML/CSS",
    question: "Which CSS unit is relative to the font-size of the root element?",
    options: ["em", "rem", "px", "vw"],
    answer: "rem",
    difficulty: "medium",
  },
  {
    category: "HTML/CSS",
    question: "What is the purpose of the HTML <meta> tag?",
    options: [
      "To define the page title",
      "To provide metadata about the HTML document",
      "To create hyperlinks",
      "To embed scripts",
    ],
    answer: "To provide metadata about the HTML document",
    difficulty: "easy",
  },
  {
    category: "HTML/CSS",
    question: "Which CSS property is used for grid layout?",
    options: ["display: flex", "display: grid", "display: block", "display: table"],
    answer: "display: grid",
    difficulty: "medium",
  },
  {
    category: "HTML/CSS",
    question: "What is a CSS media query used for?",
    options: [
      "Playing media files",
      "Applying styles based on device characteristics like screen size",
      "Loading images faster",
      "Connecting to media servers",
    ],
    answer: "Applying styles based on device characteristics like screen size",
    difficulty: "medium",
  },

  // ══════════════════════════════════════════════════════
  //  GENERAL KNOWLEDGE  (15 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
    answer: "Alexander Graham Bell",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
    answer: "Leonardo da Vinci",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "What is the fastest animal on land?",
    options: ["Lion", "Cheetah", "Horse", "Greyhound"],
    answer: "Cheetah",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945",
    difficulty: "medium",
  },
  {
    category: "General Knowledge",
    question: "What is the largest country in the world by area?",
    options: ["USA", "China", "Canada", "Russia"],
    answer: "Russia",
    difficulty: "easy",
  },
  {
    category: "General Knowledge",
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "186"],
    answer: "206",
    difficulty: "medium",
  },

  // ══════════════════════════════════════════════════════
  //  DATA STRUCTURES  (10 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "Data Structures",
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Linked List", "Array"],
    answer: "Stack",
    difficulty: "easy",
  },
  {
    category: "Data Structures",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: "O(log n)",
    difficulty: "medium",
  },
  {
    category: "Data Structures",
    question: "Which data structure is used to implement a recursive function call?",
    options: ["Queue", "Array", "Stack", "Tree"],
    answer: "Stack",
    difficulty: "medium",
  },
  {
    category: "Data Structures",
    question: "What is a Binary Search Tree?",
    options: [
      "A tree with exactly two nodes",
      "A tree where the left child is smaller and the right child is larger than the parent",
      "A tree that can only store binary values",
      "A balanced tree with two levels",
    ],
    answer: "A tree where the left child is smaller and the right child is larger than the parent",
    difficulty: "medium",
  },
  {
    category: "Data Structures",
    question: "Which data structure uses the FIFO principle?",
    options: ["Stack", "Heap", "Queue", "Graph"],
    answer: "Queue",
    difficulty: "easy",
  },

  // ══════════════════════════════════════════════════════
  //  SQL  (10 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "SQL",
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["GET", "FETCH", "SELECT", "READ"],
    answer: "SELECT",
    difficulty: "easy",
  },
  {
    category: "SQL",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Sequential Query Language",
      "Standard Query Logic",
    ],
    answer: "Structured Query Language",
    difficulty: "easy",
  },
  {
    category: "SQL",
    question: "Which clause is used to filter records in SQL?",
    options: ["HAVING", "WHERE", "FILTER", "LIMIT"],
    answer: "WHERE",
    difficulty: "easy",
  },
  {
    category: "SQL",
    question: "What is a PRIMARY KEY?",
    options: [
      "The first column in a table",
      "A unique identifier for each record in a table",
      "A key used to join tables",
      "The most important column",
    ],
    answer: "A unique identifier for each record in a table",
    difficulty: "easy",
  },
  {
    category: "SQL",
    question: "Which JOIN returns all records from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    answer: "FULL OUTER JOIN",
    difficulty: "medium",
  },

  // ══════════════════════════════════════════════════════
  //  REACT  (10 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "React",
    question: "What is JSX?",
    options: [
      "A JavaScript extension for databases",
      "A syntax extension for JavaScript that looks like HTML",
      "A JavaScript framework",
      "A CSS preprocessor",
    ],
    answer: "A syntax extension for JavaScript that looks like HTML",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "Which hook is used to manage state in a functional component?",
    options: ["useEffect", "useRef", "useState", "useContext"],
    answer: "useState",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What is the Virtual DOM?",
    options: [
      "A fake website built with React",
      "A lightweight copy of the real DOM used to optimize UI updates",
      "A DOM for virtual reality applications",
      "A browser extension for React",
    ],
    answer: "A lightweight copy of the real DOM used to optimize UI updates",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What does useEffect hook do?",
    options: [
      "Manages component state",
      "Performs side effects in functional components",
      "Creates new components",
      "Handles form validation",
    ],
    answer: "Performs side effects in functional components",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is a React component?",
    options: [
      "A CSS class",
      "A reusable piece of UI",
      "A JavaScript variable",
      "A server-side script",
    ],
    answer: "A reusable piece of UI",
    difficulty: "easy",
  },

  // ══════════════════════════════════════════════════════
  //  CYBER SECURITY  (10 questions)
  // ══════════════════════════════════════════════════════
  {
    category: "Cyber Security",
    question: "What does HTTPS stand for?",
    options: [
      "Hyper Text Transfer Protocol Secure",
      "High Transfer Text Protocol Secure",
      "Hyper Text Transport Protocol System",
      "Hyperlink Transfer Text Protocol Secure",
    ],
    answer: "Hyper Text Transfer Protocol Secure",
    difficulty: "easy",
  },
  {
    category: "Cyber Security",
    question: "What is phishing?",
    options: [
      "A type of firewall",
      "Fraudulently obtaining sensitive information by impersonating a trusted entity",
      "An encryption algorithm",
      "A method of secure file transfer",
    ],
    answer: "Fraudulently obtaining sensitive information by impersonating a trusted entity",
    difficulty: "easy",
  },
  {
    category: "Cyber Security",
    question: "What does VPN stand for?",
    options: [
      "Virtual Private Network",
      "Virtual Public Network",
      "Verified Private Node",
      "Variable Protocol Network",
    ],
    answer: "Virtual Private Network",
    difficulty: "easy",
  },
  {
    category: "Cyber Security",
    question: "What is a firewall?",
    options: [
      "A physical wall protecting servers",
      "A network security system that monitors and controls incoming and outgoing traffic",
      "A type of virus",
      "An encryption method",
    ],
    answer: "A network security system that monitors and controls incoming and outgoing traffic",
    difficulty: "easy",
  },
  {
    category: "Cyber Security",
    question: "What is SQL injection?",
    options: [
      "A method to speed up SQL queries",
      "An attack that inserts malicious SQL code into input fields to manipulate a database",
      "A way to inject new tables into a database",
      "A SQL optimization technique",
    ],
    answer: "An attack that inserts malicious SQL code into input fields to manipulate a database",
    difficulty: "medium",
  },
];

// All unique categories
const categories = [...new Set(questions.map((q) => q.category))];

module.exports = { questions, categories };