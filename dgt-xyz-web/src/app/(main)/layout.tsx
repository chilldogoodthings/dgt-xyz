import Header from "../../components/Header";
import Footer from "../../components/Footer"; // Assuming you have a Footer component
import { client } from "../../lib/sanity.client";
import { groq } from "../../lib/sanity.client";
import { SITESETTINGS_QUERY_RESULT } from "../../sanity/sanity.types";

// 1. The GROQ Query to get siteSettings
async function getSiteSettings() {
  const SITESETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
    headerTitle,
    headerIcon {
      asset->{ url },
      alt
    },
    "footerText": footer.en
  }`;
  return await client.fetch<SITESETTINGS_QUERY_RESULT>(SITESETTINGS_QUERY);
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Passing props to your Header based on your interface */}
      <Header title={settings?.headerTitle ?? ""} icon={settings?.headerIcon} />

      <main className="flex-grow">{children}</main>

      {/* 3. Passing the grabbed 'en' string to the Footer */}
      <Footer text={settings?.footerText ?? ""} />
    </div>
  );
}
