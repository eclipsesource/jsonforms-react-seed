# JSON Forms React seed App

<!--
TODO: Migrate this project from Vite and Material UI to a Next.js
setup using Tailwind CSS and Radix UI components (shadcn).
Steps:
1. Create a fresh Next.js project with `create-next-app`.
2. Move the existing JSON Forms components and context into the new
   application structure.
3. Install and configure Tailwind CSS together with Radix UI/shadcn.
4. Replace current MUI components with Radix/shadcn equivalents.
5. Port Vite-specific configuration and scripts to Next.js pages and routing.
6. Remove the MUI theme setup in `src/main.tsx` and uninstall the `@mui/*`
   packages.
7. Replace the styles in `src/App.css` with Tailwind utility classes and
   configure `tailwind.config.js` accordingly.
8. Switch JSON Forms to use Tailwind-styled renderers or adapt the material
   renderers to match the new design.
-->

This project demonstrates a small **JSON Forms Designer** built with React and Vite. It allows editing a JSON schema and UI schema side by side while a live preview renders the resulting form.

It was originally based on `create-react-app` but has been migrated to Vite.
This project requires **Node.js 20** to run the tooling and tests.

- Execute `npm ci` to install the prerequisites. If you want to have the latest released versions use `npm install`.
- Execute `npm run build` to build the application.
- Execute `npm start` to start the application.

Browse to http://localhost:3000 to see the designer in action.

## File Structure

Important files:

- `src/context/DesignerContext.tsx` – holds the designer state
- `src/components/*` – UI building blocks like editors, preview pane and sidebar
- `src/utils/` – helper utilities

## Usage

Run `npm start` and open the application. Use the sidebar to import or export schemas
and to load predefined templates. Edit the JSON Schema or UI Schema in the editors
and watch the preview update instantly.

The [data schema](src/schema.json) defines the structure of a Task: it contains attributes such as title, description, due date and so on.

The [corresponding UI schema](src/uischema.json) specifies controls for each property and puts them into a vertical layout that in turn contains two horizontal layouts.

## Rendering JSON Forms

JSON Forms is rendered by importing and using the `JsonForms` component and directly handing over the `schema`, `uischema`, `data`, `renderer` and `cell` props. We listen to changes in the form via the `onChange` callback.

## Custom renderers

Please see [our corresponding tutorial](https://jsonforms.io/docs/tutorial) on how to add custom renderers.

## Future improvements

- Introduce a `useValidationErrors` hook to share validation results between the
  schema editors. This would allow the editors to display validation errors in
  real time as users modify the JSON or UI schema.
