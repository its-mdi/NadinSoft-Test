NadinSoft Test Project

This is a test project developed for NadinSoft to demonstrate proficiency in Vue 3, Vuetify, Vue I18n, and Cypress for testing.

🚀 Technologies Used

Vue 3 – Frontend framework for building reactive user interfaces.

Vuetify 3 – Material Design component library for Vue 3.

Vue I18n – Internationalization support for multiple languages.

Cypress – End-to-end testing framework to ensure reliable functionality.

TypeScript – Type-safe development for scalable and maintainable code.


🌐 Features

User Greeting & Time Display – Shows a greeting based on the time of day.

To-Do List – Add, edit, toggle, and delete tasks with localStorage persistence.

Weather Search – Fetches weather data for selected Iranian cities using Open-Meteo API.

Theme & Language Settings – Users can select themes (dark/light) and languages (English/Persian).

i18n Support – All text content is translated and dynamically rendered based on user-selected language.

Cypress Tests – Automated tests to ensure form validation, UI interactions, and component rendering work correctly.

⚡ Setup & Installation

Install dependencies:

pnpm install


Run the development server:

pnpm run dev


Open the app in your browser at http://localhost:3000

🧪 Running Tests (Cypress)

To open Cypress test runner:

npx cypress open


Tests cover:

Form submission and validation

Weather search functionality

To-do list interactions

Theme and language selection

🎨 Customization

Languages: Add additional translations in src/locales/.

Themes: Extend Vuetify themes in src/plugins/vuetify.ts.

Cities List: Modify src/assets/ir.json to update city options for weather search.

📌 Notes

This project is a test implementation, intended to demonstrate Vue 3 and Vuetify skills.

Uses localStorage for persisting user settings and tasks.

Built with TypeScript for improved maintainability and type safety.

📄 License

This project is for NadinSoft internal use and is not open-source.