import { client } from "../../lib/sanity.client";
import { groq } from "../../lib/sanity.client";
import HomeLayout from "../../components/HomeLayout";
import { LANDING_PAGE_QUERY_RESULT } from "../../sanity/sanity.types";

async function getLandingPageData() {
  const LANDING_PAGE_QUERY = groq`*[_type == "landingPage" && slug.current == "home"][0]{
    title,          // This is your Internal Title from the 'admin' group
    contentBlocks   // This is your array of sections
  }`;
  return await client.fetch<LANDING_PAGE_QUERY_RESULT>(LANDING_PAGE_QUERY);
}

export default async function Home() {
  const landingPage = await getLandingPageData();

  return (
    <HomeLayout>
      {/* Right now, landingPage.title is just "Home Page" or whatever 
         is in that admin field. 
      */}
      <h1>{landingPage?.title}</h1>

      {/* In the future, you will map over contentBlocks here 
         instead of just showing a paragraph.
      */}
      <p>Content Sections count: {landingPage?.contentBlocks?.length || 0}</p>
    </HomeLayout>
  );
}
