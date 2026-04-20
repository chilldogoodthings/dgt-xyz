This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Renaming Root Workspace Directory

If your rename the workspace directory holding the project files and folders, use the following to clean up temporary files and remove the warning message.

```bash
rm -rf .next node_modules package-lock.json
npm install
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity TypeGen (TypeScript Synchronization)

This project utilizes **Sanity TypeGen** to bridge the gap between your CMS schemas and your Next.js frontend. It scans your GROQ queries and generates static TypeScript interfaces, providing full autocomplete and preventing runtime data errors.

---

### 1. The Monorepo Handshake

Since the Studio and Web projects live in separate directories, the "Source of Truth" flows from the Studio to the Web app via a two-step process:

1.  **Extract:** The Studio analyzes your local schema files and creates a static `schema.json` blueprint.
2.  **Generate:** The TypeGen engine reads that blueprint, scans your Web folder for `groq` queries, and writes a `sanity.types.ts` file into the Web project.

---

### 2. Synchronization Workflow

Whenever you modify a schema in `apps/studio-dgt-xyz`, run the following sequence to update your types:

```bash
# 1. Navigate to the studio folder
cd apps/studio-dgt-xyz

# 2. Extract the schema blueprint
npx sanity@latest schema extract

# 3. Generate the TypeScript types
npm run typegen
npx sanity@latest typegen generate
```

> **Note:** Ensure your `sanity.cli.ts` is configured with the correct relative paths to your `web` directory so the generated file lands in the right spot.

---

### 3. Implementation Pattern

To ensure the TypeGen engine correctly identifies your queries and generates named interfaces, use the **Exported Constant** pattern with the `groq` tag.

#### **Standard Fetch Pattern**

In your `page.tsx` or `layout.tsx`, define your query outside the function. The engine will use the variable name to create a type named `[VARIABLE_NAME]_RESULT`.

```typescript
import { client } from "../../lib/sanity.client";
import { groq } from "../../lib/sanity.client";
import { LANDING_PAGE_QUERY_RESULT } from "../../sanity/sanity.types";

// 1. Define the query with a 'groq' tag for the scanner to find
const LANDING_PAGE_QUERY = groq`*[_type == "landingPage" && slug.current == "home"][0]{
    title,
    contentBlocks
  }`;

// 2. Use the generated Result type in your fetch function
async function getLandingPageData() {
  return await client.fetch<LANDING_PAGE_QUERY_RESULT>(LANDING_PAGE_QUERY);
}

export default async function Home() {
  const landingPage = await getLandingPageData();

  return (
    <div>
      {/* 3. Enjoy full intellisense and type safety */}
      <h1>{landingPage?.title}</h1>
      <p>Sections: {landingPage?.contentBlocks?.length || 0}</p>
    </div>
  );
}
```

---

### 4. Key Considerations

- **Null Safety:** Sanity fields are optional by default. Always use **Optional Chaining** (`?.`) and **Nullish Coalescing** (`??`) when passing data to components (e.g., `title={data?.title ?? "Default"}`).
- **Scanner Requirements:** The engine _only_ recognizes strings prefixed with the `groq` tag. Plain backticks will be ignored by the generator.
- **Asset Handling:** Generated types for images include the full Sanity asset reference. Use the `@sanity/image-url` builder to transform these into usable URLs for the `next/image` component.
